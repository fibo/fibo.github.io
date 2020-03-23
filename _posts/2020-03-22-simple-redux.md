---
title: A Simple React/Redux structure
tags:
  - Web
  - React
description: >
    Let me show you I use Redux with React, a set of snippets that I have polished during the last few years to achieve a simplified and flexible structure that is easy to understand also for beginners.
---

I started using React and Redux in 2015 and I immediatly fell in love with those tools. I said

> this is the way I want to develop web apps

...and so I did, since then I used React/Redux everyday in production. I remember a project switched to Angular in 2018, I was well and regulary payed but I quit.

During these years I evolved my React/Redux project structure trying to make it as much as simple and flexible as possible. You know, delivery times are always short so you need to be **fast** but also *Business logic* implementation can change quickly sometimes and you need to write *maintainable* code in order to make it flexible and easy to **refactor**.

The goals are:

0. First of all, **use Redux!** Do not waste time, there is not reason to not use a *12kb* library that works fine and provides tools like [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).
1. [KISS!](https://en.wikipedia.org/wiki/KISS_principle) use the simplest approach, do not overcomplicate things. Making it more complex does not make you look smarter. In particular, just use [redux-thunk](https://github.com/reduxjs/redux-thunk) middleware.
2. **Use fetch**, you only need a thin wrapper around it. In case you need to support older browsers there are polyfills out there. No need for additional libraries, remember that `fetch` is compiled into the client (it means that it is written in a compiled language like C++, by programmers better than you and me and it does not add weight to your bundle).
3. **Model and View** separation is sacred! Read the *old but gold* article [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) by *Redux* creator. Read it twice. I saw so many projects where business logic is deeply nested into view components, please stop it.
4. Reduce boilerplate: I started from [Redux Ducks proposal](https://github.com/erikras/ducks-modular-redux) and developed my own structure, let's see it together.

<div class="paper info">
This is just a starting point that could evolve easily according to your needs. Remember that there is no definitive structure, and any dogma can be wrong depending on the context. The best way is to keep it flexible.
</div>

## How to write a reducer

> A reducer, its initial state, actions and constants can be implemented all in the same file.

There is no need to open several files to implement a reducer action.
This is a simple reducer with a *create foo* action.

```javascript
// Action name
const CREATE_FOO = 'CREATE_ACTION'

export const initialState = {
  foo: {
    created: false
  }
}

// Action creator
export function createFoo () {
  return { type: CREATE_FOO }
}

// Reducer
export default function (state = initialState) {
  switch (action.type) {
    // It is worth to enclose `case` body with brackets, both for indentation and scope.
    case CREATE_FOO: {
      return {
        foo: {
          created: true
        },
        // notice the spread operator here, to provide immutability
        ...state
      }
    }

    default: return state
  }
}
```

<div class="paper warning">
  Don't forget to add the new reducer to the reducers index.
</div>

Create a file in the *src/reducers/* folder, for instance *src/reducers/foo.js*. Then add it to the reducers index, i.e. in file *src/reducers/index.js* do something like

```javascript
import { combineReducers } from 'redux'

export default combineReducers({
  foo
})
```

What about *async actions*? Let's write a little helper to reduce the SLOC.

```javascript
export default function asyncActions (NAME) {
  return {
    FAILURE: `${NAME}_FAILURE`,
    REQUEST: `${NAME}_REQUEST`,
    SUCCESS: `${NAME}_SUCCESS`
  }
}
```

Then, let's say we want to create another reducer with an async *get bar* action

```javascript
// Import api module, this could be imported from a separated package... more about this topic later.
// By now, notice that it provides a getBar() method.
import api from '../api.js'
import asyncActions from '../utils/asyncActions.js'

// Action names, will be GET_BAR.REQUEST, GET_BAR.SUCCESS, GET_BAR.FAILURE
const GET_BAR = asyncActions('GET_BAR')

export const initialState = {
  bar: {
    // initialize data here according to your needs, it could be null, an empty list, etc...
    data: null,
    // we need two booleans to hold the request state, name them as you like.
    requestIsWaiting: false,
    responseHasError: false
  }
}

// Async action creator
export const getBar = () => (dispatch) => {
  dispatch({ type: GET_BAR.REQUEST })

  api().getBar().then(
    () => dispatch({ type: GET_BAR.SUCCESS }),
    (error) => dispatch({ error, type: GET_BAR.FAILURE })
  )
}

// Reducer
export default function (state = initialState) {
  switch (action.type) {
    case GET_BAR.REQUEST: {
      return {
        bar: {
          ...state.bar,
          // Reset error, if any.
          responseHasError: false,
          // We are waiting for a request now, this could be used for example to show a spinner in a button.
          requestIsWaiting: true,
        },
        ...state
      }
    }

    case GET_BAR.SUCCESS: {
      return {
        bar: {
          ...state.bar,
          // Waiting for the request ended.
          requestIsWaiting: false,
          // Store request data. This also may vary a lot, you may need to use some ES6 function here.
          data: action.data,
        },
        ...state
      }
    }

    case GET_BAR.FAILURE: {
      // TODO Do some error handling, using `action.error`.
      return {
        bar: {
          ...state.bar,
          // Stop waiting for response and turn on the error flag.
          requestIsWaiting: false,
          responseHasError: true
        },
        ...state
      }
    }
    default: return state
  }
}
```

About the *TODO* in the snippet above, you may want to use `action.error` for error handling.
Error handling is up to you and really depends on the project and sometimes even from the specific request.
For example you could create classes that extend Error and use a class name as error code,
then show an error message using i18n translations.
It could also happen that backend already provides a proper error message but
usually it is not a good idea to show it to the user as is.

<div class="paper info">
This article is a <b>Work in Progress</b>.
<!-- TODO define api.js, optionally in a separated package, it can be typed and contains endpoints, errors etc. -->
<!-- TODO containers, i.e. pages and components -->
<!-- TODO middlewares, reducer actions can be exported, localstorage middleware example -->
</div>
