---
title: Tiny npm package
tags:
  - Node
description: >
    Guidelines to create a Node.js module following the small package philosophy.
---

## Workflow

I have few *Node.js* packages on [npm][1] that has a *tiny structure*: my [npm tiny packages](//{{ site.domain }}/software#tiny-npm-packages).
By *tiny structure* I mean they follow the *small package philosophy* with a simple
but robust workflow like this:

  1. add a feature: edit [index.js](#index-js) to add functionality, add example in [README.md](#readme-md) and related test in [test.js](#test-js).
  2. commit: `git commit -a`
  3. deploy: `npm version minor`

The repository contains the following files:

  * [README.md](#readme-md)
  * [.gitignore](#gitignore)
  * [package.json](#package-json)
  * [index.js](#index-js)
  * [test.js](#test-js)

<div class="alert alert-info">This is just a starting point, it can grows for example adding folders <em>src/</em> and <em>test/</em> or adding services like travis or coveralls.</div>

### Debug

If you read below you may note that the *tap-min* TAP parser is used: this has several reasons.
In particular, using no TAP parser can lead to issues when publishing the package, if there are many many tests.

If you want to add `console.log` statements without breaking tests, which is the first debugging technique most of the people use, you can just go for a bare

```
tape test.js
```

or even use [`t.comment(message)`](https://github.com/substack/tape#tcommentmessage).

If you want a nice output you can optionally install few TAP parsers globally

```
npm install tap-pessimist -g
npm install tap-spec -g
```

then run tests with `tape test.js | tap-spec` or `tape test.js | tap-pessimist`.

If you need to use the [Node debugger](https://nodejs.org/api/debugger.html), just add a **debugger** keyword to
enable a breakpoint in your [index.js](#index-js) and launch tests with

```
node debug test.js
```

## .gitignore

It is as simple as

```
node_modules
npm-debug.log
```

## package.json

Use the following template, replacing `<package-name>` and `<package-description>`.

```
{
  "name": "<package-name>",
  "description": "<package-description>",
  "version": "0.0.0",
  "homepage": "http://npm.im/<package-name>",
  "author": {
    "name": "Gianluca Casati",
    "url": "http://g14n.info"
  },
  "license": "MIT",
  "main": "index.js",
  "scripts": {
    "check-deps": "npm outdated",
    "lint": "standard",
    "postversion": "git push origin v${npm_package_version}; npm publish; git push origin master",
    "test": "tape test.js | tap-min",
    "watch": "npm-watch"
  },
  "repository": {
    "type": "git",
    "url": "git://github.com/fibo/<package-name>.git"
  },
  "keywords": [],
  "bugs": {
    "url": "https://github.com/fibo/<package-name>/issues"
  },
  "pre-commit": [
    "lint",
    "test",
    "check-deps"
  ],
  "watch": {
    "test": "{index,test}.js"
  }
  "devDependencies": {},
  "dependencies": {}
}
```

### author

Here you can see my name and my website URL, change it according to [related section on package.json documentation](https://docs.npmjs.com/files/package.json#people-fields-author-contributors).

### version

Start with `0.0.0`, when publishing with `npm version minor` it will be updated to `0.1.0`.

### keywords

Add some keywords in order to make it easier to find it on [npm][1].

### homepage

The url `http://npm.im/<package-name>` redirects to `<package-name>` page on [npm][1].
Add it also to GitHub repo's website entry.

### devDependencies

Install the following development dependencies

```
npm install npm-watch --save-dev
npm install pre-commit --save-dev
npm install standard --save-dev
npm install tape --save-dev
npm install tap-min --save-dev
```

### pre-commit

Run linter and tests before each commit. This is always a good idea as for the
maintainer as for contributors. If **the tower is burning** and you need to commit
with tests failing  you can use `git commit -n`.
Finally it run a non blocking command which displays outdated dependencies.
If you need to update deps, you can run

```
npm update foo --save
```

or, if it is a dev dependency

```
npm update foo --save -dev
```

### postversion

Push tag on GitHub and publish on [npm][1] automatically after launching

```
npm version minor
```

See also [npm-version](https://docs.npmjs.com/cli/version).

### watch

Run tests when *index.js* or *test.js* change.

```
npm run watch
```

## README.md

Use the following template, replacing **<package-name>** and **<package-description>**.

    # <package-name>

    > <package-description>

    [![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

    ## Installation

    With [npm](https://www.npmjs.com/) do

        npm install <package-name> --save

    ## API

    <a name="foo"></a>
    ### `foo(bar)`

    > get the bar count

    If you want to know the bar count you should use this function.

    ```
    var countBars = foo(bar)
    console.log(countBars) // 12
    ```

    * `@param {String}`: bar lorem ipsum digitorum
    * `@returns {Number}`: count


    ## Examples

    All code in the examples below is intended to be contained into a [single file](https://github.com/fibo/<package-name>/blob/master/test.js).

    ```
    var myFooFunction = require('<package-name>')
    ```

    ### example foo

    ### example bar

    ## License

    [MIT](http://g14n.info/mit-license/)

### Description

Put the same description in:

* [package.json](#package-json)
* [README.md](#readme-md): here you can use markdown to add links and style
* GitHub project description

### Badges

#### Standard

Notify that [feross/standard](https://github.com/feross/standard) style is used.
Note that using [standardjs](http://standardjs.com/) linter is a matter of choice
if you *like semicolons* just use another linter, see also my list of [Javascript linters](http://g14n.info/2014/01/node-ecosystem/#linters).

### Installation

Specify installation instructions, which may vary for example recommending global flag.

### API

Describe function signature and its usage. Comment each parameter with its type and meaning,
write about which result the function returns or which errors are thrown.
Actually it is [dox](https://www.npmjs.com/package/dox) syntax rendered as markdown.

Note that the heading can be forced to remove the signature

```
<a name="foo"></a>
### `foo(bar)`
```

### Examples

Put examples, each one must have a corresponding test.

### License

Specify under which license is relesead the code. I usually adopt the MIT license and add a link to a page of my website displaying it.

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

