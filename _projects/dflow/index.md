---
title: dflow
layout: default
---

> Dataflow programming

{% include node_badges.md package='dflow' %}

## Description

*dflow* is a minimal [Dataflow programming](http://en.wikipedia.org/wiki/Dataflow_programming) engine.

For a **work in progress** demo, see [dflow.it](http://dflow.it).

## Concept

A *dflow* **graph** is a collection of **tasks** and **pipes** that can be stored in JSON format.

Every task refers to a function which output can be piped as an argument to another other task.

A **context** is a collection of functions.

`dflow.fun(context, graph)` returns a function that executes the *graph* on given *context*.

Note that *dflow* is **context agnostic**. For example a *context* can be one of the following:

  * [process](http://nodejs.org/api/process.html).
  * [window](https://developer.mozilla.org/en-US/docs/Web/API/Window).
  * [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) or any other built-in object.
  * Any object which properties are functions.

In order to mimic common functions behaviour, dflow provides few built-in tasks:

  * return
  * arguments
  * arguments[0] ... arguments[N]

## Examples

See online [examples](http://g14n.info/dflow/examples/).

