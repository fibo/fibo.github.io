---
title: Always use TypeScript
tags:
  - React
  - TypeScript
description: >
     If you are writing a JavaScript code base you should use TypeScript, even if you are not writing TypeScript code.
---

<div class="paper warning">
Nowadays I cannot think about a React codebase that does not use TypeScript.
This article was written when TypeScript adoption was still not that widespread. It is still worth to read it: there can be some use cases where this methodology can be applied.
</div>

## Motivation

I am using React to create a website, it is an exchange: [BQTX](https://bqtx.com). We opted to not use TypeScript as a language, since my collegue is new to React and starting with React + TypeScript and a lot of new stuff to learn could be hard.
Yes we are using only JavaScript (transpiled by Babel) but installing TypeScript and configuring it to check types is so easy, it takes no more than ten minutes and has **huge benefits** on our React code base.

## Dependencies

Of course start installing TypeScript, and few dependencies you will need, for example if you are using *React*.

```bash
npm install typescript @types/react @types/react-dom --save-dev
```

## Configuration

Create a *tsconfig.json* file like the following one.

```json
{
  "compilerOptions": {
    "allowJs": true,
    "charset": "utf8",
    "checkJs": true,
    "esModuleInterop": true,
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "node",
    "noEmit": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "target": "esnext"
  },
  "exclude": [
    "public"
  ],
  "include": [
    "src",
    "test"
  ]
}
```

Note that I *include* the *src* and *test* folders where I put my source code and tests, and I *exclude* the *public* folder that contains my webapp, with JavaScript bundle and vendor libs. So edit the *exclude* and *include* arrays accordingly.

Now if you create this npm script in your *package.json*:

```json
    "tsc": "tsc"
```

you can launch TypeScrypt type checker with this command

```bash
npm run tsc
```

You may want to trigger it before every *git commit* using for example [pre-commit](https://www.npmjs.com/package/pre-commit) git hook. If yes, just launch

```bash
npm install pre-commit --save-dev
```

And add this to your *package.json*:

```bash
  "pre-commit": [
    "tsc"
  ]
```

About *tsconfig.json* notice that:

* *noEmit* is set to `true`, it means that the TypeScript compiler will not output any transpiled code.
* *noUnusedLocals* and *noUnusedParameters* are set to `false` initially.

You may want to make your type checker more strict by enabling these later options, maybe one at the time since it will raise many warnings.

```diff
-    "noUnusedLocals": false,
+    "noUnusedLocals": true,
-    "noUnusedParameters": false,
+    "noUnusedParameters": true,
```

## Defining types

You can use [JSDoc](https://jsdoc.app) markup to define types. In particular with `@typedef` you can define new types, for example

```js
import React from 'react'

/**
 * @typedef {Object} MyButtonProps
 * @prop {React.ReactNode=} children
 * @prop {boolean=} disabled
 *
 * @param {MyButtonProps} props
 */

export default function MyButton ({
  children,
  disabled
}) {
  return (
    <button
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

<div class="paper info">
Yes, the TypeScript compiler can parse JSDoc and will complain if there a type mismatch, or for example some required prop is missing.
</div>

<b>Bonus Tip</b>: if you need shared types definition, you can create a *types.js* containing only JSDoc comments. You need to import it in your entry file, for instance *src/index.js*.

## Benefits

There are many benefits you get by adding TypeScript as a type checker, but the best one in my opinion is the following.

<div class="paper success">
JavaScript is very flexible and sometimes can be error prone. Adding TypeScript you will get a lot of tests that of course do not replace the tests you write, but

<br>
  <b><u>You</u> will catch errors at <u>Compile Time</u>.</b>
<br>

Yes this is the thing I like most about TypeScript, it complains at <em>Compile time</em>, I mean before you generate your JavaScript bundle, and

<br>
  <b>it is far better then your <u>Website user</u> discovering the same error at <u>Run Time</u>.</b>
<br>
</div>
