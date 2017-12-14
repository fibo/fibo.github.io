---
title: markdown2code
npm: true
---
# markdown2code

> extracts code blocks from markdown and streams it out as JSON

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

With [npm](https://www.npmjs.com/) do

```
npm install markdown2code
```

## API

The `markdown2code` function exported, accepts two arguments: an input
and an output stream. For example:

```javascript
const markdown2code = require('markdown2code')

const fs = require('fs')
const input = fs.createReadStream(filepath)
const output = process.stdout

markdown2code(input, output)
```

## CLI

Start from a markdown file like this one, and launch `markdown2code` CLI

```
markdown2code README.md
```

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

