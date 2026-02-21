---
layout: home
permalink: /
feature_text: |
  <h1>Help IT pros reach their next level.</h1>
  <p>I’m Andrew Pla — sysadmin helping sysadmins. PowerShell MVP, speaker, and podcast host at PDQ. I share practical ways to build skills that make your workday smoother, your environment safer, and your career options bigger.</p>
  <p>
    <a class="button" href="/links/#updates">Get updates</a>
  </p>
  <p class="ap-quicklinks">
    <a href="/writing/">Writing</a>
    <span>•</span>
    <a href="/links/">Links</a>
    <span>•</span>
    <a href="/podcast/">Podcast</a>
    <span>•</span>
    <a href="/shop/">Shop</a>
    <span>•</span>
    <a href="/contact/">Contact</a>
  </p>
---

## Welcome

This site is where I share practical skills, honest lessons, and community energy for working IT pros.

## Latest Writing

<ul class="ap-posts">
{% for post in site.posts limit: 4 %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
  </li>
{% endfor %}
</ul>

<a class="button ap-ghost" href="/writing/">View all Writing</a>