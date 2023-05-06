---
title: arithmetica
npm: true
---
# arithmetica

> is an implementation of arithmetic operators for Rational numbers

A `RationalNumber` is any number that can be expressed by a fraction.
It is represented by a string, for example:

- "0"
- "1.2"
- "-0.42"

## Installation

With [npm](https://www.npmjs.com/) do

```sh
npm install arithmetica
```

## Usage

```js
import { add } from "arithmetica";

console.log(add("0.1", "0.2")); // '0.3'
```

There is no runtime check on types: consumers are responsible to feed inputs
that are actual `RationalNumber` types, for instance using
[`isRationalNumber` type-guard](#isrationalnumber).

## API

### eq

`eq(a: RationalNumber, b: RationalNumber): boolean`

Implements equality.

```js
eq("1", "2"); // false
eq("42", "42.0"); // false
```

### add

`add(a: RationalNumber, b: RationalNumber): RationalNumber`

Implements addition.

### sub

`sub(a: RationalNumber, b: RationalNumber): RationalNumber`

Implements subtraction.

### mul

`mul(a: RationalNumber, b: RationalNumber): RationalNumber`

Implements multiplication.

### div

`div(a: RationalNumber, b: RationalNumber): RationalNumber`

Implements division. It throws `RangeError` if denominator is zero.

```js
console.log(div("-10", "2")); // '-5'

try {
  console.log(div("2", "0");
} catch (err) {
  console.error(err); // RangeError: Division by zero
}
```

### isRationalNumber

`isRationalNumber(arg: unknown): arg is RationalNumber`

Use `isRationalNumber` type-guard to check if some variable has `RationalNumber` data type.

```ts
import { isRationalNumber, sub } from "arithmetica";

function minusOne (a: string): RationalNumber {
  if (isRationalNumber(a)) return sub(a, "1");
  throw new TypeError(`Argument is not a RationalNumber ${a}`);
}
```

Of course it can be used also on an ECMAScript runtime.

```js
import { isRationalNumber, mul } from "arithmetica";

function timesTen (a) {
  if (isRationalNumber(a)) return mul(a, "10");
  throw new TypeError(`Argument is not a RationalNumber ${a}`);
}
```

### rationalNumberToFloat

`rationalNumberToFloat(rationalNumber: RationalNumber, mantissaLength: number): number`

Convert a `RationalNumber` to a floating point number.

```js
rationalNumberToFloat("42.0", 0); // 42
rationalNumberToFloat("1234.56789", 2); // 1234.57
```

## License

[MIT](https://fibo.github.io/mit-license)

