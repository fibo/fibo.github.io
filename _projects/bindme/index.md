---
title: bindme
npm: true
---
# bindme

> is a helper to bind a list of methods to an object reference

[Installation](#installation) |
[Motivation](#motivation) |
[Usage](#usage) |
[License](#license)

## Installation

```bash
npm install bindme
```

## Motivation

I was reading some interesting articles about a React poerformance tip:
creating functions in render() is not recommended.

I was looking for a way to autobind methods but none was enough
convincingly in my opinion, so I created this minimal package that is
implemented in 6 lines of good old ES5 code and requires really few lines
of code on the user side to be imported and invoked.

Consider also that, at the time of this writing, *decorator* syntax is
not final yet. Furthermore, this `bindme` helper has no dependency at all
and probably will not require updates.

## Usage

API is `bindme(this, 'method1', 'method2', ..., 'methodN')`.
For example

```javascript
import bindme from 'bindme'
// Also CommonJS is available:
// const bindme = require('bindme')

class MyButton extends Component {
  constructor(props) {
    super(props)

    this.state = { clicked: false }

    bindme(this, 'handleClick')
  }

  handleClick() {
    this.setState({ clicked: true })
  }
}
```

Since `super` returns an instance, the following snippet works too

```javascript
  constructor(props) {
    bindme(super(props),
      'onClick',
      'onMouseOver'
    )
  }
```

## Implementation

Code is written in ES5 for compatibility, it is equivalent to the
following ES6 code

```javascript
const bindme = (self, ...funcs) => {
  funcs.forEach(func => {
    if (self[func]) {
      self[func] = self[func].bind(self)
    } else {
      console.error(`Method ${func} is not defined`)
    }
  })
}
```

## License

[MIT](http://g14n.info/mit-license)

