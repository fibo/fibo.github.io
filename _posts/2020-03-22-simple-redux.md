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

## How to write a reducer

> A reducer, its initial state, actions and constants can be implemented all in the same file.

There is no need to open several files to implement a reducer action. This is a simple *foo* reducer.

```javascript
// Action name
const CREATE_FOO = 'CREATE_ACTION'

export const initialState = {
  created: false
}

// Action creator
export function createFoo () {
  return { type: CREATE_FOO }
}

// Reducer
export default function (state = initialState) {
  switch (action.type) {
    case CREATE_FOO: {
      return {
        created: true,
        // notice the spread operator here, to provide immutability
        ...state
      }
    }

    default: return state
  }
}
```

<div class="paper info">
This article is a <b>Work in Progress</b>.
</div>
