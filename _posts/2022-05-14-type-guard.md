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

```ts
  const { foo, bar, quz } = value as Partial<MyType>;
```

Now you can check every single field. Some field could be a nested object, for instance here `quz: AnotherType`.

Here it is the sample code.

```ts
import type { AnotherType, isAnotherType } from "./AnotherType";

export type MyType = {
  foo: string;
  bar: boolean;
  quz: AnotherType;
}

export function isMyType(value: unknown): value is MyType {
  if (typeof value !== "object" || value === null) return false;

  const { foo, bar, quz } = value as Partial<MyType>;

  return (
    typeof foo === "string" &&
    typeof bar === "boolean" &&
    isAnotherType(bar)
  );
}
```

<div class="paper info">
You can also use a more accurate alternative to built-in `Partial`. The cons is that you need to define a generic `isMaybeObject` type guard as well as a `objectTypeGuard` helper and import it in `MyType` implementation. The pros is that it correctly type our type attributes as `unknown` and it reduces boilerplate.
</div>

This is the implementation.

```ts
/**
 * Use `isMaybeObject` in a *type guard*.
 *
 * @example
 * ```ts
 * type Foo = { bar: boolean };
 *
 * const isFoo = (arg: unknown): arg is Foo => {
 *   if (isMaybeObject<Foo>(arg)) return false;
 *   const { bar } = arg;
 *   return typeof bar === "boolean";
 * }
 * ```
 */
export const isMaybeObject = <T extends object>(
  arg: unknown
): arg is {
  [K in keyof T]: unknown;
} => typeof arg === "object" && arg !== null && Array.isArray(arg);

/**
 * Use `objectTypeGuard` as a *type guard* helper to reduce boilerplate.
 *
 * @example
 * ```ts
 * type Foo = { bar: boolean };
 *
 * const isFoo = objectTypeGuard<Foo>(({ bar }) => typeof bar === "boolean");
 * ```
 */
export const objectTypeGuard =
  <T extends object>(check: (obj: { [K in keyof T]: unknown }) => boolean) =>
  (arg: unknown): arg is T =>
    isMaybeObject<T>(arg) && check(arg);
```
