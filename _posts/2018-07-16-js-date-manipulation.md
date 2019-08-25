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
<a href="https://momentjs.com/">Moment.js</a> is used in many projects to <em>parse, validate, manipulate, and display dates and times in JavaScript</em>.
There are few alternative libraries which offer similar features but with a lighter weight, for example <a href="https://github.com/iamkun/dayjs">dayjs</a>.
If you need <a href="https://en.wikipedia.org/wiki/Internationalization_and_localization">Internationalization and localization</a> probably <em>Moment.js</em> is a good choice.
</div>

I attended at [DEVit conf](https://devitconf.org/) in 2017 and had the pleasure to meet [substack](https://github.com/substack): he is a very kind person and, in my opinion, one of the most brilliant developer around and main evangelist of the holy Unix phylosophy.
Talking about minimalism, vanilla code, etc. he said to me

> ... also moment.js it is unnecessary, you can achieve the features you need with few lines of code, instead of importing it in your build

I thought it was an interesting point and those words were in background for two years, until now that I decided to write down few snippets I use to manipulate and parse dates in Javascript.

<div class="paper info">
  <b>UPDATE</b>: it looks like that many others shares this opinion too: <a href="https://github.com/you-dont-need/You-Dont-Need-Momentjs" target="_blank">you dont need Momentjs</a>.
</div>

## Now

Start from here, now!

```javascript
const now = new Date()
```

Current Unix timestamp in seconds

```javascript
Math.floor(now.getTime() / 1000)
```

Notice also this syntax is valid if you want to get a value on the fly with no need to create a reference

```javascript
Math.floor(new Date().getTime() / 1000)
```

[De Mysteriis Dom JavaScript](https://www.youtube.com/watch?v=qcS0CVJ1KPg)!

Also following snippets are weird but they work, and even more... they work in [UTC].

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

Follows a list of utility functions for date manipulation.

```js
function addDays (num, t1 = new Date()) {
  const t2 = new Date(t1)

  t2.setDate(t2.getDate() + num)

  return t2
}

function addHours (num, t1 = new Date()) {
  const t2 = new Date(t1)

  t2.setHours(t2.getHours() + num)

  return t2
}

function addMinutes (num, t1 = new Date()) {
  const t2 = new Date(t1)

  t2.setMinutes(t2.getMinutes() + num)

  return t2
}

function daysAgo (num, t1 = new Date()) {
  const t2 = new Date(t1)

  t2.setDate(t2.getDate() - num)

  return t2
}

function nextHour (t = new Date()) {
  return addHours(t, 1)
}

function tomorrow (t = new Date()) {
  return addDays(t, 1)
}
```

## Date extraction

Get year, month, day, hour, minute, second and millisecond as left padded strings.

```javascript
function splitDate (t = new Date()) {
  return t.toISOString().split(/[^\d]/)
}

const [yyyy, mm, dd, hh, mi, ss, mls] = splitDate()
// ['2018', '07', '16', '12', '01', '15', '107']
```

## Date formats

Convert to *YYYY-MM-DD* format.

```javascript
function ymd (t = new Date()) {
  return t.toISOString().slice(0, 10)
}
```

## Truncations

Truncate date, at midnight 🧙.

```javascript
function truncateDay (t = new Date()) {
  return new Date(ymd(t))
}
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

## Utils

Current Unix timestamp, with milliseconds.

```js
function currentUnixTimestamp () {
  return new Date().getTime()
}
```

List of hours in a day, and list of minutes in an hour.

```js
function hoursInDay () {
  return [...new Array(24).keys()].map(h => String(h).padStart(2, '0'))
}

function minutesInHour () {
  return [...new Array(60).keys()].map(h => String(h).padStart(2, '0'))
}
```

[UTC]: https://en.wikipedia.org/wiki/Coordinated_Universal_Time "Coordinated Universal Time"
