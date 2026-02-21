const canvas = document.getElementById("vibesCanvas");
const ctx = canvas.getContext("2d");

const stickers = document.getElementById("stickers");

const btnPalette = document.getElementById("btnPalette");
const btnCalm = document.getElementById("btnCalm");
const btnChaos = document.getElementById("btnChaos");

const audio = document.getElementById("audio");
const btnPlay = document.getElementById("btnPlay");
const npValue = document.getElementById("npValue");

let W = 0, H = 0;
let DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

let hue = 200;
let intensity = 1.0;

// Make sure the page looks alive even if you’re unsure JS loaded:
console.log("[vibes] vibes.js loaded ✅");

function resize() {
  W = Math.floor(window.innerWidth);
  H = Math.floor(window.innerHeight);
  canvas.width = Math.floor(W * DPR);
  canvas.height = Math.floor(H * DPR);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener("resize", resize);
resize();

function setVars() {
  document.documentElement.style.setProperty("--hue", String(hue));
  document.documentElement.style.setProperty("--intensity", String(intensity));
}
setVars();

function rand(a, b){ return a + Math.random() * (b - a); }

const pulses = [];
function spawnPulse(x, y, power = 1) {
  pulses.push({
    x, y,
    r: rand(40, 120) * power,
    life: 1.0,
    speed: rand(0.008, 0.02) * power
  });
  while (pulses.length > 30) pulses.shift();
}

const emoji = ["🧙‍♂️","🧠","⚡","🛠️","🖥️","🌈","✨","🪩","🚀","🫠","🍄","👾","🧃","🎛️","🎧"];
function sticker(x, y) {
  const el = document.createElement("div");
  el.className = "sticker";
  el.textContent = emoji[Math.floor(Math.random() * emoji.length)];
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty("--rot", `${rand(-25, 25)}deg`);
  el.style.setProperty("--dx", `${rand(-80, 80)}px`);
  stickers.appendChild(el);
  setTimeout(() => el.remove(), 2300);
}

let mouse = { x: W/2, y: H/2 };

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
  if (Math.random() < 0.08 * intensity) spawnPulse(mouse.x, mouse.y, 0.7);
});

window.addEventListener("click", (e) => {
  // Guaranteed visible fun
  sticker(e.clientX, e.clientY);
  spawnPulse(e.clientX, e.clientY, 1.4);
  for (let i=0;i<3;i++) spawnPulse(e.clientX + rand(-30,30), e.clientY + rand(-30,30), 0.9);
});

// Button actions
btnPalette?.addEventListener("click", () => {
  hue = (hue + 60) % 360;
  setVars();
  spawnPulse(W*0.5, H*0.45, 2.0);
});

btnCalm?.addEventListener("click", () => {
  intensity = Math.max(0.6, +(intensity - 0.2).toFixed(2));
  setVars();
});

btnChaos?.addEventListener("click", () => {
  intensity = Math.min(2.4, +(intensity + 0.25).toFixed(2));
  setVars();
  for (let i=0;i<6;i++) spawnPulse(rand(0,W), rand(0,H), 1.1);
});

// Canvas rendering
function frame() {
  // trails
  ctx.fillStyle = `rgba(0,0,0,${0.10 + (0.08 / intensity)})`;
  ctx.fillRect(0, 0, W, H);

  // subtle gradient wash
  const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, Math.min(W,H) * 0.8);
  g.addColorStop(0, `hsla(${hue}, 95%, 60%, ${0.18 * intensity})`);
  g.addColorStop(0.5, `hsla(${(hue+140)%360}, 95%, 60%, ${0.10 * intensity})`);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.globalCompositeOperation = "lighter";

  for (const p of pulses) {
    p.life -= p.speed;
    p.r += 5.5 * intensity;

    const alpha = Math.max(0, p.life);
    const grad = ctx.createRadialGradient(p.x, p.y, p.r * 0.05, p.x, p.y, p.r);
    grad.addColorStop(0, `hsla(${hue}, 95%, 65%, ${0.55 * alpha})`);
    grad.addColorStop(1, `hsla(${(hue+200)%360}, 95%, 65%, 0)`);

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalCompositeOperation = "source-over";

  // prune
  for (let i = pulses.length - 1; i >= 0; i--) {
    if (pulses[i].life <= 0) pulses.splice(i, 1);
  }

  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// Music: now playing + play/pause
async function refreshNowPlaying() {
  try {
    const res = await fetch("https://somafm.com/songs/groovesalad.json", { cache: "no-store" });
    const data = await res.json();
    const s = Array.isArray(data?.songs) ? data.songs[0] : null;
    npValue.textContent = s ? `${s.artist} — ${s.title}` : "No track data right now.";
  } catch {
    npValue.textContent = "Now playing unavailable (network/CORS).";
  }
}
refreshNowPlaying();
setInterval(refreshNowPlaying, 60_000);

btnPlay?.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
      btnPlay.textContent = "Pause";
    } else {
      audio.pause();
      btnPlay.textContent = "Play";
    }
  } catch {
    btnPlay.textContent = "Play";
    npValue.textContent = "Audio blocked—use the SomaFM link.";
  }
});