---
title: laplace-determinant
npm: true
---
# laplace-determinant

> recursive determinant computation using [Laplace expansion](https://en.wikipedia.org/wiki/Laplace_expansion)

## Usage

Signature is `(data [, scalar] [, order])` where:
* **data** is an array which lenght must be a square.
* **scalar** is an optional object used to compute determinant over any field (see below).
* **order** defaults to Math.sqrt(data.lenght) and is used internally by recursion sub step.

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/laplace-determinant/blob/master/test.js)

Basic usage is to compute determinant of matrices of common numbers.

```javascript
var det = require('laplace-determinant')

// order = 1

det([10]) // 10

// order = 2

det([1, 0,
     0, 1]) // 1

det([1, 1,
     2, 1]) // -1

// order = 3

det([1, 0, 0,
     0, 1, 0,
     0, 0, 1]) // 1

det([0,  1, 0,
     2, -1, 0,
     0,  2, 1]) // -2

// order = 4

det([1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1]) // 1
```

The algorithm is recursive, so any order is allowed. If you want to benchmark it and compare this package with other implementations, you are welcome!
Just [contact me](http://g14n.info) and I will happy to get this kind of useful feedback.

Optional *scalar* object defaults to common Real field, i.e.

```javascript
scalar = {
  addition      : function (a, b) { return a + b },
  multiplication: function (a, b) { return a * b },
  negation      : function (a) { return -a }
}
```

It is possible to compute determinant over any field. Consider for example the [Boolean algebra](http://en.wikipedia.org/wiki/Boolean_algebra).

```javascript
var boole = {
  addition      : function (a, b) { return a && b },
  multiplication: function (a, b) { return a || b },
  negation      : function (a) { return !a }
}

det([true, false,
     false, true], boole) // true
```

