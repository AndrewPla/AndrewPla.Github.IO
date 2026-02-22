---
layout: page
title: Links
permalink: /links/
---

<link rel="stylesheet" href="{{ '/assets/links.css?v=20260222a' | relative_url }}">

<section class="ap-links-page">
  <header class="ap-links-hero">
    <img class="ap-links-avatar" src="{{ '/assets/avatar.jpg' | relative_url }}" alt="Andrew Pla profile photo">
    <div class="ap-links-hero-copy">
      <p class="ap-links-eyebrow">Andrew Pla</p>
      <h1>Everything important, one page.</h1>
      <p class="ap-links-sub">If you came from the podcast or social, start with the top cards and then pick the channel that matches what you want.</p>

      <div class="ap-links-quick" id="updates">
        <a class="ap-links-btn ap-links-btn-primary" href="https://www.linkedin.com/in/andrewplatech/" target="_blank" rel="noopener noreferrer">LinkedIn updates</a>
        <a class="ap-links-btn" href="https://www.instagram.com/andrewplatech/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a class="ap-links-btn" href="https://www.buymeacoffee.com/andrewplatech" target="_blank" rel="noopener noreferrer">Buy me a coffee</a>
        <a class="ap-links-btn" href="{{ '/podcast/' | relative_url }}">Podcast page</a>
      </div>
    </div>
  </header>

  <section class="ap-links-priority" aria-label="Top platforms">
    <a class="ap-priority-card ap-priority-card--linkedin" href="https://www.linkedin.com/in/andrewplatech/" target="_blank" rel="noopener noreferrer">
      <span class="ap-priority-icon">{% include icon.html id="linkedin" title="LinkedIn" width="22" height="22" %}</span>
      <strong>LinkedIn</strong>
      <small>Main place for updates, practical posts, and new content drops.</small>
    </a>

    <a class="ap-priority-card ap-priority-card--instagram" href="https://www.instagram.com/andrewplatech/" target="_blank" rel="noopener noreferrer">
      <span class="ap-priority-icon">{% include icon.html id="instagram" title="Instagram" width="22" height="22" %}</span>
      <strong>Instagram</strong>
      <small>Behind-the-scenes, short clips, and everyday creator updates.</small>
    </a>

    <a class="ap-priority-card ap-priority-card--coffee" href="https://www.buymeacoffee.com/andrewplatech" target="_blank" rel="noopener noreferrer">
      <span class="ap-priority-icon ap-priority-icon--fallback" aria-hidden="true">BMC</span>
      <strong>Buy me a coffee</strong>
      <small>Support the work directly if you want to back the content.</small>
    </a>
  </section>

  <div class="ap-links-grid">
    <section class="ap-links-panel" aria-labelledby="social-links-main">
      <h2 id="social-links-main">Social + Community</h2>
      <ul class="ap-links-list">
        <li>
          <a class="ap-link-item ap-link-item--linkedin" href="https://www.linkedin.com/in/andrewplatech/" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon">{% include icon.html id="linkedin" title="LinkedIn" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>LinkedIn</strong>
              <small>Main place for updates and professional posts</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--instagram" href="https://www.instagram.com/andrewplatech/" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon">{% include icon.html id="instagram" title="Instagram" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>Instagram</strong>
              <small>Short-form updates, creator posts, and visual content</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--github" href="https://github.com/AndrewPla" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon">{% include icon.html id="github" title="GitHub" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>GitHub</strong>
              <small>Code, scripts, and experiments</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--bluesky" href="https://bsky.app/profile/andrewpla.tech" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon ap-link-icon--fallback" aria-hidden="true">BS</span>
            <span class="ap-link-copy">
              <strong>BlueSky</strong>
              <small>Short updates and quick thoughts</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--x" href="https://x.com/AndrewPlaTech" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon">{% include icon.html id="twitter" title="X" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>Twitter/X</strong>
              <small>Thread-style posts and links</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
      </ul>
    </section>

    <section class="ap-links-panel" aria-labelledby="content-links-main">
      <h2 id="content-links-main">Content + Media</h2>
      <ul class="ap-links-list">
        <li>
          <a class="ap-link-item ap-link-item--blog" href="{{ '/' | relative_url }}">
            <span class="ap-link-icon">{% include icon.html id="link" title="Main site" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>Main blog</strong>
              <small>Articles, podcast, and everything else</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--writing" href="{{ '/writing/' | relative_url }}">
            <span class="ap-link-icon">{% include icon.html id="link" title="Writing archive" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>Writing archive</strong>
              <small>Direct link to all posts in one place</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--podcast" href="{{ '/podcast/' | relative_url }}">
            <span class="ap-link-icon">{% include icon.html id="rss" title="Podcast" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>PowerShell Podcast</strong>
              <small>Episode links, embedded player, and updates</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--youtube" href="https://www.youtube.com/@andrewplatech" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon">{% include icon.html id="youtube" title="YouTube" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>YouTube</strong>
              <small>Video walkthroughs and demos</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--justhacking" href="https://www.justhacking.com/author/andrew/" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon">{% include icon.html id="link" title="JustHacking" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>JustHacking</strong>
              <small>My author page at JustHacking.com</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
      </ul>
    </section>

    <section class="ap-links-panel" aria-labelledby="connect-links-main">
      <h2 id="connect-links-main">Direct + Support</h2>
      <ul class="ap-links-list">
        <li>
          <a class="ap-link-item ap-link-item--coffee" href="https://www.buymeacoffee.com/andrewplatech" target="_blank" rel="noopener noreferrer">
            <span class="ap-link-icon ap-link-icon--fallback" aria-hidden="true">BMC</span>
            <span class="ap-link-copy">
              <strong>Buy me a coffee</strong>
              <small>Directly support content and creator work</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--contact" href="{{ '/contact/' | relative_url }}">
            <span class="ap-link-icon">{% include icon.html id="email" title="Contact" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>Contact page</strong>
              <small>Direct contact and collaboration details</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--shop" href="{{ '/shop/' | relative_url }}">
            <span class="ap-link-icon">{% include icon.html id="link" title="Shop" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>Shop</strong>
              <small>Stickers and community merch</small>
            </span>
            <span class="ap-link-arrow">-></span>
          </a>
        </li>
        <li>
          <a class="ap-link-item ap-link-item--shell" href="{{ '/shell-room/' | relative_url }}">
            <span class="ap-link-icon">{% include icon.html id="codepen" title="Shell Room" width="18" height="18" %}</span>
            <span class="ap-link-copy">
              <strong>Secret Shell Room</strong>
              <small>Pomodoro + study mode for PowerShell learners</small>
            </span>
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

<script src="{{ '/assets/links.js?v=20260222a' | relative_url }}"></script>
