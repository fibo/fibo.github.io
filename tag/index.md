---
layout: page
title: Tags
---

{% comment %}
tag | first is the tag name
tag | last is the second part, which contains posts
See also http://vvv.tobiassjosten.net/jekyll/jekyll-tag-cloud/
{% endcomment %}

{% for tag in site.tags %}
  <li style="font-size: {{ tag | last | size | times: 100 | divided_by: site.tags.size }}%">
    <a href="/tag/{{ tag | first | slugify }}">
      {{ tag | first  }}
    </a>
  </li>
{% endfor %}
