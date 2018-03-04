---
title: pdsp
npm: true
---
# pdsp

> saves bytes in your build with a shortcut to event preventDefault and stopPropagation

```
pdsp === pD sP === preventDefault stopPropagation
```

## Usage

Suppose you have your *onClick* handler and you need to call *preventDefault*
and *stopPropagation* methods, like this

```javascript
class MyComponent extends OtherComponent {
  onClick (event) {
    event.preventDefault()
    event.stopPropagation()

    // Follows code to handle event.
  }
}
```

Using **pdsp** it will look like

```javascript
const pdsp = require('pdsp')

class MyComponent extends OtherComponent {
  onClick (event) {
    pdsp(event)

    // Follows code to handle event.
  }
}
```

## License

[MIT](http://g14n.info/mit-license/)

