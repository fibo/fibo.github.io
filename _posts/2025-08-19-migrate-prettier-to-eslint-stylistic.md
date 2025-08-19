---
title: Migrate from Prettier to ESLint Stylistic
tags:
  - JavaScript
  - TypeScript
description: >
     Why and how to configure ESLint to replace Prettier for stylistic rules.
---

## Why migrate from Prettier?

[Prettier](https://prettier.io/) is a great tool. I remember around 10 years ago when it was not created yet that I had to convince developers about the value of code formatting. It may sound weird but many poeple was still convinced that you should format your code by hand. It could still be the case in some projects but if you are working on a large repository with many developers, having the code formatted automatically saves a lot of time and effort.

So we have to recognize that Prettier was able to convince the JavaScript community that it is good to have code formatted automatically. However Prettier has some limitations: the main one is that it has a **print width** option. I understand that having lines of code that fit into the screen is important but in some cases this rule is very annoing. For example, IMHO every import should be on one line. Nowadays we have tools that add imports automatically, you can even sort them. I really do not care to read my imports, I mean they are merely declarations.

There are other cases where I want to have longer lines, as well as other cases where Prettier may feel uncomfortable but it is still worth to pay this price for the benefits it brings to have formatter code...

but now there is alternative: enter [ESLint Stylistic](https://eslint.style/).

<div class="paper success">
ESLint Stylistic as any other ESLint plugin has a set of rules that can be configured to your liking. This provides you granular control as well as let you ignore rules you do not like.
</div>

## How to configure ESLint Stylistic

<div class="paper info">
The goal is to configure ESLint Stylistic with a set of rules that are as similar as possible to your previous Prettier configuration but without the hassles.
</div>

Assuming you have an ESLint v9 config file _eslint.config.js_ just install the package

```shell
npm install @stylistic/eslint-plugin --save-dev
```

<div class="paper warning">
The code formatting configuration here uses no semicolons, which is different from the default Prettier configuration.
(<a href="https://fibo.github.io/" target="_blank">fibo</a> cannot code with semicolons ;)
</div>

If you want to make it quick and you have only JavaScript files you can just do something like this:

```js
import stylistic from "@stylistic/eslint-plugin"

export default [
  stylistic.configs.customize({
    braceStyle: "1tbs",
    indent: 2,
    quotes: "double",
    quoteProps: "as-needed",
    semi: false,
    jsx: true,
  })
]
```

If instead you are using TypeScript or you want more control and explicitly list all rules, you can group them in an object to be reused across different configurations in your _eslint.config.js_ file.

```js
const rules ={
  stylistic: {
    "@stylistic/array-bracket-spacing": ["error", "never"],
    "@stylistic/arrow-spacing": ["error", { after: true, before: true }],
    "@stylistic/block-spacing": ["error", "always"],
    "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: true }],
    "@stylistic/comma-dangle": ["error", "only-multiline"],
    "@stylistic/comma-spacing": ["error", { after: true, before: false }],
    "@stylistic/dot-location": ["error", "property"],
    "@stylistic/function-call-argument-newline": ["error", "consistent"],
    "@stylistic/function-call-spacing": ["error", "never"],
    "@stylistic/generator-star-spacing": ["error", { after:true, before: false }],
    "@stylistic/indent": ["error", 2],
    "@stylistic/key-spacing": ["error", { afterColon: true, beforeColon: false, mode: "strict" }],
    "@stylistic/keyword-spacing": ["error", { after: true, before: true }],
    "@stylistic/linebreak-style": ["error", "unix"],
    "@stylistic/member-delimiter-style": ["error", {
      multiline: { "delimiter": "none" },
      singleline: { "delimiter": "semi", "requireLast": false }
    }],
    "@stylistic/no-mixed-spaces-and-tabs": "error",
    "@stylistic/no-multi-spaces": ["error"],
    "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
    "@stylistic/no-tabs": "error",
    "@stylistic/no-trailing-spaces": "error",
    "@stylistic/no-whitespace-before-property": "error",
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
    "@stylistic/semi": ["error", "never"],
    "@stylistic/space-before-blocks": ["error", "always"],
    "@stylistic/space-before-function-paren": ["error", {
      anonymous: "always",
      asyncArrow: "always",
      named: "never"
    }],
  },

  stylisticJsx: {
    "@stylistic/jsx-closing-bracket-location": ["error"],
    "@stylistic/jsx-curly-spacing": ["error", "never"],
    "@stylistic/jsx-equals-spacing": ["error", "never"],
    "@stylistic/jsx-props-no-multi-spaces": "error",
    "@stylistic/jsx-quotes": ["error", "prefer-double"],
    "@stylistic/jsx-self-closing-comp": ["error", { component: true, html: true }],
    "@stylistic/jsx-tag-spacing": ["error", {
      afterOpening: "never",
      beforeSelfClosing: "always",
      closingSlash: "never"
    }],
  }
}

```

And your ESLint config file may look something like this:

```js
import typeScriptParser from "@typescript-eslint/parser"
import stylistic from "@stylistic/eslint-plugin"

// The rules defined above.

export default [
  // Ignored files and folders.
  {
    ignores: [
      "dist/",
    ]
  }

  // All JavaScript files.
  {
    files: ["eslint.config.js", "**/*.js"],
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      ...rules.stylistic
    }
  },

  // All TypeScript files.
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: { parser: typeScriptParser },
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      ...rules.stylistic,
      ...rules.stylisticJsx,
    },
  },
]
```

## Bonus tips

### Configure VSCode

If you are using [VS Code with ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) you can configure it as default formatter and enable formatting on save. Furthermore you can disable highlighting of stylistic errors, so for example if a semicolon is missing you see no warning but when you save the file it will be automatically formatted. I would recommend to add these settings in the `.vscode/settings.json` file of your project:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.rules.customizations": [
    { "rule": "@stylistic/*", "severity": "off" },
    { "rule": "no-mixed-spaces-and-tabs", "severity": "off" },
    { "rule": "react/jsx-newline", "severity": "off" },
  ],
}
```

### Consider adding EditorConfig

Finally, I would highly recommend you add an [EditorConfig](https://editorconfig.org/) file to your project. It is supported by many editors and IDEs out of the box or via a plugin. It applies to every text file, **not only** JavaScript or TypeScript files.

For example my _.editorconfig_ file looks like this:

```ini
# EditorConfig is awesome: http://EditorConfig.org

# Stop the editor from looking for .editorconfig files in the parent directories.
root = true

[*]

charset = utf-8
insert_final_newline = true
trim_trailing_whitespace = true

end_of_line = lf
indent_style = space
indent_size = 2
```
