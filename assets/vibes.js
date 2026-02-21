(function () {
  const canvas = document.getElementById("shellCanvas");
  const taskInput = document.getElementById("taskInput");
  const focusMinutesInput = document.getElementById("focusMinutes");
  const breakMinutesInput = document.getElementById("breakMinutes");
  const autoStartBreakInput = document.getElementById("autoStartBreak");
  const timerDisplay = document.getElementById("timerDisplay");
  const timerStatus = document.getElementById("timerStatus");
  const startPauseBtn = document.getElementById("startPauseBtn");
  const resetBtn = document.getElementById("resetBtn");
  const skipBtn = document.getElementById("skipBtn");

  const stationSelect = document.getElementById("stationSelect");
  const volumeRange = document.getElementById("volumeRange");
  const playBtn = document.getElementById("playBtn");
  const alarmTestBtn = document.getElementById("alarmTestBtn");
  const audioStatus = document.getElementById("audioStatus");
  const focusAudio = document.getElementById("focusAudio");

  const drillText = document.getElementById("drillText");
  const nextDrillBtn = document.getElementById("nextDrillBtn");

  if (!canvas || !timerDisplay || !focusAudio) return;

  const ctx = canvas.getContext("2d");
  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

  let width = 0;
  let height = 0;
  let pointerX = 0;
  let pointerY = 0;
  let time = 0;
  let matrixCols = [];
  let timerId = null;
  let isRunning = false;
  let phase = "focus";
  let remaining = 25 * 60;
  let phaseCount = 1;

  const drills = [
    "Get-Process | Sort-Object CPU -Descending | Select-Object -First 10",
    "Get-Service | Where-Object Status -eq 'Running' | Sort-Object DisplayName",
    "Get-ChildItem -Recurse | Group-Object Extension | Sort-Object Count -Descending",
    "$env:Path -split ';' | Where-Object { $_ }",
    "Get-EventLog -LogName System -Newest 25 | Select-Object TimeGenerated, EntryType, Source, Message",
    "Get-Command -Module Microsoft.PowerShell.Utility | Select-Object -First 20"
  ];
  let drillIndex = 0;

  function setAudioStatus(message) {
    if (audioStatus) audioStatus.textContent = message;
  }

  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  }

  function focusMinutes() {
    return Math.max(1, Math.min(120, Number(focusMinutesInput.value) || 25));
  }

  function breakMinutes() {
    return Math.max(1, Math.min(60, Number(breakMinutesInput.value) || 5));
  }

  function updateTimerView() {
    timerDisplay.textContent = formatTime(remaining);
    const task = taskInput && taskInput.value.trim() ? taskInput.value.trim() : "No task set";
    if (phase === "focus") {
      timerStatus.textContent = "Focus " + phaseCount + " | " + task;
    } else {
      timerStatus.textContent = "Break time | breathe + stretch";
    }
    document.title = formatTime(remaining) + " - " + (phase === "focus" ? "Focus" : "Break");
  }

  function resetPhase(seconds, mode) {
    phase = mode;
    remaining = seconds;
    updateTimerView();
  }

  function playAlarm() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const audioCtx = new AudioCtx();
    const now = audioCtx.currentTime;
    const notes = [880, 660, 990, 740, 1100];
    for (let i = 0; i < notes.length; i += 1) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "square";
      osc.frequency.value = notes[i];
      gain.gain.value = 0.001;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      const start = now + i * 0.22;
      gain.gain.exponentialRampToValueAtTime(0.11, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
      osc.start(start);
      osc.stop(start + 0.2);
    }
  }

  function phaseComplete() {
    playAlarm();
    if (phase === "focus") {
      resetPhase(breakMinutes() * 60, "break");
    } else {
      phaseCount += 1;
      resetPhase(focusMinutes() * 60, "focus");
    }

    const autoNext = autoStartBreakInput && autoStartBreakInput.checked;
    if (!autoNext) {
      pauseTimer();
      timerStatus.textContent += " | Complete. Press Start.";
    }
  }

  function tick() {
    if (!isRunning) return;
    remaining -= 1;
    if (remaining <= 0) {
      remaining = 0;
      updateTimerView();
      phaseComplete();
      return;
    }
    updateTimerView();
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startPauseBtn.textContent = "Pause";
    timerId = window.setInterval(tick, 1000);
  }

  function pauseTimer() {
    isRunning = false;
    startPauseBtn.textContent = "Start";
    if (timerId) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function resetTimer() {
    pauseTimer();
    phaseCount = 1;
    resetPhase(focusMinutes() * 60, "focus");
  }

  function skipPhase() {
    phaseComplete();
  }

  function resize() {
    width = Math.floor(window.innerWidth);
    height = Math.floor(window.innerHeight);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colWidth = 16;
    const count = Math.ceil(width / colWidth);
    matrixCols = new Array(count).fill(0).map(() => Math.random() * height);
    pointerX = width * 0.5;
    pointerY = height * 0.5;
  }

  function drawMatrix() {
    time += 0.016;
    ctx.fillStyle = "rgba(3, 9, 7, 0.18)";
    ctx.fillRect(0, 0, width, height);

    const chars = "01PS>$#{}[]()|+-*";
    ctx.font = "14px 'Courier New', monospace";

    for (let i = 0; i < matrixCols.length; i += 1) {
      const x = i * 16;
      const y = matrixCols[i];
      const char = chars[Math.floor(Math.random() * chars.length)];

      ctx.fillStyle = "rgba(72, 255, 184, 0.88)";
      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.98) {
        matrixCols[i] = 0;
      } else {
        matrixCols[i] += 10 + Math.random() * 10;
      }
    }

    const ringRadius = 80 + Math.sin(time * 4) * 26;
    const glow = ctx.createRadialGradient(pointerX, pointerY, 8, pointerX, pointerY, ringRadius);
    glow.addColorStop(0, "rgba(57, 212, 255, 0.24)");
    glow.addColorStop(1, "rgba(57, 212, 255, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);

    window.requestAnimationFrame(drawMatrix);
  }

  function bindAudio() {
    focusAudio.volume = (Number(volumeRange.value) || 55) / 100;

    stationSelect.addEventListener("change", () => {
      focusAudio.src = stationSelect.value;
      focusAudio.load();
      setAudioStatus("Station changed. Press Play.");
    });

    volumeRange.addEventListener("input", () => {
      focusAudio.volume = (Number(volumeRange.value) || 55) / 100;
    });

    playBtn.addEventListener("click", async () => {
      try {
        if (focusAudio.paused) {
          await focusAudio.play();
          playBtn.textContent = "Pause";
          setAudioStatus("Streaming SomaFM.");
        } else {
          focusAudio.pause();
          playBtn.textContent = "Play";
          setAudioStatus("Audio paused.");
        }
      } catch {
        setAudioStatus("Browser blocked autoplay. Press Play again.");
      }
    });

    alarmTestBtn.addEventListener("click", () => {
      playAlarm();
      setAudioStatus("Alarm test played.");
    });
  }

  function bindTimer() {
    startPauseBtn.addEventListener("click", () => {
      if (isRunning) {
        pauseTimer();
      } else {
        startTimer();
      }
    });

    resetBtn.addEventListener("click", resetTimer);
    skipBtn.addEventListener("click", skipPhase);

    focusMinutesInput.addEventListener("change", () => {
      if (!isRunning && phase === "focus") {
        resetPhase(focusMinutes() * 60, "focus");
      }
    });

    breakMinutesInput.addEventListener("change", () => {
      if (!isRunning && phase === "break") {
        resetPhase(breakMinutes() * 60, "break");
      }
    });
  }

  function bindDrills() {
    if (!nextDrillBtn || !drillText) return;
    nextDrillBtn.addEventListener("click", () => {
      drillIndex = (drillIndex + 1) % drills.length;
      drillText.textContent = drills[drillIndex];
    });
  }

  function bindPointer() {
    window.addEventListener("mousemove", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    });

    window.addEventListener("click", (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      for (let i = 0; i < 25; i += 1) {
        const idx = Math.floor(Math.random() * matrixCols.length);
        matrixCols[idx] = Math.random() * height * 0.2;
      }
    });
  }

  window.addEventListener("beforeunload", () => {
    pauseTimer();
    document.title = "Andrew Pla";
  });

  resize();
  updateTimerView();
  bindTimer();
  bindAudio();
  bindDrills();
  bindPointer();
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(drawMatrix);
})();
