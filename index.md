---
layout: home
permalink: /
feature_text: |
  <h1>Help IT pros reach their next level.</h1>
  <p>I’m Andrew Pla — sysadmin helping sysadmins. PowerShell MVP, speaker, and podcast host at PDQ. I share practical ways to build skills that make your workday smoother, your environment safer, and your career options bigger.</p>
  <p>
    <a class="button" href="/links/#updates">Get updates</a>
    <a class="button" href="/writing/">Read Writing</a>
    <a class="button" href="/links/">Browse Links</a>
  </p>
  <p>
    <a class="button ap-ghost" href="/podcast/">Podcast</a>
    <a class="button ap-ghost" href="/shop/">Shop</a>
  </p>
---

## What you’ll find here

- **Practical automation** that helps you get time back.
- **Skills that scale** — PowerShell, tooling, troubleshooting, and real-world patterns.
- **Security habits** that reduce risk without killing velocity.
- **Career momentum** — confidence, consistency, and community.

## Latest Writing

<ul class="ap-posts">
{% for post in site.posts limit: 5 %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
  </li>
{% endfor %}
</ul>

<a class="button ap-ghost" href="/writing/">View all Writing</a>