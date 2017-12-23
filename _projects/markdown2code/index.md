---
title: markdown2code
npm: true
---
# markdown2code

> extracts code blocks (surrounded by triple backticks) from markdown and streams it out as text or JSON

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

Since there is a `markdown2code` [CLI](#cli) it does make sense to install globally

```bash
npm install markdown2code -g
```

If you add the following script to your package.json

```json
    "markdown2code": "markdown2code -l javascript README.md > ${npm_package_main}",
```

then you can do literate programming in your *README.md* and extract code running

```bash
npm run markdown2code
```

See also [Usage](#usage) and [Examples](#examples) sections.

## API

The `markdown2code` function accepts the following parameters.

* `@param {Stream} input`
* `@param {Stream} output`
* `@param {Object} [opt]`
* `@param {String} [opt.format]` can be text (default) or JSON
* `@param {String} [opt.language]` filter

For example:

```javascript
const markdown2code = require('markdown2code')

const fs = require('fs')
const input = fs.createReadStream('README.md')
const output = process.stdout

markdown2code(input, output)
```

## CLI

### Usage

    markdown2code [--format JSON|text] [--lang <language>] file.md

### Options

* -f --format [text|JSON] output format, defaults to text
* -l --lang language filter
* -h --help shows this text message
* -v --version prints package version

### Examples

Extract all javascript snippets in text format

    markdown2code --lang javascript README.md

Extract all code snippets in JSON format

    markdown2code --format JSON README.md

Code blocks like the following will be extracted

    ```javascript
    // Hello
    console.log("hello world")
    ```

and streamed to stdout as the following object

```json
[
  {
    "lang": "javascript",
    "code": [
      "// Hello",
      "console.log(\"hello world\")"
    ]
  }
]
```

## License

[MIT](http://g14n.info/mit-license/)

