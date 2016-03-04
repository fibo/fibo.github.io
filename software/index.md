---
title: Software
layout: page
bash:
  - bb-clone
  - gh-clone
node:
  packages:
    - algebra
    - dflow
    - flow-view
    - tris3d
  tiny_packages:
    - algebra-group
    - algebra-ring
    - cayley-dickson
    - indices-permutations
    - laplace-determinant
    - multidim-array-index
    - not-defined
    - tensor-contraction
    - tensor-product
    - tris3d
    - write-file-utf8
---

{% assign repo = site.data.repos %}

# Node

{% for tiny_pkg in page.node.tiny_packages %}
## [pkg]({{ repo[pkg].homepage }})

> {{ repo[pkg].description }}

[![Whatchers](http://g14n.info/svg/github/watchers/{{ pkg }}.svg)](https://github.com/fibo/{{ pkg }}/watchers) [![Stargazers](http://g14n.info/svg/github/stars/{{ pkg }}.svg)](https://github.com/fibo/{{ pkg }}/stargazers) [![Forks](http://g14n.info/svg/github/forks/{{ pkg }}.svg)](https://github.com/fibo/{{ pkg }}/network/members)

{% endfor %}

## Tiny npm packages

> I have few npm packages that adhere to the small package phylosophy.

{% for tiny_pkg in page.node.tiny_packages %}
* [{{ tiny_pkg }}]({{ repo[tiny_pkg].homepage }}): {{ repo[tiny_pkg].description }}
{% endfor %}

# Bash

{% for bash_project in page.bash %}
* [{{ bash_project }}]({{ repo[bash_project].homepage }}): {{ repo[bash_project].description }}
{% endfor %}

