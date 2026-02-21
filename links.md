---
layout: page
title: Links
permalink: /links/
---

<link rel="stylesheet" href="{{ '/assets/links.css' | relative_url }}">

<section class="ap-tree-page">
  <div class="ap-tree-ambient" aria-hidden="true"></div>

  <div class="ap-tree-shell" id="apTreeShell">
    <header class="ap-tree-profile">
      <img class="ap-tree-avatar" src="{{ '/assets/avatar.jpg' | relative_url }}" alt="Andrew Pla profile photo">
      <p class="ap-tree-eyebrow">Parody mode activated</p>
      <h1>@AndrewPlaTech</h1>
      <p class="ap-tree-bio">
        A suspiciously Linktree-like page, but for sysadmins.
        Practical automation, PowerShell, podcast stuff, and updates.
      </p>
    </header>

    <section class="ap-tree-updates" id="updates" aria-label="Newsletter signup">
      <h2>Newsletter-ish updates</h2>
      <p>Friendly updates when I publish something actually useful. Newsletter is coming soon, LinkedIn is home base for now.</p>
      <a class="ap-tree-primary" href="https://www.linkedin.com/in/andrewplatech/" target="_blank" rel="noopener noreferrer">Subscribe via LinkedIn</a>
    </section>

    <section class="ap-tree-links" aria-label="Primary links">
      <a class="ap-tree-link" href="https://github.com/AndrewPla" target="_blank" rel="noopener noreferrer">
        <span class="ap-tree-icon" aria-hidden="true">🐙</span>
        <span class="ap-tree-main">
          <strong>GitHub</strong>
          <small>Code, scripts, and experiments</small>
        </span>
        <span class="ap-tree-arrow" aria-hidden="true">↗</span>
      </a>

      <a class="ap-tree-link" href="https://www.linkedin.com/in/andrewplatech" target="_blank" rel="noopener noreferrer">
        <span class="ap-tree-icon" aria-hidden="true">💼</span>
        <span class="ap-tree-main">
          <strong>LinkedIn</strong>
          <small>Updates and professional stuff</small>
        </span>
        <span class="ap-tree-arrow" aria-hidden="true">↗</span>
      </a>

      <a class="ap-tree-link" href="https://www.youtube.com/@andrewplatech" target="_blank" rel="noopener noreferrer">
        <span class="ap-tree-icon" aria-hidden="true">📺</span>
        <span class="ap-tree-main">
          <strong>YouTube</strong>
          <small>Video content and demos</small>
        </span>
        <span class="ap-tree-arrow" aria-hidden="true">↗</span>
      </a>

      <a class="ap-tree-link" href="https://bsky.app/profile/andrewpla.tech" target="_blank" rel="noopener noreferrer">
        <span class="ap-tree-icon" aria-hidden="true">🦋</span>
        <span class="ap-tree-main">
          <strong>BlueSky</strong>
          <small>Short takes and misc links</small>
        </span>
        <span class="ap-tree-arrow" aria-hidden="true">↗</span>
      </a>

      <a class="ap-tree-link" href="https://x.com/AndrewPlaTech" target="_blank" rel="noopener noreferrer">
        <span class="ap-tree-icon" aria-hidden="true">🛰️</span>
        <span class="ap-tree-main">
          <strong>Twitter/X</strong>
          <small>Thread-shaped thoughts</small>
        </span>
        <span class="ap-tree-arrow" aria-hidden="true">↗</span>
      </a>

      <a class="ap-tree-link" href="{{ '/' | relative_url }}">
        <span class="ap-tree-icon" aria-hidden="true">🏠</span>
        <span class="ap-tree-main">
          <strong>Main Site</strong>
          <small>Blog, podcast, and everything else</small>
        </span>
        <span class="ap-tree-arrow" aria-hidden="true">→</span>
      </a>
    </section>

    <section class="ap-tree-footer">
      <button class="ap-tree-chip" id="copyEmailBtn" type="button" data-email="andrew@andrewpla.tech">Copy email</button>
      <a class="ap-tree-chip" href="{{ '/contact/' | relative_url }}">Contact page</a>
      <a class="ap-tree-chip ap-tree-secret" href="{{ '/vibes/' | relative_url }}">Secret vibes room</a>
      <p class="ap-tree-legal">Definitely not Linktree. Definitely a little bit of Linktree energy.</p>
      <p class="ap-tree-toast" id="copyToast" role="status" aria-live="polite"></p>
    </section>
  </div>
</section>

<script src="{{ '/assets/links.js' | relative_url }}"></script>
