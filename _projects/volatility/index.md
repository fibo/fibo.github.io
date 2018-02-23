---
title: volatility
npm: true
---
# volatility

> is the degree of variation of a trading price series over time

[Annotated source](#annotated-source) |
[License](#license)

[![NPM version](https://badge.fury.io/js/volatility.svg)](http://badge.fury.io/js/volatility)
[![No deps](https://img.shields.io/badge/dependencies-none-green.svg)](https://github.com/fibo/volatility)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)

## Annotated source

```javascript
/**
 * Volatility is the degree of variation of a trading price series over time.
 *
 * @param {Array} values
 * @returns {Number} sigma, a.k.a. *standard deviation* that is the square root of the values *variance*
 */
function volatility (values) {
  const n = values.length

  const mean = values.reduce((a, b) => (a + b), 0) / n

  const deviation = values.reduce((dev, val) => (dev + (val - mean) * (val - mean)), 0)

  return Math.sqrt(deviation / (n - 1))
}

module.exports = volatility
```

## License

[MIT](http://g14n.info/mit-license/)

