---
title: Software
layout: page
node:
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

## [algebra]({{ repo['algebra'].homepage }})

> {{ repo['algebra'].description }}

[![Whatchers](http://g14n.info/svg/github/watchers/algebra.svg)](https://github.com/fibo/algebra/watchers) [![Stargazers](http://g14n.info/svg/github/stars/algebra.svg)](https://github.com/fibo/algebra/stargazers) [![Forks](http://g14n.info/svg/github/forks/algebra.svg)](https://github.com/fibo/algebra/network/members)

## [dflow]({{ repo['dflow'].homepage }})

> {{ repo['dflow'].description }}

[![Whatchers](http://g14n.info/svg/github/watchers/dflow.svg)](https://github.com/fibo/dflow/watchers) [![Stargazers](http://g14n.info/svg/github/stars/dflow.svg)](https://github.com/fibo/dflow/stargazers) [![Forks](http://g14n.info/svg/github/forks/dflow.svg)](https://github.com/fibo/dflow/network/members)

[![NPM](https://nodei.co/npm-dl/dflow.png)](https://nodei.co/npm-dl/dflow/)

## [flow-view]({{ repo['flow-view'].homepage }})

> {{ repo['flow-view'].description }}

[![Whatchers](http://g14n.info/svg/github/watchers/flow-view.svg)](https://github.com/fibo/flow-view/watchers) [![Stargazers](http://g14n.info/svg/github/stars/flow-view.svg)](https://github.com/fibo/flow-view/stargazers) [![Forks](http://g14n.info/svg/github/forks/flow-view.svg)](https://github.com/fibo/flow-view/network/members)

[![NPM](https://nodei.co/npm-dl/flow-view.png)](https://nodei.co/npm-dl/flow-view/)

### [tris3d]({{ repo['tris3d'].homepage }})

> {{ repo['tris3d'].description }}

[![NPM](https://nodei.co/npm-dl/tris3d.png)](https://nodei.co/npm-dl/tris3d/)

## Tiny npm packages

{% for pkg in page.node.tiny_packages %}
* [{{ pkg }}]({{ repo[pkg].homepage }}): {{ repo[pkg].description }}
{% endfor %}

# Bash

* [bb-clone]({{ repo['bb-clone'].homepage }}): {{ repo['bb-clone'].description }}
* [gh-clone]({{ repo['gh-clone'].homepage }}): {{ repo['gh-clone'].description }}

