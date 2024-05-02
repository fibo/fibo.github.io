---
title: TypeScript enum alternative
tags:
  - TypeScript
description: >
    Define a list of strings that represents a set of entities, using Literal Types instead of Enum
---

Let's start from a list of strings that represent a set of entities, for example the fields of a table:

```typescript
const myFields = [
  'startDate',
  'endDate',
  'price',
  'quantity',
]
```

My goal is to have a `MyField` type equivalent to

```typescript
type MyField = 'startDate' | 'endDate' | 'price' | 'quantity'
```

And a *Type Guard* to check for that type, name it `isMyField` for instance.

Then the whole implementation will be the following:

```typescript
export const myFields = [
  'startDate',
  'endDate',
  'price',
  'quantity',
] as const;

export type MyField = typeof myFields[number];

export function isMyField(value: unknown): value is MyField {
  if (typeof value !== 'string') return false;
  return (myFields as readonly string[]).includes(value);
}
```

If for example I create a field with a wrong value I will get an error:

```typescript
const myField: Field = 'starDate'
// TS will complain with message like:
// Type 'starDate' is not assignable to 'startDate' | 'endDate' | 'price' | 'quantity'
```
