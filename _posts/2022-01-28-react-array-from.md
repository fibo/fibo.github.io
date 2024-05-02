---
title: React list with Array.from()
tags:
  - React
description: >
     How to use Array.from() to render a list of React components, makes me think about how good is React software design.
---

React flexibility is one of its best features.
Any JavaScript expression can be used inside brackets in JSX.
This is a winner choice compared with Angular and Vue. I do not want to learn
**yet another syntax** to generare HTML.

On the other hand, learning JavaScript to write JSX is something you can reuse somewhere else.

Many developers that start using React actually never heard about [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).
Many are backend developers that start working on frontend, but also few
frontend developers never heard about `Array.prototype.map()` before using React.

But for sure if you use React, you already know [how to render a list](https://reactjs.org/docs/lists-and-keys.html). Something like the following

```tsx
type Props = {
  numbers: number[]
}

function NumberList ({ numbers }: Props) {
  return (
    <ul>
      {numbers.map((num) => (
        <li key={num}>{num}</li>
      ))}
    </ul>
  )
}
```

With that said, let's see how to use another way to render lists: `Array.from()`.

<div class="paper info">
Suppose you want to render a <b>ghost component</b> list as a placeholder while
you are waiting for an API call to fetch the actual list. Such component should
have a <code>numItems</code> prop, that is the number of items we expect in the list.
</div>

The first question I asked to my self was:

> How can I generate a list of numbers from 1 to n?

And I found this answer

```js
const n = 5

Array.from({ length: n }, (_, i)=> i + 1)
// [1, 2, 3, 4, 5]
```

The `Array.from` signature is the following, see [Array.from docs on MDN as a reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from).

```js
Array.from(arrayLike, mapFn, thisArg)
```

Notice that `arrayLike` means that something like `{ length: 10 }` will be enough,
or you could use also a `Set` for example. But in particular we are going to take
advantage of the second argument `mapFn`, that is a **map function**.

So a `GhostList` component, having a `numItems` prop will be something like

```tsx
type Props = {
  numItems: number
}

function GhostList ({ numItems }: Props) {
  return (
    <ul>
      {Array.from({ length: numItems }, (_, i) => (
        <li key={i}>loading...</li>
      ))}
    </ul>
  )
}
```
