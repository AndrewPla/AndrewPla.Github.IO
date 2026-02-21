---
layout: page
title: ""
permalink: /
---

<section class="ap-hero">
  <p class="ap-eyebrow">For IT Pros Who Want to Level Up</p>
  <h1>Build practical IT skills that move your career forward.</h1>
  <p class="ap-lead">I’m Andrew Pla — sysadmin helping sysadmins. PowerShell MVP, speaker, and podcast host at PDQ. I share tactical ideas you can use right away to work faster, secure your environment, and grow your options.</p>

  <div class="ap-cta-row">
    <a class="button" href="/links/#updates">Get updates</a>
    <a class="button ap-ghost" href="/writing/">Start reading</a>
    <a class="button ap-soft" href="/contact/">Contact Andrew</a>
  </div>
</section>

<section class="ap-grid" aria-label="Quick destinations">
  <a class="ap-card" href="/writing/">
    <h2>Writing</h2>
    <p>Actionable walkthroughs on PowerShell, automation, and admin workflows.</p>
  </a>
  <a class="ap-card" href="/podcast/">
    <h2>Podcast</h2>
    <p>Conversations and practical takes to help you stay sharp in IT.</p>
  </a>
  <a class="ap-card" href="/links/">
    <h2>Links</h2>
    <p>Useful resources, updates, and shortcuts to stay connected.</p>
  </a>
</section>

<section class="ap-latest">
  <div class="ap-section-head">
    <h2>Latest writing</h2>
    <a href="/writing/">View all posts →</a>
  </div>

  <ul class="ap-posts">
  {% for post in site.posts limit: 5 %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
    </li>
  {% endfor %}
  </ul>
</section>
