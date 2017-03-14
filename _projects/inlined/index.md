---
title: inlined
---
# inlined

> throws if some module body length exceeds *max-inlined-source-size* number of chars

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

This package will make your code **die** on start up if some of your modules
cannot be inlined.

## Usage

**Please note that this package is intended to be used server side.**
If used with [browserify] it is a [no op](https://github.com/fibo/inlined/blob/master/browser.js).

Suppose that the *main attribute* in your *package.json* is *index.js*.
If you want that all the modules in your package have body length less
the *max-inlined-source-size* value, wrap your *index.js* this way

```javascript
require('inlined')(function () {

// your index.js content

// every *require* call will throw an exception if its
// body lenght *max-inlined-source-size* number of chars

})
```

## License

[MIT](http://g14n.info/mit-license)

[optimization_article]: https://top.fse.guru/nodejs-a-quick-optimization-advice-7353b820c92e#.j8j89xyfk "NodeJS : A quick optimization advice"
