---
title: Empty HTML page
tags:
  - Web
description: >
    How to create an empty HTML page, no title, no favicon
---

You want to start a new HTML page from scratch, you want it clean:

- you have no favicon yet and you do not like that `404 /favicon.ico` error, right?
- you want an empty title, I mean an actual empty title: code below uses [LMR](https://en.wikipedia.org/wiki/Left-to-right_mark) invisible character

> ok, show me the code!

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>&lrm;</title>
  <link rel="icon" href="data:image/x-icon;base64,AA">
</head>
<body>
</body>
</html>
```
