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
  <span style="font-size: {{ tag | last | size | times: 1000 | divided_by: site.tags.size }}%">
    <a href="/tag/{{ tag | first | slugify }}">
      {{ tag | first  }}
    </a>
  </span>
{% endfor %}
