---
title: strict-mode
layout: project
---

> enables strict mode in your package

{% include node_badges.md package='strict-mode' %}

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install strict-mode
```

## Usage

Suppose that the *main attribute* in your *package.json* is *index.js*.

If you want that all the modules in your package has strict mode enabled,
just wrap your *index.js* this way

```js
require('strict-mode')(function () {

  // your index.js content

  // every *require* call inside this function will have strict mode enabled

})
```

## Motivation

[Strict mode][2] is a best practice but adding a `"use strict";` on top of every *.js* file in your package could

* require a big effort
* be error proning
* make complain jshint
* be a problem when concatenating files

On the other hand the [use-strict][1] package solution is too invasive, cause
it applies strictness to **all** future modules loaded.

## Credits

Code **stolen** from isaacs' [use-strict][1].

  [1]: https://npmjs.org/package/use-strict
  [2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode "Strict mode on MDN

