---
title: algebra
layout: default
---

[![Build Status](https://travis-ci.org/fibo/algebra.png?branch=master)](https://travis-ci.org/fibo/algebra?branch=master) [![NPM version](https://badge.fury.io/js/algebra.png)](http://badge.fury.io/js/algebra)

![on-quaternions-and-octonions!](http://www.g14n.info/images/algebra/Cover-OnQuaternionsAndOctonions.png) ![Algebra!](http://www.g14n.info/images/algebra/Cover-Algebra.png)

# Installation

With [npm](https://npmjs.org/) do

```
npm install algebra
```

## Description

I'm implementing matrices and vectors on few algebra fields (Reals, Complexes etc.) following Micheal Artin's "Algebra", which was my book at [Università Degli Studi di Genova](http://www.dima.unige.it).

My goal is to provide users with the feature of creating their own algebra field and building vector spaces, matrices and tensors on it.

Suppose for example the set of strings with the concatenation operator, it could be extended to a group and maybe to a field and build "matrices of strings" or probably in the future ... "strings of matrices" (I had an intuition about a composition law for UTF-8 chars).

## Features

* Algebra over Real, Complex and Quaternions plus ∞. See also [Alexandroff compactification](http://en.wikipedia.org/wiki/Alexandroff_extension).
* Vectors and Vector Spaces
* Invertible Matrices and the General Linear Group
* [Tensors](http://en.wikipedia.org/wiki/Tensor): scalars, vectors and matrices are also implemented as tensors.
* Algebra over custom fields

## Examples

Go to [algebra quick start](http://www.g14n.info/algebra/examples/quick-start).

