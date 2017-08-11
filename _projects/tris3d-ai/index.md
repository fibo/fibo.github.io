---
title: tris3d-ai
npm: true
---
# tris3d-ai

> [tris3d] surrogate player

[Installation](#installation) |
[API](#api) |
[License](#license)

[![NPM version](https://badge.fury.io/js/tris3d-ai.svg)](http://badge.fury.io/js/tris3d-ai)
[![Dependency Status](https://gemnasium.com/fibo/tris3d-ai.svg)](https://gemnasium.com/fibo/tris3d-ai)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install tris3d-ai --save
```

## API

Every function exported represents a personality of a bot playing [tris3d].

### stupid

> It choses randomly. It knows the center of the cube is the best choice, and that corners are a good choice.

```javascript
var stupid = require('tris3d-ai').stupid

var choosen = []

var choice = stupid(choosen) // Some available random choice.
```

### smart

> It understands when it can win, and tryes to block other players.

```javascript
var smart = require('tris3d-ai').smart

// The combination [0, 1, 2] wins since they are alligned.
smart([0, 10, 11, 1, 5, 6]) // 2
```

### bastard

> It is like a [smart](#smart) but it tryes to block a target player first.

Here it blocks player 1.

```javascript
const targetPlayer = 0 // Player 1 will be the target.
const bastard = require('tris3d-ai').bastard(targetPlayer)

bastard([0, 7, 11, 1]) // 2
```

Here it cannot block its target, but it will block next player.

```javascript
const targetPlayer = 1 // Player 2 will be the target.
const bastard = require('tris3d-ai').bastard(targetPlayer)

bastard([10, 0, 7, 4, 1, 8]) // 2
```

It is a bastard ai, error messages will be aggressive: you have been warned.
In particular, it complains if you ask it to target itself.

## License

[MIT](http://g14n.info/mit-license)

[tris3d]: http://play.tris3d.net "tris3d"
