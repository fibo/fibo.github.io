---
title: algebra-ring
npm: true
---
# algebra-ring

> defines an [algebra ring][1] structure

[Installation](#installation) |
[Example](#example) |
[API](#api) |
[License](#license)

[![NPM version](https://badge.fury.io/js/algebra-ring.svg)](http://badge.fury.io/js/algebra-ring)
[![Build Status](https://travis-ci.org/fibo/algebra-ring.svg?branch=master)](https://travis-ci.org/fibo/algebra-ring?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install algebra-ring
```

## Example

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/algebra-ring/blob/master/test.js).

### Real

Create a ring structure over real numbers.

```javascript
const ring = require('algebra-ring')

// Define operators.
function contains (a) {
  // NaN, Infinity and -Infinity are not allowed
  return (typeof a === 'number' && isFinite(a))
}

function equality (a, b) { return a === b }

function addition (a, b) { return a + b }

function negation (a) { return -a }

function multiplication (a, b) { return a * b }

function inversion (a) { return 1 / a }

// Create a ring by defining its identities and operators.
const R = ring([0, 1], {
  equality: equality,
  contains: contains,
  addition: addition,
  negation: negation,
  multiplication: multiplication,
  inversion: inversion
})
```

You get a [Ring][1] that is a [Group][2] with *multiplication* operator.
The *multiplication* operator must be **closed** respect the underlying set; its inverse operator is *division*.

This is the list of ring operators:

* contains
* notContains
* equality
* disequality
* addition
* subtraction
* negation
* multiplication
* division
* inversion

The neutral element for addition and multiplication are, as usual, called *zero* and *one* respectively.

```javascript
R.contains(10) // true
R.contains(-1, 0.5, Math.PI, 5) // true
R.notContains(Infinity) // true

R.addition(1, 2) // 3
R.addition(2, 3, 5, 7) // 17

R.equality(R.negation(2), -2) // true

R.subtraction(2, 3) // -1

R.multiplication(2, 5) // 10
R.multiplication(2, 2, 2, 2) // 16

R.equality(R.inversion(10), 0.1) // true

R.division(1, 2) // 0.5

R.equality(R.addition(2, R.zero), 2) // true
R.equality(R.subtraction(2, 2), R.zero) // true

R.equality(R.multiplication(2, R.one), 2) // true
R.equality(R.division(2, 2), R.one) // true

R.division(1, 0) // will complain
R.inversion(R.zero) // will complain too
```

### Boolean

It is possible to create a ring over the booleans.

```javascript
const Boole = ring([false, true], {
  equality: (a, b) => (a === b),
  contains: (a) => (typeof a === 'boolean'),
  addition: (a, b) => (a || b),
  negation: (a) => (a),
  multiplication: (a, b) => (a && b),
  inversion: (a) => (a)
})
```

There are only two elements, you know, `true` and `false`.

```javascript
Boole.contains(true, false) // true
```

Check that `false` is the neutral element of addition and `true` is the
neutral element of multiplication.

```javascript
Boole.addition(true, Boole.zero) // true
Boole.multiplication(true, Boole.one) // true
```

As usual, it is not allowed to divide by zero: the following code will throw.

```javascript
Boole.division(true, false)
Boole.inversion(Bool.zero)
```

## API

### `ring(identities, operator)`

* **@param** `{Array}` **identities**
* **@param** `{*}`     **identities[0]** a.k.a zero
* **@param** `{*}`     **identities[1]** a.k.a one
* **@param** `{Object}`   **operator**
* **@param** `{Function}` **operator.contains**
* **@param** `{Function}` **operator.equality**
* **@param** `{Function}` **operator.addition**
* **@param** `{Function}` **operator.negation**
* **@param** `{Function}` **operator.multiplication**
* **@param** `{Function}` **operator.inversion**
* **@returns** `{Object}` **ring**

### `ring.error`

An object exposing the following error messages:

* cannotDivideByZero
* doesNotContainIdentity
* identityIsNotNeutral

## License

[MIT](http://g14n.info/mit-license/)

[1]: https://en.wikipedia.org/wiki/Ring_(mathematics) "Ring"
[2]: https://www.npmjs.com/package/algebra-ring-group "algebra-ring-group"
