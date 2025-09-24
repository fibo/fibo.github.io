---
title: DOM element helper
tags:
  - Web
  - TypeScript
description: >
     A tiny function to create HTML elements, compatible with JSX
---

## TLDR;

Use this `h` function

```js
const h=(e,a,c=[])=>(e=document.createElement(e),a&&Object.assign(e,a),e.append(...c),e)
```

## Usage

The `h` function is able to do things like the following.

Create an empty div:

```js
const element = h('div')
```

Create a div with a class and an attribute:

```js
const myDiv = h('div', {class: 'foo', id: 'bar'})
```

Create a list:

```js
const list = h('ul', null, [
  h('li', null, 'Item 1'),
  h('li', null, 'Item 2')
])
```

## Motivation

My main use case is to have a helper function to create _DOM elements_ in _Web Components_.
It should be __kind of__ compatible with JSX signature, but it does not implement JSX specifications.
For example event handlers should be managed by Web Component itself, so props can be only DOM attributes (i.e. only strings or numbers).

## First implementation

This is a first implementation, written in TypeScript and in a comprehensive way.

```ts
function h(
  tagName: keyof HTMLElementTagNameMap,
  attributes: Record<string, string> | null = null,
  children: Array<number | string | HTMLElement> = []
): HTMLElementTagNameMap[typeof tagName] {

  // Create the element with the given tag name.
  const element = document.createElement(tagName)

  // Set attributes on the element.
  if (attributes)
    for (const [key, value] of Object.entries(attributes))
      element.setAttribute(key, value)

  // Create and append children.
  for (const child of children)
    element.appendChild(
      (typeof child === 'string' || typeof child === 'number')
      ? document.createTextNode(child)
      : child
    )

  // Return the created element.
  return element
}
```

## Shorter implementation

This is an equivalent implementation, using few tricks to make it shorter.
It makes it perfect to copy and paste in a stand alone Web Component and use it to generate DOM elements.

Notice that the comments are the same as the previous implementation, so you can spot the analogy between the two.

```js
const h = (e, a, c = []) => (
  // Create the element with the given tag name.
  e = document.createElement(e),

  // Set attributes on the element.
  a && Object.assign(e, a),

  // Create and append children.
  e.append(...c),

  // Return the created element.
  e
)
```

The arguments are:
- `e`: the _tag name_ - then overwritten by the created element.
- `a`: the _attributes_ - if provided they are applied to the element using `Object.assign` instead of `setAttribute`.
- `c`: the _children_ - are appended into the element with `append` which takes care of handling the argument in case it is an element, string or number.

The last part is a bit tricky: it works because the last expression in an arrow function is returned implicitly.
