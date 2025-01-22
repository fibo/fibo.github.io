---
title: JS Error Handling
tags:
  - JavaScript
description: >
     This is my vademecum on error handling in JavaScript
---

## How to define an error

Create an error extending the `Error` class.

```ts
export class ErrorInvalidArg extends Error {
  static errorName = "ErrorInvalidArg"
    static message = "Invalid argument"
    constructor() {
      super(ErrorInvalidArg.message)
    }
}
```

Note that a static attribute `errorName` with the name of the error, i.e. the class name,
is added to be able to serialize the error. Using `ErrorInvalidArg.name` may not work if the code is minified, hence an explicit string must be added.

After calling `super` in the constructor, set the `name` as the static `errorName` otherwise the error instance will have default name "Error".

It is not worth to extend other error classes, (e.g. `TypeError`, `RangeError`)
as they are used to categorize [errors thrown by JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) and extending them would pollute what consumers expect to be on that list.

It is handy for the consumer that the class name is prefixed with `Error`.
However break rules when it makes sense, for instance:

```ts
export class InternalServerError extends Error {
  constructor() {
    super("500")
  }
}
```

The constructor need to call `super` first, passing it the error message.

## Testing errors

Error `message` is defined as a _static method_, it can be used to recognize the error in some contexts, for example when testing.

```ts
import { strict as assert } from "node:assert"
import { describe, test } from "node:test"

class ErrorInvalidDate extends Error {
  static errorName = "ErrorInvalidDate"
  static message () { return "Invalid Date" }
  constructor() {
    super(ErrorInvalidDate.message())
  }
}

const truncateDate = (arg: Date) {
  if (arg.toString() === "Invalid Date") throw new ErrorInvalidDate()
  return arg.toJSON().substring(0, 10)
}

describe("truncateDate", () => {
  test("throws ErrorInvalidDate", () => {
    assert.throws(
      () => { truncateDate(new Date("0000-00-00")) },
      {
        name: ErrorInvalidDate.errorName,
        message: ErrorInvalidDate.message()
      }
    )
  })
})
```

## Error info

Optionally add info attributes to the class, for example

```ts
/**
 * Generic HTTP Error.
 *
 * @example
 *
 * const response = await fetch(url)
 * if (!response.ok) throw new ErrorHTTP(response)
 *
 */
export class ErrorHTTP extends Error {
  static errorName = "ErrorHTTP"
    status: Response["status"]
    statusText: Response["statusText"]
    url: Response["url"]
    constructor(response: Response) {
      super(ErrorHTTP.message(response))
      this.status = response.status
      this.statusText = response.statusText
      const url = new URL(response.url)
      this.url = `${url.origin}${url.pathname}`
    }
  static message({ status, statusText, url }: Pick<Response, "status" | "statusText" | "url">) {
    return `Server responded with status=${status} statusText=${statusText} on URL=${url}`
  }
  toJSON() {
    return {
      name: ErrorHTTP.errorName,
      info: {
        status: this.status,
        statusText: this.statusText,
        url: this.url
      }
    }
  }
}
```

Notice some info could be not defined or `unknown`.

```ts
export class ErrorItemNotFound extends Error {
  static errorName = "ErrorItemNotFound"
  static message(type: ErrorItemNotFound["type"]) {
   return `${type} not found`
  }
  id?: unknown
  type: "User" | "Project" | "Transaction"
  constructor({ id, type }) {
    super(ErrorItemNotFound.message(type))
    this.id = id
    this.type = type
  }
}
```

## How to catch errors

Use `error instanceof MyError` if the error instance was created in the same JavaScript context that catches it.
This could be not the case, not only in client-server model but also when using threads (e.g. _Web Workers_).

<div class="paper warning">
Be aware that if you are using TypeScript to transpile, with compilation target <b>ES3</b> or <b>ES5</b> you need to add something like <code>Object.setPrototypeOf(this, MyError.prototype)</code> in the <i>constructor</i> in order to get an expression like <code>error instanceof MyError</code> working as expected.
</div>

Assuming that a block of code throws `MyError`, or that it calls some function that throws it: then you can catch it with something like the following.

```ts
try {
  // code
  throw new MyError()
} catch (error) {
  if (error instanceof MyError) {
    // handle it
  }
  // otherwise
  throw error
}
```

<div class="paper info">
Notice that the correct type for the catched error is </code>unknown</code>.
</div>

## Serializable errors

An error should also be serializable into JSON, in the following example the
`toJSON()` method return something that can be serialized; it will be internally called by `JSON.stringify`.

```ts
export class MyError extends Error {
  readonly bar: boolean
  readonly quz: number
  readonly whenCreated: number

  static errorName = "MyError"
  static message() {
   return "Something went wrong"
  }

  static isMyErrorData(arg: unknown): arg is MyErrorData {
    if (!arg || typeof arg !== "object") return false
    const { bar, whenCreated } = arg as Partial<MyErrorData>
     return (
       typeof bar === "boolean" &&
       typeof whenCreated === "number" &&
       whenCreated > 0
     )
  }

  constructor({ bar, quz }: Pick<MyError, "bar" | "quz">) {
    super(MyError.message)
    this.bar = bar
    this.quz = quz
    this.whenCreated = new Date().getTime()
  }

  toJSON() {
    return {
      name: MyError.errorName,
      data: {
        bar: this.bar,
        quz: this.quz,
        whenCreated: this.whenCreated
      }
    }
  }
}

export type MyErrorData = Pick<MyError, "bar" | "whenCreated">
```
