---
title: algebra-cyclic
npm: true
---
# algebra-cyclic

> creates a space isomorphic to Zp: the cyclic ring of order p, where p is prime

[Installation](#installation) |
[API](#api) |
[Examples](#examples) |
[License](#license)

[![NPM version](https://badge.fury.io/js/algebra-cyclic.svg)](http://badge.fury.io/js/algebra-cyclic)
[![Build Status](https://travis-ci.org/fibo/algebra-cyclic.svg?branch=master)](https://travis-ci.org/fibo/algebra-cyclic?branch=master)
[![Dependency Status](https://gemnasium.com/fibo/algebra-cyclic.svg)](https://gemnasium.com/fibo/algebra-cyclic)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


![Uroboro]{:.responsive}

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install algebra-cyclic
```

## API

### `algebraCyclic(elements)`

* **@param** `{Array|String}` elements
* **@returns** `{Object}` cyclic ring

### `algebraCyclic.error`

An object exposing the following error messages:

* numberOfElementsIsNotPrime
* elementsAreNotUnique

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/algebra-cyclic/blob/master/test.js).

```javascript
var algebraCyclic = require('algebra-cyclic')

// Cyclic ring of vowels.
var vowel = algebraCyclic('aeiou')

vowel.contains('a') // true
vowel.contains('e') // true
vowel.contains('i') // true
vowel.contains('o') // true
vowel.contains('u') // true

vowel.contains('0') // false
vowel.contains('1') // false
vowel.contains('2') // false
vowel.contains('*') // false

vowel.addition('a', 'a') // 'a'
vowel.addition('a', 'e') // 'e'
vowel.addition('a', 'i') // 'i'
vowel.addition('a', 'o') // 'o'
vowel.addition('a', 'u') // 'u'
vowel.addition('e', 'e') // 'i'
vowel.addition('e', 'i') // 'o'
vowel.addition('e', 'o') // 'u'
vowel.addition('i', 'i') // 'u'
vowel.addition('i', 'o') // 'a'
vowel.addition('i', 'u') // 'e'
vowel.addition('o', 'o') // 'e'
vowel.addition('o', 'u') // 'i'
vowel.addition('u', 'u') // 'o'

vowel.subtraction('a', 'a') // 'a'
vowel.subtraction('a', 'e') // 'u'
vowel.subtraction('a', 'i') // 'o'
vowel.subtraction('a', 'o') // 'i'
vowel.subtraction('a', 'u') // 'e'
vowel.subtraction('e', 'e') // 'a'
vowel.subtraction('e', 'i') // 'u'
vowel.subtraction('e', 'o') // 'o'
vowel.subtraction('e', 'u') // 'i'
vowel.subtraction('i', 'i') // 'a'
vowel.subtraction('i', 'o') // 'u'
vowel.subtraction('i', 'u') // 'o'
vowel.subtraction('o', 'o') // 'a'
vowel.subtraction('o', 'u') // 'u'
vowel.subtraction('u', 'u') // 'a'

vowel.negation('a') // 'a'
vowel.negation('e') // 'u'
vowel.negation('i') // 'o'
vowel.negation('o') // 'i'
vowel.negation('u') // 'e'

// 'a' is considered as zero, and the following operation should throws
// cannotDivideByZero
vowel.inversion('a') // 'e'

vowel.inversion('e') // 'e'
vowel.inversion('i') // 'o'
vowel.inversion('o') // 'i'
vowel.inversion('u') // 'u'


// TODO complete operations (multiplication and divison)
```

The number of elements must be prime, and elements are required to be unique. The
following snippets will throw.

```javascript
// numberOfElementsIsNotPrime

algebraCyclic(['length', 'of', 'this', 'is', 'not', 'prime'])

// elementsAreNotUnique

algebraCyclic([1, 2, 1])
```

## License

[MIT](http://g14n.info/mit-license/)

[Uroboro]: https://upload.wikimedia.org/wikipedia/commons/7/71/Serpiente_alquimica.jpg "Serpiente alquimica"
