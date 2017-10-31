---
title: algebra-group
npm: true
---
# algebra-group

> defines an [algebra group][1] structure

[![NPM version](https://badge.fury.io/js/algebra-group.svg)](http://badge.fury.io/js/algebra-group)
[![Build Status](https://travis-ci.org/fibo/algebra-group.svg?branch=master)](https://travis-ci.org/fibo/algebra-group?branch=master)
[![Dependency Status](https://david-dm.org/fibo/algebra-group.svg)](https://david-dm.org/fibo/algebra-group)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Table Of Contents

* [Installation](#installation)
* [Examples](#examples)
    - [Integer additive group](#integer-additive-group)
    - [`R\{0}` multiplicative group](#r0-multiplicative-group)
    - [`R+` multiplicative group](#r-multiplicative-group)
* [API](#api)
* [License](#license)
* [Contributors](#contributors)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install algebra-group
```

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/algebra-group/blob/master/test.js).

### Integer additive group

Create the [Integer](https://en.wikipedia.org/wiki/Integer) additive group.

```javascript
const algebraGroup = require('algebra-group')

// Define identity element.
const zero = 0

// Define operators.
function isInteger (a) {
  // NaN, Infinity and -Infinity are not allowed
  return (typeof n === 'number') && isFinite(n) && (n % 1 === 0)
}

function equality (a, b) { return a === b }

function addition (a, b) { return a + b }

function negation (a) { return -a }

// Create Integer additive group a.k.a (Z, +).
const Z = algebraGroup({
  identity: zero,
  contains: isInteger,
  equality: equality,
  compositionLaw: addition,
  inversion: negation
})
```

You get a group object with *zero* as identity and the following group operators:

* contains
* notContains
* equality
* disequality
* addition
* subtraction
* negation

```javascript
Z.contains(2) // true
Z.contains(2.5) // false
Z.contains('xxx') // false
Z.notContains(false) // true
Z.notContains(Math.PI) // true
Z.contains(-2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9) // true
Z.contains(1, 2, 3, 4.5) // false, 4.5 is not an integer

Z.addition(1, 2) // 3
Z.addition(1, 2, 3, 4) // 10

Z.negation(5) // -5

Z.subtraction(5, 1) // 4
Z.subtraction(5, 1, 1, 1, 1, 1) // 0

Z.equality(Z.subtraction(2, 2), Z.zero) // true
```

### `R\{0}` multiplicative group

Consider `R\{0}`, the set of [Real numbers][2] minus 0, with multiplication as composition law.

It is necessary to remove 0, otherwise there is an element which inverse does
not belong to the group, which breaks [group laws][3].

It makes sense to customize group props, which defaults to additive group naming.

```javascript
function isRealAndNotZero (n) {
  // NaN, Infinity and -Infinity are not allowed
  return (typeof n === 'number') && (n !== 0) && isFinite(n)
}

function multiplication (a, b) { return a * b }

function inversion (a) { return 1 / a }

// Create Real multiplicative group a.k.a (R, *).

const R = algebraGroup({
  identity: 1,
  contains: isRealAndNotZero,
  equality: equality,
  compositionLaw : multiplication,
  inversion: inversion
}, {
  compositionLaw: 'multiplication',
  identity: 'one',
  inverseCompositionLaw: 'division',
  inversion: 'inversion'
})
```

You get a group object with *one* as identity and the following group operators:

* contains
* notContains
* equality
* disequality
* multiplication
* division
* inversion

```javascript
R.contains(10) // true
R.contains(Math.PI, Math.E, 1.7, -100) // true
R.notContains(Infinity) // true

R.inversion(2) // 0.5

// 2 * 3 * 5 = 30 = 60 / 2
R.equality(R.multiplication(2, 3, 5), R.division(60, 2)) // true
```

### `R+` multiplicative group

Create the multiplicative group of positive real numbers `(0,∞)`.

It is a well defined group, since

* it has an indentity
* it is close respect to its composition law
* for every element, its inverse belongs to the set

Let's customize group props, with a shorter naming.

```javascript
function isRealAndPositive (n) {
  // NaN, Infinity are not allowed
  return (typeof n === 'number') && (n > 0) && isFinite(n)
}

const Rp = algebraGroup({
  identity: 1,
  contains: isRealAndPositive,
  equality: equality,
  compositionLaw: multiplication,
  inversion: inversion
}, {
  compositionLaw: 'mul',
  equality: 'eq',
  disequality: 'ne',
  identity: 'one',
  inverseCompositionLaw: 'div',
  inversion: 'inv'
})
```

You get a group object with *one* identity and the following group operators:

* contains
* notContains
* eq
* ne
* mul
* div
* inv

```javascript
Rp.contains(Math.PI) // true
Rp.notContains(-1) // true
Rp.eq(Rp.inv(4), Rp.div(Rp.one, 4)) // true
Rp.mul(2, 4) // 8
```

## API

### `group(identity, operator)`

* **@param** `{Object}`   given identity and operators
* **@param** `{*}`        given.identity a.k.a. neutral element
* **@param** `{Function}` given.contains
* **@param** `{Function}` given.equality
* **@param** `{Function}` given.compositionLaw
* **@param** `{Function}` given.inversion
* **@param** `{Object}` [naming]
* **@param** `{String}` [naming.identity=zero]
* **@param** `{String}` [naming.contains=contains]
* **@param** `{String}` [naming.equality=equality]
* **@param** `{String}` [naming.compositionLaw=addition]
* **@param** `{String}` [naming.inversion=negation]
* **@param** `{String}` [naming.inverseCompositionLaw=subtraction]
* **@param** `{String}` [naming.notContains=notContains]
* **@returns** `{Object}` groups

### `group.error`

An object exposing the following error messages:

* [argumentIsNotInGroup](#argumentisnotingroup)
* [equalityIsNotReflexive](#equalityisnotreflexive)
* [identityIsNotInGroup](#identityisnotingroup)
* [identityIsNotNeutral](#identityisnotneutral)

For example, the following snippets will throw.

#### argumentIsNotInGroup

```javascript
R.inversion(0) // 0 is not in group R\{0}
Rp.mul(1, 0.1, -1, 0.5) // -1 is not in R+
```

#### equalityIsNotReflexive

```javascript
algebraGroup({
  identity: 1,
  contains: isRealAndNotZero,
  equality: function (a, b) { return a > b }, // not well defined
  compositionLaw: multiplication,
  inversion: inversion
})
```

#### identityIsNotInGroup

```javascript
algebraGroup({
  identity: -1,
  contains: isRealAndPositive,
  equality: equality,
  compositionLaw: multiplication,
  inversion: inversion
})
```

#### identityIsNotNeutral

```javascript
algebraGroup({
  identity: 2,
  contains: isRealAndNotZero,
  equality: equality,
  compositionLaw: multiplication,
  inversion: inversion
})
```

## License

[MIT](http://g14n.info/mit-license/)

## Contributors

* [fibo](https://github.com/fibo)
* [xgbuils](https://github.com/xgbuils)

[1]: https://en.wikipedia.org/wiki/Group_(mathematics) "Group"
[2]: https://en.wikipedia.org/wiki/Real_number "Real number"
[3]: https://en.wikipedia.org/wiki/Group_(mathematics)#Definition "Group laws"
