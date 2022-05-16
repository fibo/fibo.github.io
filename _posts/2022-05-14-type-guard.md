---
title: How I implement a TypeScript type guard on an object like type.
tags:
  - TypeScript
description: >
     It happens often I need to implement a TypeScript type guard that consumes an object like type, but did not found clear examples in official documentation or articles. This is the solution I found.
---

Suppose you have a `MyType` type with fields `foo`, `bar`, `quz`.
We want an `isMyType` type guard, it can be a standalone function or also a static class method if it makes sense.

Check that the argument is an object with attributes.

```typescript
  if (typeof value !== 'object' || value === null) return false;
```

Then it is possible to destructure the value as it were a `Partial` of our type.

```typescript
  const { foo, bar, quz } = value as Partial<MyType>;
```

Now you can check every single field. Some field could be a nested object, for instance here `quz: AnotherType`.

Here it is the sample code.

```typescript
import { AnotherType, isAnotherType } from './anotherType';

export type MyType = {
  foo: string;
  bar: boolean;
  quz: AnotherType;
}

export function isMyType(value: unknown): value is MyType {
  if (typeof value !== 'object' || value === null) return false;

  const { foo, bar, quz } = value as Partial<MyType>;

  return (
    typeof foo === 'string' &&
    typeof bar === 'boolean' &&
    isAnotherType(bar)
  );
}
```

