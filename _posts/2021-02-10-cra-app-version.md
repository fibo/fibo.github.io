---
title: Create React app version
tags:
  - React
description: >
    Write your CRA app version into the HTML. Quick and simple implementation.
---

## Motivation

When a *Create React App* is deployed, it is useful to write the app version somewhere in the HTML.

## Implementation

Write the following line in your env file, for instance in the *.env*.

```
REACT_APP_VERSION=${npm_package_version}
```

Then add the following line to the *public/index.html* file

```html
<meta name="version" content="%REACT_APP_VERSION%" />
```

And that's it, now your build will generate an *index.html* that contains the app version, as reported in your *package.json* file.
