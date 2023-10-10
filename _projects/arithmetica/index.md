---
title: arithmetica
npm: true
---
# arithmetica

> is an implementation of arithmetic operators for Rational numbers

A [Rational](https://en.wikipedia.org/wiki/Rational_number) is a number that can be expressed as a fraction of two integers.
It includes also [repeating decimals](https://en.wikipedia.org/wiki/Repeating_decimal) hence is a super-set of floating point numbers.

## Installation

With [npm](https://www.npmjs.com/) do

```sh
npm install arithmetica
```

This package is implemented with ECMAScript modules. CommonJS is not supported, nor bundle is provided.

If you need a bundle, for example only with floating point operators (i.e. without repeating decimals)
you can do something like.

```sh
git clone git@github.com:fibo/arithmetica.git
cd arithmetica
esbuild --bundle float/index.js --minify --outfile=arithmetica.js
```

It will produce a 1.6kb (minified, not gzipped) _arithmetica.js_ file.

## Usage

```js
import { add } from "arithmetica";

add("1", "2"); // '3'

// Here 0._3 represents 0.3333333333333333...
add("0._3", "1")); // '1._3'
```

**NOTA BENE**: there is no runtime check on types: consumers are responsible to feed inputs
that are actual `Rational` types, for instance using [`isRational` type-guard](#isrational).

If you want only floating point operators, without _repeating decimals_ support, you can do

```js
import { add } from "arithmetica/float";

add("0.1", "0.2"); // '0.3'
```

## Types

### Float

A `Float` is a string that expresses a decimal representation of a number.

Decimal separator is "." character.
Exponential notation is not allowed.
Integer part can be omitted.

For example:

- "0"
- "1.2"
- "-0.42"
- ".123"


### Rational

A `Rational` includes every [`Float`](#float) plus *repeating decimals* that are decimal representation of a number whose digits are **periodic**.

A _repeating decimal_ is represented by a string like:

- "0._3": represents fraction `1/3`, that is 0.33333...
- "0.123_456": represents number 0.123456456456456456456456...

## Type guards

### isFloat

`isFloat(arg: unknown): arg is Float`

Use `isFloat` type-guard to check if some data belongs to `Float` type.

```ts
import { Float, isFloat, sub } from "arithmetica/float";

function minusOne (a: string): Float {
  if (isFloat(a)) return sub(a, "1");
  throw new TypeError(`Argument is not a Float ${a}`);
}
```

Of course it can be used also on an ECMAScript runtime.

```js
import { isFloat, mul } from "arithmetica/float";

function timesTen (a) {
  if (isFloat(a)) return mul(a, "10");
  throw new TypeError("Argument is not a Float");
}
```

### isRational

`isRational(arg: unknown): arg is Rational`

Use `isRational` type-guard to check if some data belongs to `Rational` type.

```ts
import { Rational, isRational, add } from "arithmetica";

function plusOneThird (a: string): Rational {
  if (isRational(a)) return add(a, "0._3");
  throw new TypeError(`Argument is not a Rational ${a}`);
}
```

## Operators

Every operator imported from `arithmetica/float` has the same signature as its homonym operator imported from `arithmetica`, but of course with type `Float` instead of a `Rational` in its signature.

### eq

> Implements _equality_ operator.

`eq(a: Rational, b: Rational): boolean`

```js
import { eq } from "arithmetica";

eq("1", "2"); // false
eq("42", "42.0"); // true
```

### add

> Implements _addition_ operator.

`add(a: Rational, b: Rational): Rational`

```js
import { add } from "arithmetica";

add("1", "2"); // '3'
add("0._1", "0._1"); // '0._2' i.e. 0.2222222...
add("0._1", "0._8"); // "1"
```

### sub

> Implements _subtraction_ operator.

`sub(a: Rational, b: Rational): Rational`

```js
import { sub } from "arithmetica";

sub("1", "2"); // '-1'
sub("0._1", "0._1"); // '0'
sub("1", "0._1"); // "0._8"
```

### neg

> Implements _negation_ operator.

`neg(a: Rational): Rational`

```js
import { neg } from "arithmetica";

neg("1"); // '-1'
neg("-42"); // '42'
```

### mul

> Implements _multiplication_ operator.

`mul(a: Rational, b: Rational): Rational`

```js
import { mul } from "arithmetica";

mul("2", "-3"); // '-6'
mul("0._3", "0.3"); // '0.1'
```

### div

> Implements _division_ operator.

`div(a: Rational, b: Rational): Rational`

It throws `RangeError` if denominator is zero.

```js
import { div } from "arithmetica";

div("-10", "2"); // '-5'

try {
  div("2", "0");
} catch (err) {
  console.error(err); // RangeError: Division by zero
}
```

### inv

> Implements _inversion_ operator.

`inv(a: Rational): Rational`

```js
import { inv } from "arithmetica";

inv("2"); // '0.5'
inv("1._1"); // '9'
```

### lt

> Implements _less then_ operator.

`lt(a: Rational, b: Rational): boolean`

```js
import { lt } from "arithmetica";

lt("-2", "1"); // true
```

### gt

> Implements _greater then_ operator.

`gt(a: Rational, b: Rational): boolean`

```js
import { gt } from "arithmetica";

gt("-2", "1"); // false
gt("42", "24"); // true
```

## Utils

### coerceToFloat

> Coerces to `Float`.

`coerceToFloat(arg: unknown): Float`

```js
import { coerceToFloat } from "arithmetica/float";

coerceToFloat(0); // '0'
coerceToFloat(-1.23); // '-1.23'
```

### floatToNumber

> Converts a `Float` to a `number`.

`floatToNumber(floatStr: Float, mantissaLength?: number): number`

```js
import { floatToNumber } from "arithmetica/float";

floatToNumber("42.01", 0); // 42
floatToNumber("1234.56789", 2); // 1234.57
```

### coerceToRational

> Coerces to `Rational`.

`coerceToRational(arg: unknown): Rational`

```js
import { coerceToRational } from "arithmetica";

coerceToRational(42); // '42'
coerceToRational(-1n); // '-1'
```

### rationalToNumber

> Converts a `Rational` to a `number`.

`rationalToNumber(rational: Rational, mantissaLength?: number): number`

Notice that `mantissaLength` argument is optional:
it set the number of digits of the decimal part, max is 16.
Output is rounded.

```js
import { rationalToNumber } from "arithmetica";

rationalToNumber("0.10"); // 0.1
rationalToNumber("0._3", 8); // 0.33333333
rationalToNumber("0.456", 2); // 0.46
```

## License

[MIT](https://fibo.github.io/mit-license)

