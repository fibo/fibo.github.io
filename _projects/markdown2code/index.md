---
title: markdown2code
npm: true
---
# markdown2code

> extracts code blocks (surrounded by triple backticks) from markdown

[Installation](#installation) |
[API](#api) |
[CLI](#cli) |
[License](#license)

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

With [npm](https://www.npmjs.com/) do

```
npm install markdown2code
```

Then, if you add a script to your package.json, like the following one

```json
    "markdown2code": "markdown2code -l javascript README.md > ${npm_package_main}",
```

you can do literate programming in your *README.md* and extract code running

```bash
npm run markdown2code
```

See also [CLI Usage](#usage) and [Example](#example) sections.

## CLI

### Usage

    markdown2code [--lang <language>] file.md

### Options

* -l --lang language filter
* -h --help shows this text message
* -v --version prints package version

### Example

Suppose you have JavaScript code in your README.md, enclosed by triple backticks
and with *javascript* keyword to enable code highlighiting, for example

    ```javascript
    var a = 1
    ```

Extract all javascript snippets with command

    markdown2code --lang javascript README.md

which will stream to STDOUT the following code

    var a = 1

Note that you can still use the *js* keyword to document example snippets, i.e.
the following markdown will be ignored, if *markdown2code* is launched with
option `--lang javascript`

    ```js
    // This highlighted JavaScript code will be ignored.
    console.log(a)
    ```

## API

The `markdown2code` function accepts the following parameters.

* `@param {Stream} input`
* `@param {Stream} output`
* `@param {Object} [opt]`
* `@param {String} [opt.lang]` filter

For example:

```javascript
const markdown2code = require('markdown2code')

const fs = require('fs')
const input = fs.createReadStream('README.md')
const output = process.stdout

markdown2code(input, output)
```

## License

[MIT](http://g14n.info/mit-license/)

