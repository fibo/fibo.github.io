---
title: https-scheme
npm: true
---
# https-scheme

> redirects window location to HTTPS scheme

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)

## Usage

Just add this line of code in your JavaScript client code.

```javascript
require('https-scheme')()
```

Or, if you prefer maybe cause you want to call it if some condition is met, for instance
only in production

```javascript
const forceHttps = require('https-scheme')

if (isProduction) {
  forceHttps()
}
```

## Annotated source

Check if protocol is *https*. If yes, redirect location to homonym secure URL.

```js
function forceHttps () {
  if (window.location.protocol !== 'https:') {
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length)
  }
}

module.exports = exports.default = forceHttps
```

## License

[MIT](http://g14n.info)

