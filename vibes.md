---
layout: page
title: Vibes
permalink: /vibes/
indexing: false
sitemap: false
---

<link rel="stylesheet" href="/assets/vibes.css">
<div class="vibes">
  <div class="vibes-header">
    <div class="badge">APT // easter egg</div>
    <div class="hint">Try: <code>help</code>, <code>Get-NowPlaying</code>, <code>Get-PSWednesday</code>, <code>apt</code></div>
  </div>

  <div class="vibes-grid">
    <section class="panel panel-terminal" aria-label="Terminal">
      <div class="terminal-top">
        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
        <span class="terminal-title">andrewpla://vibes</span>
      </div>

      <div id="termOut" class="terminal-out" role="log" aria-live="polite"></div>

      <form id="termForm" class="terminal-in" autocomplete="off">
        <span class="prompt">PS&gt;</span>
        <input id="termInput" type="text" placeholder="type a command…" spellcheck="false" />
      </form>
    </section>

    <section class="panel panel-music" aria-label="Music">
      <h2>Work Vibes</h2>
      <p class="muted">A little background energy for building skills and shipping work.</p>

      <div class="nowplaying">
        <div class="np-label">Now playing</div>
        <div id="npValue" class="np-value">Loading…</div>
      </div>

      <div class="buttons">
        <a class="btn ghost" href="https://somafm.com/groovesalad/" target="_blank" rel="noopener">Open SomaFM</a>
        <button id="btnRefresh" class="btn ghost" type="button">Refresh track</button>
      </div>

      <!-- Optional: embedded player (use if you’re comfortable) -->
      <details class="player">
        <summary>Enable embedded audio player</summary>
        <audio id="audio" controls preload="none">
          <source src="https://ice3.somafm.com/groovesalad-128-mp3" type="audio/mpeg">
        </audio>
        <p class="fineprint">If this ever stops working, keep the page and use “Open SomaFM” instead.</p>
      </details>

      <div class="easter">
        <p class="muted">Secret:</p>
        <div class="secret">Type <code>apt</code> in the terminal.</div>
      </div>
    </section>
  </div>
</div>

<script src="/assets/vibes.js"></script>