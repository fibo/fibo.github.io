---
title: indices-permutations
npm: true
---
# indices-permutations

> is a recursive reducer to all permutations with repetitions of multi dimensional array indices

[Installation](#installation) |
[Usage](#usage) |
[Examples](#examples) |
[License](#license)

[![NPM version](https://badge.fury.io/js/indices-permutations.svg)](http://badge.fury.io/js/indices-permutations)
[![Build Status](https://travis-ci.org/fibo/indices-permutations.svg?branch=master)](https://travis-ci.org/fibo/indices-permutations?branch=master)
[![No deps](https://img.shields.io/badge/dependencies-none-green.svg)](https://github.com/fibo/strict-mode)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

With [npm](https://www.npmjs.com/) do

```bash
npm install indices-permutations
```

## Usage

Use it as a callback for the [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
on an array of positive integers.  It returns the **result** array of all indices permutated.

Note that *initialValue* argument must be provided, for instance it can be an empty array `[]`.

Both CommonJS and ES6 import syntax are supported.

```js
import indicesPermutations from 'indicesPermutations'
```

```js
const indicesPermutations = require('indices-permutations')
```

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/indices-permutations/blob/master/test.js).

### order 1

Reduce `[n]` to `[[0], [1], ..., [n-1]]`

```javaScript
[5].reduce(indicesPermutations, []) // [[0], [1], [2], [3], [4]]
```

### order 2

Reduce `[m, n]` to `[[0, 0], [0, 1], ... ,[m-1, n-1]]`

```javaScript
[3, 3].reduce(indicesPermutations, []) // [[0, 0], [0, 1], [0, 2],
                                       //  [1, 0], [1, 1], [1, 2],
                                       //  [2, 0], [2, 1], [2, 2]]
```

### order 3

Reduce `[a1, a2, a3]` to `[[0, 0, 0], ... ,[a1 - 1, a2 - 1, a3 - 1]]`

```javaScript
[2, 2, 3].reduce(indicesPermutations, []) // [[0, 0, 0], [0, 0, 1], [0, 0, 2],
                                          //  [0, 1, 0], [0, 1, 1], [0, 1, 2],
                                          //  [1, 0, 0], [1, 0, 1], [1, 0, 2],
                                          //  [1, 1, 0], [1, 1, 1], [1, 1, 2]]
```

## License

[MIT](http://g14n.info/mit-license/)

