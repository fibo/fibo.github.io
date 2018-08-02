---
title: fa-svg-icon
npm: true
---
# fa-svg-icon

> free [Font-Awesome] SVG icons

## Installation

With [npm](https://www.npmjs.com/) do

```bash
npm install fa-svg-icon
```

## Usage

Import all icons.

```javascript
const icon = require('fa-svg-icon')

console.log(icon.solid.addressBook)
// {
//   viewBox: '0 0 448 512',
//   d: 'M436 160c6.6 0 12-5.4 ... ... ... 0 67.2 25.8 67.2 57.6v19.2z'
// }
```

Icon data is an object which attributes are:

1. The SVG `viewBox`.
2. The attribute **d** of `path` tag.

Icons are organized into three packs:

* brands
* regular
* solid

Import only *solid* icons.

```javascript
const solidIcon = require('fa-svg-icon/solid')

console.log(solidIcon.addressBook)
```

Note that if for example you do not use *brands* and *regular* icons, using the
syntax above will save up to 450kb in your build.

It is possible to refine granularity even more.

Import only *address book solid* icon.

```javascript
const addressBookIcon = require('fa-svg-icon/solid/address-book')

console.log(addressBookIcon)
```

This last approach can take a little time more during development, but if
you are using few icons it can be worth to import only what you need.

## Build

Icons come from [Font-Awesome/svg-with-js/js/](https://github.com/FortAwesome/Font-Awesome/tree/5.2.0/svg-with-js/js) folder:

* [brands](https://github.com/FortAwesome/Font-Awesome/tree/5.2.0/svg-with-js/js/fa-brands.js)
* [regular](https://github.com/FortAwesome/Font-Awesome/tree/5.2.0/svg-with-js/js/fa-regular.js)
* [solid](https://github.com/FortAwesome/Font-Awesome/tree/5.2.0/svg-with-js/js/fa-solid.js)

Files *fa-brands.js*, *fa-regular.js*, *fa-solid.js* contain original
Font Awesome code and are consumed by `npm run build` script to create
source files.

Icon names are camelized: for example Font Awesome name `address-book` is
converted into `addressBook` for JavaScript compatibility.

Identifiers that starts with a number, like *500px* are enclosed in quotes to
avoid parsing error: *Identifier directly after number*.

Origin data is an array: iti s extracted and transformed into an object `{ viewBox, d }`.

## License

[Font Awesome Free License](https://github.com/FortAwesome/Font-Awesome/blob/master/LICENSE.txt)

[Font-Awesome]: https://fontawesome.com/ "Font Awesome"

