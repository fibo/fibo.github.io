---
layout: page
title: Tags
---

{% comment %}
tag | first is the tag name
tag | last is the second part, which contains posts
See also http://vvv.tobiassjosten.net/jekyll/jekyll-tag-cloud/
{% endcomment %}

<div style="display: block">
  <ul>
    {% for tag in site.tags %}
      <li style="display: inline">
        {% assign num = tag | last | size %}
        {% assign size2 = num | times: 2000 | divided_by: site.posts.size %}
        <span style="font-size: {{ size }}%">
          <a href="/tag/{{ tag | first | slugify }}">
            {{ size }}{{ tag | first }}
          </a>
        </span>
      </li>
    {% endfor %}
  </ul>
</div>
