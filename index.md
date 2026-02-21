---
layout: page
title: ""
permalink: /
---

# Help IT pros reach their next level.

I’m Andrew Pla — sysadmin helping sysadmins. PowerShell MVP, speaker, and podcast host at PDQ. I share practical ways to build skills that make your workday smoother, your environment safer, and your career options bigger.

<a class="button" href="/links/#updates">Get updates</a>
<a class="button ap-ghost" href="/contact/">Contact</a>

<div class="ap-quicklinks">
  <a href="/writing/">Writing</a> ·
  <a href="/links/">Links</a> ·
  <a href="/podcast/">Podcast</a> ·
  <a href="/shop/">Shop</a>
</div>

## Latest Writing

<ul class="ap-posts">
{% for post in site.posts limit: 4 %}
  <li>
    <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %Y" }}</time>
  </li>
{% endfor %}
</ul>