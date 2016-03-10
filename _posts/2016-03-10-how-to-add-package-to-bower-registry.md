---
title: How to add a package to bower registry
tags:
  - Web
description: >
    Details about how to fill a bower.json, and how to add a package to bower registry.
---

Today I noticed a nice icon project: [Code Icons][codeicons].
I decided to contribute adding a *bower.json* cause I would like to use it and it is int its TODO list.

## bower.json

I just create a file *bower.json* like the following

```
{
  "name": "codeicons",
  "main": [
    "./dist/css/code-icons.css",
    "./dist/css/code-icons.css.map",
    "./dist/css/code-icons.min.css",
    "./fonts/Code-Icons.eot",
    "./fonts/Code-Icons.svg",
    "./fonts/Code-Icons.ttf",
    "./fonts/Code-Icons.woff"
  ],
  "homepage": "http://mabrasil.github.io/getcodeicons/",
  "authors": [
    "Matheus Brasil"
  ],
  "description": "An icon set of programming languages, frameworks, and coding tools.",
  "keywords": [
    "icons"
  ],
  "license": "MIT",
  "ignore": [
    "**/.*",
    "node_modules",
    "gulpfile.js",
    "npm-debug.log",
    "src"
  ]
}
```

Then, you need to have at list a semantic version named git tag, here it is: [v1.1.0](https://github.com/mabrasil/codeicons/tree/v1.1.0) and you are ready to register it.

The command syntax is

```
bower register <my-package-name> <git-endpoint>
```

Since it is not a package of mine, I let the author do it. For instance it will be

```
bower register codeicons git://github.com/mabrasil/codeicons.git
```

I just opened a [pull request]

You need to add few properties according to [bower.json specification][bower_spec].
Sometimes there are some doubts with the meaning, I willl write here what I discover or how I use to fill them.

**TODO** fill keywords

### author

### main

### homepage

### keywords

Put some keywords you think can help to find your package in the [bower search][bower_search] page.

### moduleType

### license

## Bonus tip: CDN

You can also add a CDN link for installation using [RawGit][rawgit].

[bower_search]: http://bower.io/search/
[codeicons]: https://github.com/mabrasil/codeicons
[bower_spec]: https://github.com/bower/spec/blob/master/json.md
[pr1]: https://github.com/mabrasil/codeicons/pull/2
[rawgit]: https://rawgit.com/

