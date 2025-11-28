---
title: Lint staged files on commit
tags:
  - JavaScript
description: >
     How to run linting on staged files when committing code with no dependency: no (lint-staged | husky | pre-commit) needed.
---

## Motivation

On most of my projects I want to run some checks on the code before it is committed.
This is usually done with tools like `lint-staged`, `husky` or `pre-commit`.

You do not need those dependencies, it can be done easily with custom code.

## Prepare

<div class="paper info">
Of course the file names below are just examples, you can easily adapt them to your project structure.
</div>

Let's create a _scripts/prepare.js_ that will create the git hook when you run `npm install`.

```js
import { chmod, copyFile } from 'node:fs/promises'

// Install Git pre-commit hook.
const preCommitHook = '.git/hooks/pre-commit'
await copyFile('scripts/pre-commit.sh', preCommitHook)
await chmod(preCommitHook, 0o755)
```

And add a `prepare` script to your _package.json_:

```diff
{
  "scripts": {
+    "prepare": "node scripts/prepare.js"
  }
}
```

## Pre-commit hook

Now create the _scripts/pre-commit.sh_ file that will be executed by git when you commit code.

<div class="paper info">
This is just a starting point, you may add more logic. For now it just runs tests and ESLint on staged files. Notice that it greps only extensions <code>js</code>, <code>ts</code> and <code>tsx</code>, you may want to add more.
</div>

```bash
#!/bin/bash

npm test
[ $? -ne 0 ] && exit 1

EXIT_CODE=0

git diff --name-only --cached | grep -E '\.(js|ts|tsx)$' | while read FILE
do
  [ -f "$FILE" ] || continue
  ./node_modules/.bin/eslint --fix "$FILE"
  [ $? -ne 0 ] && EXIT_CODE=1
  git add "$FILE"
done

exit $EXIT_CODE
```
