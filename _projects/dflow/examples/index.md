---
title: dflow examples
layout: default
---

## Synopsis

Start from dflow [synopsis](https://www.npmjs.org/package/dflow#synopsis).

## Sample graphs

The following examples context is defined in dflow [test/examples/funcs.js](https://github.com/fibo/dflow/blob/master/test/examples/funcs.js).

Every example has a *graph* and a set of expected *results* that are used by dflow [test/examples.js](https://github.com/fibo/dflow/blob/master/test/examples.js)

### empty

[graph](https://github.com/fibo/dflow/blob/master/test/examples/graphs/empty.json)
[results]https://github.com/fibo/dflow/blob/master/test/examples/graphs/empty-results.json)

Just an empty graph, `{}` for instance. It is expected that *dflow* has nothing to do.

### sum

[graph](https://github.com/fibo/dflow/blob/master/test/examples/graphs/sum.json)
[results](https://github.com/fibo/dflow/blob/master/test/examples/graphs/sum-results.json)

Takes two operands as arguments and returns its sum.

### apply

[graph](https://github.com/fibo/dflow/blob/master/test/examples/graphs/apply.json)
[results](https://github.com/fibo/dflow/blob/master/test/examples/graphs/apply-results.json)

Implements the apply operator.

### dotOperator

[graph](https://github.com/fibo/dflow/blob/master/test/examples/graphs/dotOperator.json)
[results](https://github.com/fibo/dflow/blob/master/test/examples/graphs/dotOperator-results.json)

Like the `.` opretor, takes an object and a prop as arguments and returns `object[prop]` value.

