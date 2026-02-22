---
layout: home
title: ""
permalink: /
---

<section class="ap-hero">
  <p class="ap-eyebrow">Practical IT content, no fluff</p>
  <h1>Subscribe for practical IT ideas you can apply immediately.</h1>
  <p class="ap-lead">I am Andrew Pla, a sysadmin helping sysadmins. I share real-world tips on PowerShell, automation, and leveling up your IT career.</p>

  <div class="ap-subscribe">
    <p class="ap-subscribe-copy">Get occasional updates when I publish something useful. Newsletter is launching soon, and updates currently land via LinkedIn.</p>
    <a class="button ap-primary-cta" href="/links/#updates">Join the newsletter</a>
    <p class="ap-subscribe-note">No spam. Just useful updates.</p>
  </div>

  <p class="ap-quick-links">
    <a href="/writing/">Read the blog</a>
    <span aria-hidden="true">/</span>
    <a href="/podcast/">Listen to the podcast</a>
    <span aria-hidden="true">/</span>
    <a href="/links/">All links</a>
    <span aria-hidden="true">/</span>
    <a href="/about/">About Andrew</a>
    <span aria-hidden="true">/</span>
    <a href="/shop/">Shop</a>
    <span aria-hidden="true">/</span>
    <a href="/contact/">Contact Andrew</a>
  </p>
</section>

<section class="ap-latest">
  <div class="ap-section-head">
    <h2>Latest writing</h2>
    <a href="/writing/">View all posts →</a>
  </div>

  <ul class="ap-posts">
  {% for post in site.posts limit: 4 %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
    </li>
  {% endfor %}
  </ul>
</section>
