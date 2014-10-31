---
title: dflow examples
layout: default
---

## Synopsis

Start from [dflow synopsis](https://www.npmjs.org/package/dflow#synopsis).

## Sample graphs

The following examples context is defined in [funcs.js]().

Every example has a *graph* and a set of expected *results* that are used by dflow [test/examples.js]()

### empty

[graph]() | [results]()

Just an empty graph, `{}` for instance. It is expected that *dflow* has nothing to do.

### sum

[graph]() | [results]()

Takes two operands as arguments and returns its sum.

### apply

[graph]() | [results]()

Implements the apply operator.

### dotOperator

[graph]() | [results]()

Like the `.` opretor, takes an object and a prop as arguments and returns `object[prop]` value.

