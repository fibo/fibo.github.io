---
title: numerology
npm: true
---
# numerology

> converts a string to a number in the given range

[Installation](#installation) |
[Examples](#examples) |
[Annotated source](#annotated-source) |
[License](#license)

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)

## Installation

```bash
npm install numerology
```

### Examples

## Name to port number

> Convert a name to a port number, deterministically

```javascript
const numerology = require('numerology')

const userPortsRange = [1024, 49151]
const port = numerology('my-app-name', userPortsRange)
```

## Distribute domains

Suppose you have a list of domains you want to distribute in 6 folders,
in a random but balanced way. You can associate a number from 1 to 6 with
the snippet `numerology(domain, [1, 7])`, launch the following command
to get the result.

```bash
node examples/distributeDomains.js | sort | uniq -c
 148 folder1
 148 folder2
 139 folder3
 138 folder4
 146 folder5
 153 folder6
 128 folder7
```

## Annotated source

[Latin alphabet system numerology](https://en.wikipedia.org/wiki/Numerology#Latin_alphabet_systems), which actually is not implemented by this package, assigns a number to every lower case latin letter.
The function below uses `String.prototype.charCodeAt` to accept every character and `String.prototype.toLowerCase` to be **case insensitive**.

    /**
     * @param {String} name you want to convert into a number.
     * @param {Array} [range] defaults to `[0, 9]`.
     * @returns {Number} num.
     */

    function numerology (name, range) {
      if (arguments.length === 1) range = [0, 9]

      const inf = range[0]
      const sup = range[1]

      var num = name.split('')
                    .map((x) => x.toLowerCase().charCodeAt())
                    .reduce((a, b) => a + b)

      if (num < inf) num += inf
      if (num > sup) num = (num % sup) + inf

      return num
    }

    module.exports = numerology

## License

[MIT](http://g14n.info/mit-license)

[KLP]: http://g14n.info/kiss-literate-programming "KISS Literate Programming"
