---
title: Software
layout: page
perl:
  - Task-BeLike-FIBO-pm
  - Sweet-Home-pm
  - Task-Viral
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
    - games-of-life
    - iper
  tiny_packages:
    - algebra-group
    - algebra-ring
    - cayley-dickson
    - geohash-neighbours
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

{% assign repo = site.data.github.repos %}

* [Node](#node)
  - [Tiny npm packages](#tiny-npm-packages)
* [Bash](#bash)
* [Meta](#meta)
* [Perl](#perl)

<a name="node"></a>

## Node

![nodejs_logo](https://cdn.rawgit.com/gilbarbara/logos/master/logos/nodejs.svg)

{% for pkg in page.node.packages %}
## [{{ pkg }}]({{ repo[pkg].homepage }})

> {{ repo[pkg].description }}

[![Whatchers](/svg/github/watchers/{{ pkg }}.svg)](https://github.com/fibo/{{ pkg }}/watchers) [![Stargazers](/svg/github/stars/{{ pkg }}.svg)](https://github.com/fibo/{{ pkg }}/stargazers) [![Forks](/svg/github/forks/{{ pkg }}.svg)](https://github.com/fibo/{{ pkg }}/network/members)

{% endfor %}

<a name="tiny-npm-packages"></a>

![npm_package_logo](https://cdn.rawgit.com/gilbarbara/logos/master/logos/npm-2.svg)

> I have few npm packages that adhere to the small package phylosophy.

{% for tiny_pkg in page.node.tiny_packages %}
* [{{ tiny_pkg }}]({{ repo[tiny_pkg].homepage }}): {{ repo[tiny_pkg].description }}
{% endfor %}

<a name="bash"></a>

## Bash

![bash_logo](https://cdn.rawgit.com/gilbarbara/logos/master/logos/bash.svg)

{% for bash_project in page.bash %}
* [{{ bash_project }}]({{ repo[bash_project].homepage }}): {{ repo[bash_project].description }}
{% endfor %}

## Meta

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](kiss-literate-programming) {{ repo['kiss-literate-programming'].description }}

## Perl

{% for perl_project in page.perl %}
* [{{ perl_project }}]({{ repo[perl_project].homepage }}): {{ repo[perl_project].description }}
{% endfor %}
