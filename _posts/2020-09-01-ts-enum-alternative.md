---
title: TypeScript enum alternative
tags:
  - JavaScript
description: >
    Define a list of strings that represents a set of entities, then compute types and key/value object util
---

Let's start from a list of string that represent a set of entities, for example the fields of a table:

```typescript
const fields = [
  'startDate',
  'endDate',
  'price',
  'quantity',
]
```

My goal is to have an object like the following

```typescript
const field = {
  startDate: 'startDate',
  endDate: 'endDate',
  price: 'price',
  quantity: 'quantity',
}
```

As well as a type equivalent to

```typescript
type Field = 'startDate' | 'endDate' | 'price' | 'quantity'
```

but of course I want to make it DRY (avoid code repetitions).

I will use this utility function: `listToKeyValues`.

```typescript
/**
 * Convert a list of strings to a key/value object.
 *
 * ['a', 'b'] ---> { a: 'a', b: 'b' }
 */
 export default function listToKeyValues<T extends string> (list: readonly T[]): {[key: string]: T} {
  return list.reduce((obj: {[key: string]: T}, key: T) => ({...obj, [key]: key}), {})
}
```

Then the whole implementation will be the following:

```typescript
export const fields = [
  'startDate',
  'endDate',
  'price',
  'quantity',
] as const

export type Field = typeof fields[number]

export const field = listToKeyValues<Field>(fields)
```

If for example I create a field with a wrong value I will get an error:

```typescript
const myField = 'starDate'
// TS will complain with message like:
// Type'starDate' is not assignable to 'startDate' | 'endDate' | 'price' | 'quantity'
```

The `field` and `fields` are **readonly** and can be used in several ways in a code base.
For example, just to mention one use case, I often use them in field labels translations.

<div class="paper warning">
Please notice that to lint the code above you need to configure your ESLint adding <code>"parser": "@typescript-eslint/parser"</code>.
</div>
