(function () {
  const canvas = document.getElementById("v90Canvas");
  const statusEl = document.getElementById("v90Status");
  const audio = document.getElementById("v90Audio");
  const stationSelect = document.getElementById("v90Station");
  const playBtn = document.getElementById("v90Play");
  const tripBtn = document.getElementById("v90Trip");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  let width = 0;
  let height = 0;
  let t = 0;
  let hue = 140;
  let pointerX = 0;
  let pointerY = 0;
  let hyper = false;

  const sparks = [];

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resize() {
    width = Math.floor(window.innerWidth);
    height = Math.floor(window.innerHeight);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!pointerX && !pointerY) {
      pointerX = width * 0.5;
      pointerY = height * 0.5;
    }
  }

  function spawnSpark(x, y, extra) {
    sparks.push({
      x,
      y,
      vx: rand(-1.8, 1.8) * extra,
      vy: rand(-2.2, 2.2) * extra,
      life: rand(0.45, 1),
      size: rand(2, 7) * extra
    });
    if (sparks.length > 380) sparks.shift();
  }

  function burst(x, y, amount) {
    for (let i = 0; i < amount; i += 1) {
      spawnSpark(x + rand(-20, 20), y + rand(-20, 20), rand(0.8, 1.4));
    }
  }

  function drawBackground(time) {
    const speed = hyper ? 1.8 : 1;
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, `hsl(${(hue + time * 24 * speed) % 360}, 70%, 8%)`);
    g.addColorStop(0.5, `hsl(${(hue + 95 + time * 30 * speed) % 360}, 75%, 11%)`);
    g.addColorStop(1, `hsl(${(hue + 180 + time * 20 * speed) % 360}, 70%, 8%)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    const rings = hyper ? 9 : 6;
    for (let i = 0; i < rings; i += 1) {
      const r = (Math.sin(time * (0.7 + i * 0.1)) * 0.5 + 0.5) * (Math.min(width, height) * 0.55);
      const grad = ctx.createRadialGradient(pointerX, pointerY, Math.max(10, r * 0.08), pointerX, pointerY, r);
      grad.addColorStop(0, `hsla(${(hue + i * 35 + time * 70) % 360}, 95%, 65%, ${hyper ? 0.2 : 0.12})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(pointerX, pointerY, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawGrid(time) {
    const cell = hyper ? 34 : 46;
    ctx.save();
    ctx.globalAlpha = hyper ? 0.22 : 0.14;
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;

    const driftX = (time * (hyper ? 55 : 28)) % cell;
    const driftY = (time * (hyper ? 35 : 18)) % cell;

    for (let x = -cell; x < width + cell; x += cell) {
      ctx.beginPath();
      ctx.moveTo(x + driftX, 0);
      ctx.lineTo(x + driftX, height);
      ctx.stroke();
    }
    for (let y = -cell; y < height + cell; y += cell) {
      ctx.beginPath();
      ctx.moveTo(0, y + driftY);
      ctx.lineTo(width, y + driftY);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawSparks() {
    for (let i = sparks.length - 1; i >= 0; i -= 1) {
      const s = sparks[i];
      s.life -= hyper ? 0.024 : 0.016;
      if (s.life <= 0) {
        sparks.splice(i, 1);
        continue;
      }
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.02;

      ctx.fillStyle = `hsla(${(hue + i * 3) % 360}, 100%, 68%, ${s.life})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function frame() {
    t += hyper ? 0.02 : 0.012;
    hue = (hue + (hyper ? 1.2 : 0.42)) % 360;

    drawBackground(t);
    drawGrid(t);
    drawSparks();

    if (Math.random() < (hyper ? 0.45 : 0.18)) {
      spawnSpark(pointerX + rand(-16, 16), pointerY + rand(-16, 16), hyper ? 1.4 : 1);
    }

    window.requestAnimationFrame(frame);
  }

  function bind() {
    window.addEventListener("resize", resize);

    window.addEventListener("mousemove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (Math.random() < 0.35) {
        spawnSpark(pointerX, pointerY, hyper ? 1.2 : 0.9);
      }
    });

    window.addEventListener("click", (event) => {
      burst(event.clientX, event.clientY, hyper ? 42 : 26);
      setStatus("Chaos burst deployed.");
    });

    if (stationSelect && audio) {
      stationSelect.addEventListener("change", () => {
        audio.src = stationSelect.value;
        audio.load();
        setStatus("Station changed. Press PLAY.");
      });
    }

    if (playBtn && audio) {
      playBtn.addEventListener("click", async () => {
        try {
          if (audio.paused) {
            await audio.play();
            playBtn.textContent = "PAUSE";
            setStatus("Streaming audio.");
          } else {
            audio.pause();
            playBtn.textContent = "PLAY";
            setStatus("Audio paused.");
          }
        } catch {
          setStatus("Browser blocked autoplay. Press PLAY again.");
        }
      });
    }

    if (tripBtn) {
      tripBtn.addEventListener("click", () => {
        hyper = !hyper;
        tripBtn.textContent = hyper ? "CALM DOWN" : "TRIP OUT";
        setStatus(hyper ? "HYPER MODE ACTIVATED." : "Hyper mode disabled.");
        burst(width * 0.5, height * 0.5, hyper ? 80 : 32);
      });
    }
  }

  resize();
  bind();
  setStatus("Move your mouse. Click to spawn extra chaos.");
  window.requestAnimationFrame(frame);
})();
