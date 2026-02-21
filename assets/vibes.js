const out = document.getElementById("termOut");
const input = document.getElementById("termInput");
const form = document.getElementById("termForm");
const npValue = document.getElementById("npValue");
const btnRefresh = document.getElementById("btnRefresh");

const history = [];
let historyIndex = -1;

function line(text, cls="line") {
  const div = document.createElement("div");
  div.className = cls;
  div.textContent = text;
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}

function banner() {
  line("AndrewPla.tech // vibes mode", "line good");
  line("Type 'help' for commands. This page is an easter egg.", "line muted");
  line("");
}

async function refreshNowPlaying() {
  try {
    // SomaFM recent songs JSON (public endpoint)
    const res = await fetch("https://somafm.com/songs/groovesalad.json", { cache: "no-store" });
    const data = await res.json();
    const s = Array.isArray(data?.songs) ? data.songs[0] : null;
    const txt = s ? `${s.artist} — ${s.title}` : "No track data right now.";
    npValue.textContent = txt;
    return txt;
  } catch (e) {
    npValue.textContent = "Couldn’t load track data (network/CORS).";
    return null;
  }
}

function help() {
  line("Commands:", "line");
  line("  help                Show this help", "line muted");
  line("  whoami              Quick intro", "line muted");
  line("  Get-NextLevel       Tiny encouragement", "line muted");
  line("  Get-PSWednesday     A friendly nudge", "line muted");
  line("  Get-NowPlaying      Pull current track", "line muted");
  line("  Invoke-Hype         Hype mode", "line muted");
  line("  apt                 secret command", "line muted");
  line("  clear               Clear screen", "line muted");
}

function whoami() {
  line("Andrew Pla — sysadmin helping sysadmins. PowerShell MVP. Speaker. Podcast host.", "line");
  line("I’m here for practical skills + career momentum + community energy.", "line muted");
}

function nextLevel() {
  const msgs = [
    "Small improvements compound. Ship one helpful thing today.",
    "You’re closer than you think. Keep going.",
    "Momentum beats motivation. One rep counts.",
    "Make the workday smoother. Then make the next step inevitable."
  ];
  line(msgs[Math.floor(Math.random() * msgs.length)], "line good");
}

function psw() {
  line("Get-PSWednesday : Every week is a good week to learn something that makes your job easier.", "line");
  line("If you found this page… you’re officially invited to the inner circle 😄", "line muted");
}

async function nowPlaying() {
  const txt = await refreshNowPlaying();
  if (txt) line(`Now playing: ${txt}`, "line good");
}

function hype() {
  line("🚀 HYPE MODE ENABLED", "line warn");
  line("You’re not behind. You’re building. Keep stacking wins.", "line good");
}

function apt() {
  line("APT = Andrew Pla Tech // Automation. Practical. Trustworthy.", "line");
  line("Secret unlocked: you get +10 sysadmin charisma.", "line good");
}

function run(cmdRaw) {
  const cmd = cmdRaw.trim();
  if (!cmd) return;

  line(`PS> ${cmd}`, "line muted");

  const c = cmd.toLowerCase();
  if (c === "help" || c === "?") return help();
  if (c === "whoami") return whoami();
  if (c === "get-nextlevel") return nextLevel();
  if (c === "get-pswednesday") return psw();
  if (c === "get-nowplaying") return nowPlaying();
  if (c === "invoke-hype") return hype();
  if (c === "apt") return apt();
  if (c === "clear" || c === "cls") { out.innerHTML = ""; return banner(); }

  line("Command not found. Try: help", "line warn");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;
  history.push(value);
  historyIndex = history.length;
  input.value = "";
  run(value);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (history.length === 0) return;
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex] ?? "";
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (history.length === 0) return;
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = history[historyIndex] ?? "";
  }
});

btnRefresh?.addEventListener("click", () => refreshNowPlaying());

banner();
refreshNowPlaying();
input?.focus();