---
title: standa
npm: true
---
# standa

> JavaScript Standa•Rd Style minus R(eact) d(evelopment) stuff

## Features

It has a same features as [Standard JS](https://standardjs.com/) linter but
with a subset of rules: everything related to JSX and React is removed.

## Installation

With [npm](https://npmjs.org/) do

```bash
npm i standa -D
```

## Usage

It works the same as [Standard JS]!

For example you can declare globals in *package.json*, adding something like

```json
  "standa": {
    "globals": [
      "localStorage"
    ]
  }
```

Note that the attribute name is **standa** instead of *standard*.

Another use case, if you want to lint code with flow annotations, follow
[instructions from official StandardJS documentation](https://standardjs.com/#can-i-use-a-javascript-language-variant-like-flow-or-typescript)
then in your *package.json*

```bash
npm install babel-eslint
```

```json
  "standa": {
    "parser": "babel-eslint",
    "plugins": [
      "flowtype"
    ]
  }
```

## Credits

Credits go to [standard-engine collaborators](https://www.npmjs.com/package/standard-engine/access).

## License

Same as [Standard JS], i.e. [MIT](http://g14n.info/mit-license).

[Standard JS]: https://standardjs.com "StandardJS"
