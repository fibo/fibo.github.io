---
title: async-actions
npm: true
---
# async-actions

> tiny redux action names helper

## Usage

Create a `FOO` async action.

```javascript
import asynActions from 'async-actions'

const FOO = asynActions('FOO')
```

Then in your reducer

```javascript
function myReducer (state, action) {
  switch (action.type) {
    case FOO.FAILURE:
      // Handle errors.

    case FOO.REQUEST:
      // Start request.

    case FOO.SUCCESS:
      // Handle response.
  }
}
```

## License

[MIT](http://g14n.info/mit-license)
