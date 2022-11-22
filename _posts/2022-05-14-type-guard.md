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

Then it is possible to destructure the value as it were `Maybe` our type.

```typescript
  const { foo, bar, quz } = value as Maybe<MyType>;
```

Now you can check every single field. Some field could be a nested object, for instance here `quz: AnotherType`.

This is `Maybe` implementation.

```ts
/**
 * Use `Maybe` generic as a *type guard* helper.
 *
 * @example
 * ```ts
 * type Foo = { bar: boolean };
 *
 * const isFoo = (arg: unknown): arg is Foo => {
 *   if (!arg || typeof arg !== "object") return false;
 *   const { bar } = arg as Maybe<Foo>;
 *   return typeof bar === "boolean";
 * }
 * ```
 */
export type Maybe<T extends object> = {
  [K in keyof T]: unknown;
};
```

Here it is the sample code.

```ts
import type { AnotherType, isAnotherType } from "./AnotherType";
import type { Maybe } from "./Maybe";

export type MyType = {
  foo: string;
  bar: boolean;
  quz: AnotherType;
}

export function isMyType(value: unknown): value is MyType {
  if (typeof value !== "object" || value === null) return false;

  const { foo, bar, quz } = value as Maybe<MyType>;

  return (
    typeof foo === "string" &&
    typeof bar === "boolean" &&
    isAnotherType(bar)
  );
}
```

