---
title: tensor-contraction
npm: true
---
# tensor-contraction

> implements [tensor contraction][1] on a single [mixed tensor](https://en.wikipedia.org/wiki/Mixed_tensor)

## Install

With [npm](https://www.npmjs.com/) do

```
npm install tensor-contraction --save
```

## Usage

Signature is `(addition, indicesPair, tensorDim, tensorData)` where
* **addition** is a function that defines the scalar operator used
* **indicesPair** is an array of two elements that indicates which indices will be used for contraction
* **tensorDim** is an array that defines tensor indices set
* **tensorData** is an array that defines the tensor components

It returns the **contractedTensorData** array given by the [tensors contraction][1].

It throws a **TypeError**: *Contraction indices does not have the same dimension*.
See [indices pair check](#indices-pair-check) example.

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/tensor-contraction/blob/master/test.js).

Let's use common real addition.

```
var tensorContraction = require('tensor-contraction')

function addition (a, b) { return a + b }

var contraction = tensorContraction.bind(null, addition)
```

# Matrix trace

The [trace of a matrix](https://en.wikipedia.org/wiki/Trace_(linear_algebra)) is the sum of the components in its diagonal. It is the simplest
example of [tensor contraction][1].
In the following example, the trace is `1 + 5 + 9 = 15`

```
contraction([0, 1], [3, 3], [1, 2, 3,
                             4, 5, 6,
                             7, 8, 9]).should.be.eql(15)
```

# Indices pair check

It is required that indices chosen for contraction have the same dimension.
The following example

```
contraction([0, 1], [3, 2], [1, 2, 3,
                             4, 5, 6])
```

will throw with message

> Contraction indices does not have the same dimension: 0-th index = 3 but 1-th index = 2.

# Order 3

Consider a tensor of order 3 and contract pairing first and last index.
A multidimensional array **t** is used to point out which component corresponds
to a given combination of indices, but keep in mind that tensors are always
given as a monodimensional array.
Note that contracted tensor is a vector with two elements, where:

1. the first one is given by the sum of the tensor components with middle index equal to 0 and with first and last index equals;
2. the second one is given by the sum of tensor components with middle index equal to 1 and with first and last index equals.

```
var t = [[[0, 1], [2, 3]], [[4, 5], [6, 7]]] // t[0][0][0] = 0
                                             // t[0][0][1] = 1
                                             // t[0][1][0] = 2
                                             // t[0][1][1] = 3
                                             // t[1][0][0] = 4
                                             // t[1][0][1] = 5
                                             // t[1][1][0] = 6
                                             // t[1][1][1] = 7

contraction([0, 2], [2, 2, 2], [t[0][0][0], t[0][0][1], t[0][1][0], t[0][1][1],  // [5, 9] = [0 + 5, 2 + 7] =
                                t[1][0][0], t[1][0][1], t[1][1][0], t[1][1][1]]) //        = [t[0][0][0] + t[1][0][1],
                                                                                 //           t[0][1][0] + t[1][1][1]]
```

Follows calculation of other 2 possible contractions, where the *tensorData* is
given by explicit numeric values.

```
contraction([0, 1], [2, 2, 2], [0, 1, 2, 3, 4, 5, 6, 7]) // [6, 8]

contraction([1, 2], [2, 2, 2], [0, 1, 2, 3, 4, 5, 6, 7]) // [3, 11]
```

## License

[MIT](http://g14n.info/mit-license/)

  [1]: https://en.wikipedia.org/wiki/Tensor_contraction "tensor contraction"
