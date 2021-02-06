---
title: Empty favicon trick
tags:
  - Web
description: >
    If your HTML do not point to a favicon you get a 404. There are few use cases when you want to avoid that but also do not have a favicon ready yet, or you want to save bandwith. Use case is up to you, let me show you the (one line trick :) code.
---

## My use case

I have a URL shortener service that uses client side redirection, so I want to avoid an extra 404 network error or, even worse, an extra HTTP call for every redirection hit.
There can be other use cases, like starting an empty project where you do not want to pollute git history with a generic favicon, that you later replace... the use case is up to you, I found this solution somewhere on StackOverflow.

```html
<html>
  <head>
    <link rel="icon" href="data:;base64,=">
  </head>
</html>
```
