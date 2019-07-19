---
title: is-monotonic
npm: true
---
# is-monotonic

> checks that a given sequence is strictly increasing or decreasing

## Example

```javascript
const { isMonotonicIncreasing, isMonotonicDecreasing } = require('is-monotonic')

isMonotonicIncreasing([1, 2, 3, 4]) // true
isMonotonicIncreasing([1, 3, 2, 4]) // false

isMonotonicDecreasing([4, 3, 2, 1]) // true
isMonotonicDecreasing([4, 2, 3, 1]) // false
```

## See also

* [is-bullish](https://g14n.info/is-bullish)

