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
  {% assign num = tag | last | size %}
  {% assign tagName = tag | first %}
  {% assign size2 = num | times: 2000 | divided_by: site.posts.size %}
  {% include tag_badge.html tag=tagName %} {{ num }}
{% endfor %}
