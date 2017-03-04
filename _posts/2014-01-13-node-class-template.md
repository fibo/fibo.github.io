---
title: Node class template
tags:
  - Node
description: >
    Waiting for ES6 class implementation, this article shows how I create an ES5 class with Node. Yes, you can transpile but I really don't like howbabel do it.
---

## Conventions

First of all, *Foo* class is defined in a *Foo.js* file:

> every class has a file

Here it is classic *Point2d* class example.

```js
function Point2d (x, y) {
  Object.defineProperty(this, 'x', {value: x})
  Object.defineProperty(this, 'y', {value: y})
}

module.exports = exports.default = Point2d
```

Note that constructor should contain at least once a `this` keyword.

The file ends with the [node convention][1] for exporting data from one
file to another, plus a cheap trick to get compatibility with ES6 exports.

## Attributes

When I discovered `Object.defineProperty()` I was really galvanized, cause it is an excelent way to do [OOP][2] in JavaScript IMHO.

See [Object.defineProperty on MDN][3] for a reference.

### Static attribute

In *Point3d.js* add a *dimension* attribute to *Point3d* constructor.

```js
function Point3d () {
// ...
}

Point3d.dimension = 3
```

## Inheritance

Let's create a *Point3d* class that inherits from *Point2d*.
You can use Node's `util.inherits`, but I recommend [inherits][4].

```js
var Point2d  = require('./Point2d.js')
  , inherits = require('inherits')

function Point3d (x, y, z) {
  Point2d.apply(this, arguments)

  Object.defineProperty(this, 'z', {value: z})
}

inherits(Point3d, Point2d)

module.exports = exports.default = Point3d
```

## Methods

A method can be implemented easily adding a function to `prototype`.
In *Poin2D.js* after constructor definition

```js
function length () {
  var x = this.x
    , y = this.y

  return Math.sqrt(x * x + y * y)
}

Point2d.prototype.length = length
```

### Abstract method

Something like

```js
function isAbstract () {
  throw new Error('unimplemented abstract method')
}

Point2d.prototype.myMethod = isAbstract
```

### Overridden method

In *Point3d.js* add a *length* method to prototype.

```js
inherits(Point3d, Point2d)
// ...

function length () {
  var x = this.x
    , y = this.y
    , z = this.z

  return Math.sqrt(x * x + y * y + z * z)
}

Point3d.prototype.length = length
```

Note that it must be exported after *inherits* call.

### Static method

In *Point3d.js* add a *length* method to *Point3d* constructor.

```js
function Point3d () {
// ...
}

function length (x, y, z) {
  return Math.sqrt(x * x, y * y, z * z)
}

Point3d.length = length
```

  [1]: http://nodejs.org/docs/latest/api/modules.html#modules_module_exports
  [2]: http://en.wikipedia.org/wiki/Object-oriented_programming
  [3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  [4]: https://npmjs.org/package/inherits
