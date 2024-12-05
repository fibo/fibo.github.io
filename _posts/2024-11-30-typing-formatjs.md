---
title: Typing FormatJS translation keys
tags:
  - React
description: >
     Generate types for FormatJS translation keys and use them to avoid typos, get autocompletion, etc.
---

Assuming you have a React project, using TypeScript and you use the official React package provided by [FormatJS](https://formatjs.github.io/), i.e. `react-intl` to handle _internationalization_ a.k.a. **i18n**.

Here is a script that can generate types for `FormattedMessage` React component and `formatMessage` function.

```ts
import { join } from 'node:path'
import readFile from 'read-file-utf8'
import writeFile from 'write-file-utf8'

const defaultTranslation = await readFile('translations/en.json')
const pathname = join('src/types', 'FormatjsIntlMessageIds.d.ts')

const translationKeys = Object.keys(defaultTranslation)

const content = `// This file is generated

export declare type FormatjsIntlMessageId =
  | ${translationKeys.map((key) => `'${key}'`).join('\n  | ')}

global {
 namespace FormatjsIntl {
  interface Message {
   ids: FormatjsIntlMessageId;
  }
 }
}
`

await writeFile(pathname, content)
```

Of course the files and folders names are up to you. In the script above a `translations/en.json` file is used as the input containing all the translations and it generates a `src/types/FormatjsIntlMessageIds.d.ts` file.

The main trick is to update the `namespace FormatjsIntl` to add the ids of your messages, in other words the keys of your translation file.

Combined with a TypeScript integration in your IDE or your development workflow, for example checking types before commit or during CI pipeline, it makes possible to avoid typos, get autocompletion and all the other benefits of typing.
