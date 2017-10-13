---
title: m2c
---
# m2c

> go for 2x2 complex matrices

[![GoDoc](https://godoc.org/github.com/fibo/m2c?status.svg)](https://godoc.org/github.com/fibo/m2c)
[![GoLint](https://img.shields.io/badge/go-lint-blue.svg)](http://go-lint.appspot.com/github.com/fibo/m2c)

## Description

Complex matrices 2x2 (a.k.a. **m2c**) are a wonderful land to explore.
They are matrices of the form

```
     | a  b |
     | c  d |
```

Where a, b, c, d are complex numbers. I found Golang as the perfect
language to implement them since it has `complex128` data type, yeah!

## Examples

First of all import `m2c`.

```go
import "m2c"
```

Get the identity matrix

```go
var id = m2c.I()
fmt.Printf("%v", id)
// {(1+0i) (0+0i) (0+0i) (1+0i)}
```

Multiply two matrices.

```go
var a = m2c.Matrix{1, 0, 0, 1}
var b = m2c.Matrix{1, 1+i, 0, 1-i}

var c = m2c.Mul(a, b)
```

Invert a matrix.

```go
var a = m2c.Matrix{2i, 0, 0, 1}

var invA, err = m2c.Inv(a)

if err != nil {
	log.Fatal(err)
}
```

## License

[MIT](http://g14n.info/mit-license/)

