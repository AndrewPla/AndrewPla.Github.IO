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
    <a class="button" href="/podcast/">Podcast</a>
    <a class="button" href="/shop/">Shop</a>
  </p>
---

## What you’ll find here

- **Practical automation** that helps you get time back.
- **Skills that scale** — PowerShell, tooling, troubleshooting, and real-world patterns.
- **Security habits** that reduce risk without killing velocity.
- **Career momentum** — confidence, consistency, and community.

## Latest Writing

{% assign recent_posts = site.posts | slice: 0, 3 %}
<ul class="list list--posts">
  {% for post in recent_posts %}
    <li class="item item--post">
      <article class="article article--post">
        <h3><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
        {% include post-meta.html page=post %}
        {{ post.excerpt | markdownify | truncatewords: 40 }}
      </article>
    </li>
  {% endfor %}
</ul>

<a class="button" href="/writing/">View all Writing</a>