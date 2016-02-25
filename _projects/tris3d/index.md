---
title: tris3d
---
# tris3d

> is a 3d [tic tac toe](https://en.wikipedia.org/wiki/Tic-tac-toe) algorithm powered by Z3 space

**Table Of Contents:**

* [Installation](#installation)
* [Description](#description)
* [API](#api)
* [License](#license)

[![NPM version](https://badge.fury.io/js/tris3d.svg)](http://badge.fury.io/js/tris3d) [![Build Status](https://travis-ci.org/fibo/tris3d.svg?branch=master)](https://travis-ci.org/fibo/tris3d.svg?branch=master) [![Dependency Status](https://gemnasium.com/fibo/tris3d.svg)](https://gemnasium.com//tris3d)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install tris3d
```

With [bower](http://bower.io/) do

```bash
$ bower install tris3d
```

or use a CDN adding this to your HTML page

```
<script src="https://cdn.rawgit.com/fibo/tris3d/master/dist/tris3d.min.js"></script>
```

## Description

Algorithm to play tic tac toe in dimension three.

Imagine a cube, just like the [Rubik's cube](https://en.wikipedia.org/wiki/Rubik%27s_Cube) where everyone of the little cubes is numbered from 0 to 26
and has a 3d coordinate in the range from `[0, 0, 0]` to `[2, 2, 2]` following a natural order.

```
// Sorted array of points from point[0] to point[26]
var point = [
  [0, 0, 0], [1, 0, 0], [2, 0, 0], // 0   1   2
  [0, 1, 0], [1, 1, 0], [2, 1, 0], // 3   4   5
  [0, 2, 0], [1, 2, 0], [2, 2, 0], // 6   7   8
  [0, 0, 1], [1, 0, 1], [2, 0, 1], // 9   10  11
  [0, 1, 1], [1, 1, 1], [2, 1, 1], // 12  13  14
  [0, 2, 1], [1, 2, 1], [2, 2, 1], // 15  16  17
  [0, 0, 2], [1, 0, 2], [2, 0, 2], // 18  19  20
  [0, 1, 2], [1, 1, 2], [2, 1, 2], // 21  22  23
  [0, 2, 2], [1, 2, 2], [2, 2, 2]  // 24  25  26
]
```

**NOTA BENE**: in dimension three the game makes sense only if
there are three players (🐨 🐬 🐯), and is more fun if they can negotiate.

## API

<a name="istris"></a>
`isTris(p1, p2, p3)`

Takes 3 points given by the coordinate system described above and returns
a boolean that is true if they are aligned.

```
var tris3d = require('tris3d')

var isTris = tris3d.isTris

isTris([2, 0, 2], [1, 1, 2], [0, 2, 2]) // true
```

## License

[MIT](http://g14n.info/mit-license)

