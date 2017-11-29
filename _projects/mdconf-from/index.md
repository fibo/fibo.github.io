---
title: mdconf-from
npm: true
---
# mdconf-from

> parses a markdown file and returns a configuration object

[Installation](#installation) |
[API](#api) |
[Annotated source](#annotated-source)
[License](#license)

[![NPM version](https://badge.fury.io/js/mdconf-from.svg)](http://badge.fury.io/js/mdconf-from) [![Build Status](https://travis-ci.org/fibo/mdconf-from.svg?branch=master)](https://travis-ci.org/fibo/mdconf-from?branch=master) [![Dependency Status](https://gemnasium.com/fibo/mdconf-from.svg)](https://gemnasium.com/fibo/mdconf-from)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)

## Installation

```bash
npm install mdconf-from --save
```

## API

This package assumes that:
1. The markdown file is utf8 encoded.
2. There is a **single h1** section.
3. There is a `## Configuration` section, like [this](#configuration).

See also [mdconf] to learn how *Markdown driven configuration* works.

### `mdconfFrom(file)`

* **@param** `{String}` file relative path
* **@returns** `{Object}` config

```javascript
// Suppose you are parsing this file itself.
var config = require('mdconf-from')('README.md')

console.log(config.foo) // bar
```

## Configuration

This package does not use any configuration at all, this section is
here only for test and documentation purpouse.

* foo: bar

## Annotated source

Actually this package is a wrapper around [mdconf].

    var fs = require('fs')
    var mdconf = require('mdconf')

    function mdconfFrom (file) {

Parse the markdown in given file.

      var content = fs.readFileSync(file, 'utf8')
      var markdownObj = mdconf(content)

Extract the *Configuration* section.

      var rootKey = Object.keys(markdownObj)[0]
      var config = markdownObj[rootKey].configuration

      return config
    }

Export function

    module.exports = mdconfFrom

## License

[MIT](http://g14n.info/mit-license)

[mdconf]: https://github.com/tj/mdconf "mdconf"
