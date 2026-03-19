(function () {
  const shellRoot = document.getElementById("shellRoot");
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
  const alarmStopBtn = document.getElementById("alarmStopBtn");
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
  let alarmIntervalId = null;
  let alarmTimeoutId = null;
  let visualAlarmTimeoutId = null;
  let sharedAudioCtx = null;
  let alarmActive = false;

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

  function setAlarmButtonState(active) {
    if (!alarmStopBtn) return;
    alarmStopBtn.disabled = !active;
    alarmStopBtn.setAttribute("aria-disabled", active ? "false" : "true");
  }

  function resetPhase(seconds, mode) {
    phase = mode;
    remaining = seconds;
    updateTimerView();
  }

  function playAlarm() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!sharedAudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }

    sharedAudioCtx.resume().catch(() => {});

    stopAlarm({ keepStatus: true, keepVisual: true });
    alarmActive = true;
    setAlarmButtonState(true);

    const notes = [880, 660, 990, 740, 1100, 820];
    let noteIndex = 0;
    const hitDuration = 0.2;
    const stepMs = 250;
    const totalDurationMs = 9000;

    function playHit(freq) {
      const osc = sharedAudioCtx.createOscillator();
      const gain = sharedAudioCtx.createGain();
      const now = sharedAudioCtx.currentTime;
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.value = 0.001;
      osc.connect(gain);
      gain.connect(sharedAudioCtx.destination);
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + hitDuration);
      osc.start(now);
      osc.stop(now + hitDuration + 0.02);
    }

    playHit(notes[noteIndex % notes.length]);
    noteIndex += 1;

    alarmIntervalId = window.setInterval(() => {
      playHit(notes[noteIndex % notes.length]);
      noteIndex += 1;
    }, stepMs);

    alarmTimeoutId = window.setTimeout(() => {
      stopAlarm({ keepStatus: true });
    }, totalDurationMs);
  }

  function stopAlarm(options) {
    const opts = options || {};

    if (alarmIntervalId) {
      window.clearInterval(alarmIntervalId);
      alarmIntervalId = null;
    }
    if (alarmTimeoutId) {
      window.clearTimeout(alarmTimeoutId);
      alarmTimeoutId = null;
    }
    if (visualAlarmTimeoutId) {
      window.clearTimeout(visualAlarmTimeoutId);
      visualAlarmTimeoutId = null;
    }
    if (!opts.keepVisual && shellRoot) {
      shellRoot.classList.remove("alarm-active");
    }

    alarmActive = false;
    setAlarmButtonState(false);

    if (!opts.keepStatus) {
      setAudioStatus("Alarm stopped.");
    }
  }

  function triggerVisualAlarm() {
    if (!shellRoot) return;
    shellRoot.classList.add("alarm-active");
    if (visualAlarmTimeoutId) {
      window.clearTimeout(visualAlarmTimeoutId);
    }
    visualAlarmTimeoutId = window.setTimeout(() => {
      shellRoot.classList.remove("alarm-active");
      visualAlarmTimeoutId = null;
      alarmActive = false;
      setAlarmButtonState(false);
    }, 10000);
  }

  function phaseComplete() {
    playAlarm();
    triggerVisualAlarm();
    setAudioStatus("Timer complete. Press Stop Alarm to silence.");
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
    if (alarmActive) {
      stopAlarm({ keepStatus: true });
    }
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
    stopAlarm({ keepStatus: true });
    pauseTimer();
    phaseCount = 1;
    resetPhase(focusMinutes() * 60, "focus");
    setAudioStatus("Timer reset.");
  }

  function skipPhase() {
    stopAlarm({ keepStatus: true });
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
      triggerVisualAlarm();
      setAudioStatus("Alarm test played. Press Stop Alarm to silence.");
    });

    if (alarmStopBtn) {
      alarmStopBtn.addEventListener("click", () => {
        stopAlarm();
        setAudioStatus("Alarm silenced.");
      });
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
    stopAlarm({ keepStatus: true });
    document.title = "Andrew Pla";
  });

  resize();
  setAlarmButtonState(false);
  updateTimerView();
  bindTimer();
  bindAudio();
  bindDrills();
  bindPointer();
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(drawMatrix);
})();
