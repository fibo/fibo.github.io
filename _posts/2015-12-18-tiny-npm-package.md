---
title: Tiny npm package
tags:
  - Node
description: >
    Guidelines to create a Node.js module following the small package philosophy.
---

I have few *Node.js* packages on [npm][1] that has a *tiny structure*

* [algebra-group](http://npm.im/algebra-group)
* [algebra-ring](http://npm.im/algebra-ring)
* [cayley-dickson](http://npm.im/cayley-dickson)
* [indices-permutations](http://npm.im/indices-permutations)
* [laplace-determinant](http://npm.im/laplace-determinant)
* [multidim-array-index](http://npm.im/multidim-array-index)
* [tensor-contraction](http://npm.im/tensor-contraction)
* [tensor-product](http://npm.im/tensor-product)
* [write-file-utf8](http://npm.im/write-file-utf8)

By *tiny structure* I mean they follow the *small package philosophy*.

Workflow is really simple:
  * add a feature: edit *index.js*, add example in *README.md* and its test in *test.js*.
  * test: `npm test`
  * lint: `npm run lint`
  * commit and push: `git commit -am 'added feature foo'; git push`
  * deploy: `npm version minor`

The repository contains the following files:
  * README.md
  * .gitignore
  * package.json
  * index.js
  * test.js

## .gitignore

It is as simple as

```
node_modules
npm-debug.log
```

## package.json

Use the following template, replacing **<package-name>** and **<package-description>**.

```
{
  "name": "<package-name>",
  "description": "<package-description>",
  "version": "0.1.0",
  "homepage": "http://npm.im/<package-name>",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "license": "MIT",
  "main": "index.js",
  "scripts": {
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "lint": "standard",
    "test": "tape test.js"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/<package-name>.git"
  },
  "keywords": [],
  "bugs": {
    "url": "https://github.com/fibo/<package-name>/issues"
  },
  "devDependencies": {},
  "dependencies": {}
}
```

### keywords

Add some keywords in order to make it easier to find it on [npm][1].

### homepage

The url `http://npm.im/<package-name>` redirects to `<package-name>` page on [npm][1].
Add it also to GitHub repo's website entry.

### devDependencies

Install the following development dependencies

```
npm install standard --save-dev
npm install tape --save-dev
```

### postversion

Push tag on GitHub and publish on npm automatically after launching

```
npm version minor
```

## README.md

Use the following template, replacing **<package-name>** and **<package-description>**.

```
# <package-name>

> <package-description>

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Install

With [npm](https://www.npmjs.com/) do

    npm install <package-name> --save

## Usage

Signature is `(bar)` where
* **bar** is a string

It returns the **quz** string.

## Examples

All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/<package-name>/blob/master/test.js).

```
var myFooFunction = require('<package-name>')
```

### example foo

### example bar

## License

[MIT](http://g14n.info/mit-license/)

```

### Description

Put the same description in:
* package.json
* README.md
* GitHub project description

where  in README.md you can use markdown to add links and style.

### Badges

#### standard

Notify that [feross/standard](https://github.com/feross/standard) style is used.

### Install

Specify installation instructions, which may vary for example recommending global flag.

### Usage

Describe function signature and its usage.

### Examples

Put examples, each one must have a corresponding test.

## test.js

Contains tests to validate examples, something like

```
var myFooFunction = require('./index')
var test = require('tape')

test('example foo', function (t) {
  t.plan(1)

  t.equal(myFooFunction('foo'), 'xxxfoo')
})

test('example bar', function (t) {
  t.plan(1)

  t.equal(myFooFunction('foo'), 'xxxbar')
})
```

## index.js

Contains the implementation, which should be a single function documented by a [dox](https://www.npmjs.com/package/dox) compatible comment.
Something like

```
/**
 * My foo function
 *
 * @params {String} bar
 * @returns {String} quz
 */

function myFooFunction (bar) {
  var quz = 'xxx'

  quz += bar

  return quz
}

module.exports = myFooFunction
```

  [1]: https://www.npmjs.com/ "npm website"

