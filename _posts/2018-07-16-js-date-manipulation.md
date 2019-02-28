---
title: Vanilla JavaScript date manipulation
tags:
  - Web
  - JavaScript
  - Node
description: >
    You don't need moment.js! Just use few snippets of native JavaScript code to parse and manipulate dates.
---

<div class="paper warning">
[Moment.js](https://momentjs.com/) is used in many projects to <em>parse, validate, manipulate, and display dates and times in JavaScript</em>.
There are few alternative libraries which offer similar features but with a lighter weight, for example [dayjs](https://github.com/iamkun/dayjs).
If you need [Internationalization and localization](https://en.wikipedia.org/wiki/Internationalization_and_localization) probably <em>Moment.js</em> is a good choice.
</div>

I attended at [DEVit conf](https://devitconf.org/) in 2017 and had the pleasure to meet [substack](https://github.com/substack): he is a very kind person and, in my opinion, one of the most brilliant developer around and main evangelist of the holy Unix phylosophy.
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
function isValid (day) {
  try {
    var t = new Date(day)
    return t.toISOString().slice(0, 10) === day
  } catch (err) {
    return false
  }
}

isValid('2018-07-16') // true
isValid('2018-02-30') // false
isValid('2018-01-0x') // false
```

