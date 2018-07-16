---
title: Use fetch!
tags:
  - Web
  - JavaScript
  - Node
description: >
    You don't need moment.js! Just use few snippets of native JavaScript code to parse and manipulate dates.
---

I as at [DEVit conf](https://devitconf.org/) in 2017 and I had the pleasure to meet [substack](https://www.substack.com/) a very kind person and, in my opinion, one of the most brilliant developer around and main evangelist of the holy Unix phylosophy.
Talking about minimalism, vanilla code, etc. he said to me

> ... also moment.js it is unnecessary, you can achieve the features you need with few lines of code, instead of importing it in your build

I thought it was an interesting point and those words were in background for two years, until now that I decided to write down few snippets I use to manipulate and parse dates in Javascript.

## Now

Start from here, now!

```javascript
const now = new Date()
```

## Add or subtract time.

Get yesterday date.

```javascript
now.setDate(now.getDate() - 1)
```

Go back two hours.

```javascript
now.setHours(now.getHours() - 2)
```

Add one month.

```javascript
now.setMonth(now.getMonth() + 1)
```

Get last day of previous month.

```javascript
now.setDate(1)
now.setDate(now.getDate() - 1)
```

## Date formats

Convert to *YYYY-MM-DD* format.

```javascript
now.toISOString().slice(0, 10)
```

## Date validation

Given a *day* in *YYYY-MM-DD* check if it is valid.

```javascript
function isValid (yyyymmdd) {
  try {
    var t = new Date(yyyymmdd)
    return t.toISOString().slice(0, 10) === yyyymmdd
  } catch (err) {
    return false
  }
}

isValid('2018-07-16') // true
isValid('2018-02-30') // false
isValid('2018-01-0x') // false
```

