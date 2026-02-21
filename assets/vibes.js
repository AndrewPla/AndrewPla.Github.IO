(function () {
  const root = document.documentElement;
  const canvas = document.getElementById("vibesCanvas");
  const stickers = document.getElementById("stickers");
  const vibesStatus = document.getElementById("vibesStatus");

  const btnPalette = document.getElementById("btnPalette");
  const btnCalm = document.getElementById("btnCalm");
  const btnChaos = document.getElementById("btnChaos");
  const btnBurst = document.getElementById("btnBurst");

  const audio = document.getElementById("audio");
  const btnPlay = document.getElementById("btnPlay");
  const btnNext = document.getElementById("btnNext");
  const stationSelect = document.getElementById("stationSelect");
  const npValue = document.getElementById("npValue");

  const terminal = document.getElementById("terminal");
  const termOut = document.getElementById("termOut");
  const termForm = document.getElementById("termForm");
  const termInput = document.getElementById("termInput");
  const termClose = document.getElementById("termClose");

  if (!canvas || !audio) return;

  const ctx = canvas.getContext("2d");
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  let W = 0;
  let H = 0;
  let hue = 168;
  let intensity = 1;
  let stickerBurst = 8;
  let stickerSize = 88;

  let mouseX = 0;
  let mouseY = 0;
  const pulses = [];

  const stickerSets = [
    ["✨", "🛰️", "🌌", "🎛️", "🎧", "🧠", "🛸", "🫧"],
    ["🧙", "🔮", "⚡", "🕳️", "🧪", "🦄", "👾", "🌠"],
    ["🛠️", "🖥️", "⌨️", "📟", "⚙️", "🧰", "🔧", "📡"],
    ["🍄", "🪩", "🌀", "🫠", "🌈", "💥", "🪐", "🚀"]
  ];
  let stickersActive = stickerSets[0];

  const palettes = [
    { hue: 168, name: "Emerald Nebula" },
    { hue: 245, name: "Blue Supercluster" },
    { hue: 302, name: "Neon Void" },
    { hue: 36, name: "Solar Flare" }
  ];
  let paletteIndex = 0;

  const stations = [
    {
      id: "groovesalad",
      label: "Groove Salad",
      stream: "https://ice1.somafm.com/groovesalad-128-mp3",
      now: "https://somafm.com/songs/groovesalad.json",
      page: "https://somafm.com/groovesalad/"
    },
    {
      id: "dronezone",
      label: "Drone Zone",
      stream: "https://ice1.somafm.com/dronezone-128-mp3",
      now: "https://somafm.com/songs/dronezone.json",
      page: "https://somafm.com/dronezone/"
    },
    {
      id: "deepspaceone",
      label: "Deep Space One",
      stream: "https://ice1.somafm.com/deepspaceone-128-mp3",
      now: "https://somafm.com/songs/deepspaceone.json",
      page: "https://somafm.com/deepspaceone/"
    },
    {
      id: "spacestation",
      label: "Space Station",
      stream: "https://ice1.somafm.com/spacestation-128-mp3",
      now: "https://somafm.com/songs/spacestation.json",
      page: "https://somafm.com/spacestation/"
    }
  ];
  let stationIndex = 0;
  let nowPlayingTimer = null;

  let audioCtx = null;
  let analyser = null;
  let sourceNode = null;
  let freqData = null;

  function setStatus(text) {
    if (!vibesStatus) return;
    vibesStatus.textContent = text;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function setVars() {
    root.style.setProperty("--v-hue", String(hue));
    root.style.setProperty("--v-intensity", String(intensity));
  }

  function resize() {
    W = Math.floor(window.innerWidth);
    H = Math.floor(window.innerHeight);
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (!mouseX && !mouseY) {
      mouseX = W * 0.5;
      mouseY = H * 0.5;
    }
  }

  function spawnPulse(x, y, power) {
    pulses.push({
      x,
      y,
      r: rand(28, 110) * power,
      speed: rand(1.7, 4.2) * power,
      life: 1
    });
    while (pulses.length > 44) pulses.shift();
  }

  function dropSticker(x, y) {
    if (!stickers) return;
    const el = document.createElement("div");
    el.className = "sticker";
    el.textContent = stickersActive[Math.floor(Math.random() * stickersActive.length)];
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.setProperty("--rot", rand(-42, 42).toFixed(0) + "deg");
    el.style.setProperty("--dx", rand(-160, 160).toFixed(0) + "px");
    el.style.setProperty("--dur", Math.floor(rand(1200, 2200) / intensity) + "ms");
    el.style.setProperty("--size", Math.floor(rand(stickerSize * 0.72, stickerSize * 1.44)) + "px");
    stickers.appendChild(el);
    window.setTimeout(() => el.remove(), 2600);
  }

  function stickerBurstAt(x, y, count) {
    for (let i = 0; i < count; i += 1) {
      dropSticker(x + rand(-26, 26), y + rand(-26, 26));
    }
  }

  function audioEnergy() {
    if (!analyser || !freqData) return 0;
    analyser.getByteFrequencyData(freqData);
    let sum = 0;
    const n = Math.min(42, freqData.length);
    for (let i = 0; i < n; i += 1) {
      sum += freqData[i];
    }
    return (sum / n) / 255;
  }

  function frame() {
    ctx.fillStyle = `rgba(1, 2, 3, ${0.14 + 0.05 / intensity})`;
    ctx.fillRect(0, 0, W, H);

    const energy = audioEnergy();
    if (energy > 0.28 && Math.random() < energy * 0.5) {
      spawnPulse(rand(0, W), rand(0, H), 0.9 + energy * 1.9);
    }

    const wash = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, Math.min(W, H) * 0.74);
    wash.addColorStop(0, `hsla(${hue}, 96%, 63%, ${0.18 * intensity + energy * 0.22})`);
    wash.addColorStop(0.45, `hsla(${(hue + 118) % 360}, 94%, 62%, ${0.09 * intensity + energy * 0.18})`);
    wash.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, W, H);

    ctx.globalCompositeOperation = "lighter";
    for (let i = pulses.length - 1; i >= 0; i -= 1) {
      const p = pulses[i];
      p.life -= 0.012 * intensity;
      p.r += p.speed * intensity;
      if (p.life <= 0) {
        pulses.splice(i, 1);
        continue;
      }
      const alpha = Math.max(0, p.life);
      const grad = ctx.createRadialGradient(p.x, p.y, p.r * 0.06, p.x, p.y, p.r);
      grad.addColorStop(0, `hsla(${hue}, 95%, 64%, ${0.56 * alpha})`);
      grad.addColorStop(1, `hsla(${(hue + 192) % 360}, 96%, 62%, 0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    window.requestAnimationFrame(frame);
  }

  function ensureAudioAnalyzer() {
    if (audioCtx || !window.AudioContext) return;
    audioCtx = new window.AudioContext();
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    freqData = new Uint8Array(analyser.frequencyBinCount);
    sourceNode = audioCtx.createMediaElementSource(audio);
    sourceNode.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  function selectedStation() {
    return stations[stationIndex];
  }

  function setStation(index, keepPlaying) {
    if (!stations.length) return;
    stationIndex = (index + stations.length) % stations.length;
    const station = selectedStation();
    if (stationSelect) stationSelect.value = station.id;

    const shouldResume = keepPlaying && !audio.paused;
    audio.src = station.stream;
    audio.load();
    npValue.textContent = "Tuning " + station.label + "...";
    setStatus("Switched to " + station.label + ".");
    refreshNowPlaying();

    if (shouldResume) {
      audio.play().catch(() => {
        setStatus("Tap Play to resume audio.");
      });
    }
  }

  async function refreshNowPlaying() {
    const station = selectedStation();
    if (!station) return;
    try {
      const res = await fetch(station.now, { cache: "no-store" });
      if (!res.ok) throw new Error("bad-response");
      const data = await res.json();
      const top = Array.isArray(data.songs) ? data.songs[0] : null;
      if (!top) throw new Error("bad-payload");
      npValue.textContent = top.artist + " - " + top.title;
    } catch {
      npValue.innerHTML = "Now playing unavailable. <a href=\"" + station.page + "\" target=\"_blank\" rel=\"noopener noreferrer\">Open station page</a>.";
    }
  }

  function startNowPlayingTimer() {
    if (nowPlayingTimer) window.clearInterval(nowPlayingTimer);
    nowPlayingTimer = window.setInterval(refreshNowPlaying, 60000);
  }

  function writeLine(line) {
    if (!termOut) return;
    const row = document.createElement("div");
    row.className = "terminal-line";
    row.textContent = line;
    termOut.appendChild(row);
    termOut.scrollTop = termOut.scrollHeight;
  }

  function openTerminal() {
    if (!terminal) return;
    terminal.classList.remove("hidden");
    if (termInput) termInput.focus();
  }

  function closeTerminal() {
    if (!terminal) return;
    terminal.classList.add("hidden");
  }

  function handleCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    writeLine("> " + raw);
    if (cmd === "help") {
      writeLine("Commands: help, whoami, vibe, calm, chaos, station, clear");
      return;
    }
    if (cmd === "whoami") {
      writeLine("You are someone with excellent taste in hidden pages.");
      return;
    }
    if (cmd === "vibe") {
      setStatus("Vibe level stable at " + intensity.toFixed(2));
      writeLine("Vibe level: " + intensity.toFixed(2));
      return;
    }
    if (cmd === "calm") {
      intensity = Math.max(0.6, +(intensity - 0.2).toFixed(2));
      stickerBurst = Math.max(4, stickerBurst - 2);
      setVars();
      writeLine("Calming down. Intensity: " + intensity.toFixed(2));
      return;
    }
    if (cmd === "chaos") {
      intensity = Math.min(2.6, +(intensity + 0.24).toFixed(2));
      stickerBurst = Math.min(36, stickerBurst + 4);
      setVars();
      writeLine("Chaos increased. Intensity: " + intensity.toFixed(2));
      return;
    }
    if (cmd === "station") {
      const station = selectedStation();
      writeLine("Current station: " + (station ? station.label : "None"));
      return;
    }
    if (cmd === "clear") {
      if (termOut) termOut.innerHTML = "";
      return;
    }
    writeLine("Unknown command. Try: help");
  }

  function bindEvents() {
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (Math.random() < 0.07 * intensity) {
        spawnPulse(mouseX, mouseY, 0.8);
      }
    });

    window.addEventListener("click", (event) => {
      spawnPulse(event.clientX, event.clientY, 1.7);
      stickerBurstAt(event.clientX, event.clientY, Math.floor(stickerBurst * intensity * 0.75));
    });

    btnPalette && btnPalette.addEventListener("click", () => {
      paletteIndex = (paletteIndex + 1) % palettes.length;
      hue = palettes[paletteIndex].hue;
      stickersActive = stickerSets[paletteIndex % stickerSets.length];
      setVars();
      setStatus("Universe switched to " + palettes[paletteIndex].name + ".");
      spawnPulse(W * 0.5, H * 0.45, 2.2);
    });

    btnCalm && btnCalm.addEventListener("click", () => {
      intensity = Math.max(0.6, +(intensity - 0.2).toFixed(2));
      stickerBurst = Math.max(4, stickerBurst - 2);
      stickerSize = Math.max(62, stickerSize - 8);
      setVars();
      setStatus("Calmer mode engaged.");
    });

    btnChaos && btnChaos.addEventListener("click", () => {
      intensity = Math.min(2.6, +(intensity + 0.24).toFixed(2));
      stickerBurst = Math.min(36, stickerBurst + 4);
      stickerSize = Math.min(150, stickerSize + 10);
      setVars();
      setStatus("Chaos level increased.");
      for (let i = 0; i < 10; i += 1) {
        spawnPulse(rand(0, W), rand(0, H), 1.05);
      }
    });

    btnBurst && btnBurst.addEventListener("click", () => {
      stickerBurstAt(W * 0.5, H * 0.56, Math.floor(18 * intensity));
      setStatus("Sticker storm deployed.");
    });

    btnPlay && btnPlay.addEventListener("click", async () => {
      try {
        ensureAudioAnalyzer();
        if (audioCtx && audioCtx.state === "suspended") {
          await audioCtx.resume();
        }
        if (audio.paused) {
          await audio.play();
          btnPlay.textContent = "Pause";
          setStatus("Now playing " + selectedStation().label + ".");
        } else {
          audio.pause();
          btnPlay.textContent = "Play";
          setStatus("Playback paused.");
        }
      } catch {
        setStatus("Audio was blocked. Try the station link in the Now Playing area.");
      }
    });

    btnNext && btnNext.addEventListener("click", () => {
      setStation(stationIndex + 1, true);
    });

    stationSelect && stationSelect.addEventListener("change", (event) => {
      const id = event.target.value;
      const idx = stations.findIndex((station) => station.id === id);
      if (idx >= 0) setStation(idx, true);
    });

    audio.addEventListener("play", () => {
      if (btnPlay) btnPlay.textContent = "Pause";
    });
    audio.addEventListener("pause", () => {
      if (btnPlay) btnPlay.textContent = "Play";
    });
    audio.addEventListener("error", () => {
      setStatus("Stream error. Try Next or open SomaFM directly.");
    });

    window.addEventListener("keydown", (event) => {
      if (event.key.toLowerCase() === "v" && document.activeElement !== termInput) {
        if (terminal && terminal.classList.contains("hidden")) {
          openTerminal();
        } else {
          closeTerminal();
        }
      }
      if (event.key === "Escape") {
        closeTerminal();
      }
    });

    termClose && termClose.addEventListener("click", closeTerminal);
    termForm && termForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!termInput) return;
      handleCommand(termInput.value);
      termInput.value = "";
    });
  }

  resize();
  setVars();
  bindEvents();

  const preset = stationSelect ? stations.findIndex((station) => station.id === stationSelect.value) : -1;
  if (preset >= 0) stationIndex = preset;
  setStation(stationIndex, false);
  startNowPlayingTimer();

  writeLine("Welcome to the secret terminal.");
  writeLine("Type 'help' for commands.");

  window.requestAnimationFrame(frame);
})();
