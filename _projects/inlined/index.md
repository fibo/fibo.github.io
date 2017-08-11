---
title: inlined
npm: true
---
# inlined

> throws if some module body length exceeds *max_inlined_source_size* number of chars

[![NPM version](https://badge.fury.io/js/inlined.svg)](http://badge.fury.io/js/inlined) [![Build Status](https://travis-ci.org/fibo/inlined.svg?branch=master)](https://travis-ci.org/fibo/inlined?branch=master) [![Dependency Status](https://gemnasium.com/fibo/inlined.svg)](https://gemnasium.com/fibo/inlined)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![NPM](https://nodei.co/npm-dl/inlined.png)](https://nodei.co/npm-dl/inlined/)

## Installation

With [npm](https://npmjs.org/) do

```bash
npm install inlined
```

## Description

Do you remember when [NodeJS : A quick optimization advice][optimization_article] article was published? It says that

> v8 optimizer (crankshaft) inlines the functions whose body length, including the comments, is less than 600 characters.

> So when you have a function or callback that’ll be called repeatedly, try to make it under 600 characters (or your tweaked value), you’ll have a quick win !

Maybe you already know that, when you `require` a module like this

```js
var foo = 'bar'

module.exports = foo
```

it is wrapped in a function like this

```js
(function (exports, require, module, __filename, __dirname) {
var foo = 'bar'

module.exports = foo
});
```

So, I guess that, and please correct me and let me know if I am wrong,
if the module has less than *max_inlined_source_size* chars,
it will be *inlined* hence *optimized*.

This package will make your code **die** on start up if some of your modules
cannot be *inlined*.

## Usage

### Basic usage

**Please note that this package is intended to be used server side.**
If used with [browserify] it is a [no op].

Suppose that the *main attribute* in your *package.json* is *index.js*.
If you want that all the modules in your package have body length less
the *max_inlined_source_size* value, wrap your *index.js* this way

```javascript
require('inlined')()(function () {

// your index.js content

// Every *require* call will throw an exception if its body lenght
// is greater than *max_inlined_source_size* number of chars.
})
```

### Tuning `max_inlined_source_size`

Optionally, you can pass the value of the max source size which defaults
to 600. It is up to you to keep it in sync with the to the
*max_inlined_source_size* node flag.
For instance, if you launch your script with

```bash
node --max_inlined_source_size=800 myscript.js
```

Then your code should look like

```javascript
const maxInlinedSourceSize = 800

require('inlined')({ maxInlinedSourceSize })(function () {

// your index.js content

})
```

In order to do tuning on this value and change it quickly to be able to
run multiple benchmarks, it also possible to set it with the
`MAX_INLINED_SOURCE_SIZE` environment variable.
For instance, if you launch your script with

```bash
export MAX_INLINED_SOURCE_SIZE=800
node --max_inlined_source_size=$MAX_INLINED_SOURCE_SIZE myscript.js
```

Then your code will be something like

```javascript
require('inlined')()(function () {

// your index.js content

})
```

## License

[MIT](http://g14n.info/mit-license)

[browserify]: http://browserify.org/ "browserify"
[no op]: https://github.com/fibo/inlined/blob/master/browser.js "browser.js"
[optimization_article]: https://top.fse.guru/nodejs-a-quick-optimization-advice-7353b820c92e#.j8j89xyfk "NodeJS : A quick optimization advice"
