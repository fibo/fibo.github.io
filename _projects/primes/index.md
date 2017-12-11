---
title: primes
---
# primes

> is a list of prime numbers

[![GoDoc](https://godoc.org/github.com/fibo/primes?status.svg)](https://godoc.org/github.com/fibo/primes)
[![GoLint](https://img.shields.io/badge/go-lint-blue.svg)](http://go-lint.appspot.com/github.com/fibo/primes)

## Benchmarks

* `go test -bench=Uint16IsPrime`
* `go test -bench=Sieve`

## References

Unit8 and Uint16 primes list was stolen from [here](https://primes.utm.edu/lists/small/100000.txt).

The *benchmarks/sieve.go* code is a variant of [this sieve](https://golang.org/doc/play/sieve.go).

## TODO

 - Uint32
 - Unit64

## License

[MIT](http://g14n.info/mit-license/)

