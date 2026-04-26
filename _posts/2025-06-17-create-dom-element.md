---
title: DOM element helper
tags:
  - Web
  - TypeScript
description: >
     A tiny function to create HTML elements, similar to transpiled JSX
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

Create a "save" button:

```js
const myDiv = h('button', {}, ['Save'])
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
It does not support SVG elements, there is another implementation down below that is aware of `namespaceURI` argument for [createElementNS](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS).

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

This is an (almost) equivalent implementation, using few tricks to make it shorter.
It makes it perfect to copy and paste in a stand alone Web Component and use it to generate DOM elements.

Notice that the comments are the same as the previous implementation, so you can spot the analogy between the two.

<div class="paper info">
This shorter implementation does not work with <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes">data attributes</>.
The previous implementation above supports them cause it uses <code>setAttribute</code> instead of <code>Object.assign</code>.
</div>

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

## Support for SVG elements

If you create an SVG element you cannot use `document.createElement`, you need to do something like this

```js
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
```

The idea, similar to _Preact_ implementation, is to assume that if you are inside an `svg` DOM element, than the children are SVG elements. This is always true except for `foreignObject` which will contain HTML elements.
This logic also works with MathML elements.

Also notice that in addition, you can now pass a child as an array. For example to create an SVG icon.

```js
h('div', { class: 'icon' }, [
    [ 'svg', { fill: 'currentColor', viewBox: '0 0 50 50' }, [
      [ 'path', { d: 'M 10 24 h 28 v 2  h -28 z' } ],
      [ 'path', { d: 'M 24 10 h 2  v 28 h -2 z' } ]
    ] ]
])
```

There is a fourth argument `namespace` you can ignore. It is used internally to pass the parent namespace to children.

```js
const h = (tagName, attributes = {}, children = [], namespace) => {
  let namespaceURI, childNamespace;

  switch(true) {
    case namespace === 'svg' || tagName === 'svg':
      childNamespace = 'svg';
      namespaceURI = 'http://www.w3.org/2000/svg';
      break;
    case namespace === 'math' || tagName === 'math':
      childNamespace = 'math';
      namespaceURI = 'http://www.w3.org/1998/Math/MathML';
      break;
    case tagName === 'foreignObject':
      childNamespace = 'html';
      namespaceURI = 'http://www.w3.org/2000/svg';
      break;
    case namespace === 'html':
      childNamespace = 'html';
      namespaceURI = 'http://www.w3.org/1999/xhtml';
      break;
    default: break;
  }

  const element = namespaceURI ?
    document.createElementNS(namespaceURI, tagName) :
    document.createElement(tagName);

  for (const [key, value] of Object.entries(attributes))
    element.setAttribute(key, value);

  for (const child of children)
    if (Array.isArray(child))
      element.append(h(...Object.assign(['', {} , [], childNamespace], child)));
    else
      element.append(child);

  return element;
};
```
