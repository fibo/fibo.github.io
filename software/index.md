---
title: Software
layout: page
bash:
  - bb-clone
  - gh-clone
  - home
  - dotsoftware
node:
  packages:
    - algebra
    - dflow
    - flow-view
  tiny_packages:
    - algebra-group
    - algebra-ring
    - cayley-dickson
    - indices-permutations
    - laplace-determinant
    - multidim-array-index
    - not-defined
    - static-props
    - tensor-contraction
    - tensor-product
    - tris3d
    - tris3d-ai
    - tris3d-canvas
    - write-file-utf8
    - x3dom-livereload
---

{% assign repo = site.data.repos %}

# Node

{% for pkg in page.node.packages %}
## [{{ pkg }}]({{ repo[pkg].homepage }})

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

# Meta

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming) {{ repo['kiss-literate-programming'].description }}
