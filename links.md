---
layout: page
title: Links
permalink: /links/
---

<link rel="stylesheet" href="{{ '/assets/links.css?v=20260221c' | relative_url }}">

<section class="ap-links-page">
  <header class="ap-links-hero">
    <img class="ap-links-avatar" src="{{ '/assets/avatar.jpg' | relative_url }}" alt="Andrew Pla profile photo">
    <div class="ap-links-hero-copy">
      <p class="ap-links-eyebrow">Andrew Pla</p>
      <h1>Useful links, fast.</h1>
      <p class="ap-links-sub">If you came from the podcast, this is the fastest way to find social profiles, content, and contact options.</p>

      <div class="ap-links-quick" id="updates">
        <a class="ap-links-btn ap-links-btn-primary" href="https://www.linkedin.com/in/andrewplatech/" target="_blank" rel="noopener noreferrer">Follow for updates</a>
        <a class="ap-links-btn" href="{{ '/podcast/' | relative_url }}">Podcast page</a>
        <a class="ap-links-btn" href="{{ '/writing/' | relative_url }}">Latest writing</a>
      </div>
    </div>
  </header>

  <div class="ap-links-grid">
    <section class="ap-links-panel" aria-labelledby="social-links">
      <h2 id="social-links">Social</h2>
      <ul class="ap-links-list">
        <li>
          <a class="ap-link-item" href="https://www.linkedin.com/in/andrewplatech/" target="_blank" rel="noopener noreferrer">
            <strong>LinkedIn</strong>
            <small>Main place for updates and professional posts</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="https://github.com/AndrewPla" target="_blank" rel="noopener noreferrer">
            <strong>GitHub</strong>
            <small>Code, scripts, and experiments</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="https://bsky.app/profile/andrewpla.tech" target="_blank" rel="noopener noreferrer">
            <strong>BlueSky</strong>
            <small>Short updates and quick thoughts</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="https://x.com/AndrewPlaTech" target="_blank" rel="noopener noreferrer">
            <strong>Twitter/X</strong>
            <small>Thread-style posts and links</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
      </ul>
    </section>

    <section class="ap-links-panel" aria-labelledby="content-links">
      <h2 id="content-links">Content</h2>
      <ul class="ap-links-list">
        <li>
          <a class="ap-link-item" href="{{ '/' | relative_url }}">
            <strong>Main blog</strong>
            <small>Articles, podcast, and everything else</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="{{ '/podcast/' | relative_url }}">
            <strong>PowerShell Podcast</strong>
            <small>Episode links and updates</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="https://www.youtube.com/@andrewplatech" target="_blank" rel="noopener noreferrer">
            <strong>YouTube</strong>
            <small>Video walkthroughs and demos</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="https://www.justhacking.com/author/andrew/" target="_blank" rel="noopener noreferrer">
            <strong>JustHacking</strong>
            <small>My author page at JustHacking.com</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
      </ul>
    </section>

    <section class="ap-links-panel" aria-labelledby="connect-links">
      <h2 id="connect-links">Connect</h2>
      <ul class="ap-links-list">
        <li>
          <a class="ap-link-item" href="{{ '/contact/' | relative_url }}">
            <strong>Contact page</strong>
            <small>Direct contact and collaboration details</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="{{ '/shop/' | relative_url }}">
            <strong>Shop</strong>
            <small>Stickers and community merch</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item" href="{{ '/shell-room/' | relative_url }}">
            <strong>Secret Shell Room</strong>
            <small>Pomodoro + study mode for PowerShell learners</small>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
      </ul>

      <div class="ap-links-inline-actions">
        <button class="ap-links-chip" id="copyEmailBtn" type="button" data-email="andrew@andrewpla.tech">Copy email</button>
        <p class="ap-links-toast" id="copyToast" role="status" aria-live="polite"></p>
      </div>
    </section>
  </div>
</section>

<script src="{{ '/assets/links.js?v=20260221c' | relative_url }}"></script>
