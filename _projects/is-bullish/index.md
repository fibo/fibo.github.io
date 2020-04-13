---
title: is-bullish
npm: true
---
# is-bullish

> tryes to figure out if a given sequence looks increasing

## Usage

Import lib.

```javascript
const isBullish = require('is-bullish')
```

If last value is lower than first value it will return false.

```javascript
isBullish([1, 20, 400, 0]) // false
```

Otherwise it compares the mean of the first half and compares it to the mean of second half.

```javascript
isBullish([1, 2, 4, 3]) // true
```

## See also

* [is-monotonic](https://g14n.info/is-monotonic)

