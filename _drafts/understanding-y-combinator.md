---
title: Understanding Y combinator
layout: post
tags:
  - Function programming
  - JavaScript
---

http://www.crockford.com/javascript/little.html

```
function Y(le) {
    return (function (f) {
        return f(f);
    }(function (f) {
        return le(function (x) {
            return f(f)(x);
        });
    }));
}
```

```
var factorial = Y(function (fac) {
    return function (n) {
        return n <= 2 ? n : n * fac(n - 1);
    };
});

var number120 = factorial(5);
```
var factorial = Y(function (fac) {

