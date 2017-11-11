---
title: matrix-multiplication
npm: true
---
# matrix-multiplication

> implements row by column multiplication

[Installation](#installation) |
[API](#api) |
[Examples](#examples) |
[License](#license)

[![NPM version](https://badge.fury.io/js/matrix-multiplication.svg)](http://badge.fury.io/js/matrix-multiplication)
[![Build Status](https://travis-ci.org/fibo/matrix-multiplication.svg?branch=master)](https://travis-ci.org/fibo/matrix-multiplication?branch=master)
[![Dependency Status](https://gemnasium.com/fibo/matrix-multiplication.svg)](https://gemnasium.com/fibo/matrix-multiplication)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install matrix-multiplication
```

## API

Optional custom operators are supported.

### `var operator = matrixMultiplication([customOperator])`

* **@param** `{Object}` **[customOperator]**
* **@param** `{Function}` **[customOperator.addition]** defaults to common `+`
* **@param** `{Function}` **[customOperator.multiplication]** defaults to common `*`
* **@returns** `{Function}` **operator**

### `var mul = operator(middle, leftMatrix, rightMatrix)`

The only requirement needed to multiply row by column an **a x b** matrix by
an **c x d** matrix is that `b = c`, i.e. the middle indexes are equal.
Actually two compatible matrices are **n x m** and **m x l**, let's call **m** the **middle**.

* **@param** `{Number}` **middle**
* **@returns** `{Function}` **mul**

### `var matrix = mul(leftMatrix, rightMatrix)`

Finally we have the matrix multiplication function. Remember that is **not** a
commutative operator.

* **@param** `{Array}` **leftMatrix**
* **@param** `{Array}` **rightMatrix**
* **@returns** `{Array}` **matrix**

### `matrixMultiplication.error`

An object exposing the following error messages:

* [leftMatrixNotCompatible](#leftmatrixnotcompatible)
* [rightMatrixNotCompatible](#rightmatrixnotcompatible)

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/matrix-multiplication/blob/master/test.js).

Square matrices **2x2**

```javascript
var matrixMultiplication = require('matrix-multiplication')

var mul = matrixMultiplication()(2)

var leftMatrix = [2, 3,
                  1, 1]

var rightMatrix = [0, 1,
                  -1, 0]

mul(leftMatrix, rightMatrix) // [-3, 2,
                             //  -1, 1]
```

Actually, any pair of matrices with *middle* = 2 can be multiplied with the same `mul`
function, try with a **3x2** by **2x4**

```javascript
var matrix3x2 = [2, 3,
                 1, 1,
                 1, 1]

var matrix2x4 = [0, 1, 1, 1,
                -1, 0, 2, 3]

mul(matrix3x2, matrix2x4) // [-3, 2, 8, 11,
                          //  -1, 1, 3, 4,
                          //  -1, 1, 3, 4])
```

Matrices are checked for compatibility, for instances the following snippets will throw.

### leftMatrixNotCompatible

Since *mul* was defined as a multiplication with *middle* index 2, left matrix is
not compatible cause it has 3 columns.

```javascript
mul([1, 2, 3,
     4, 5, 6,
     7, 8, 9], [1, 2,
                3, 4])
```

### rightMatrixNotCompatible

Since *mul* was defined as a multiplication with *middle* index 2, right matrix is
not compatible cause it has 3 rows.

```javascript
mul([1, 2,
     3, 4], [1, 2, 3,
             4, 5, 6,
             7, 8, 9])
```

You can also multiply over a custom field, just provide a *customOperator* object with
an *addition* and a *multiplication* function.
The following example shows multiplication of two square matrices of booleans.

> Matrices of strings are left as an excercise to the reader.

```javascript
function booleanAdd (a, b) { return a || b }
function booleanMul (a, b) { return a && b }

var customOperators = {
  addition: booleanAdd,
  multiplication: booleanMul
}

var mulB = matrixMultiplication(customOperators)(3)

var y = true
var n = false

var matrix = [n, y, n,
              y, n, y,
              n, y, n]

var identity = [y, n, n
                n, y, n,
                n, n, y]

mulB(matrix, identity) // [n, y, n,
                       //  y, n, y,
                       //  n, y, n]
```

## License

[MIT](http://g14n.info/mit-license/)

