---
title: Using Framer X with custom Sass build
tags:
  - Web
description: >
     Framer X is a slick tool, you can express your creativity creating not only design mockups but also React components from real code. Is it possible to use your own Sass build?
---

## Introduction

Yesterday I started using [Framer X](https://www.framer.com), and I am excited about the possibilities it opens. I am still looking at the video tutorials and documentation and one of the first tasks I want to achieve is the possibility to import my own components and use my custom Sass build inside *Framer X*.

You can save projects in two formats, we a **folder-backed** project. It is a *.framerfx* folder that you can version using *git*, and contains a *package.json* so you can install depependencies.

## Authenticate

It looks a good idea use the [Framer CLI](https://www.npmjs.com/package/framer-cli) to authenticate and set your `FRAMER_TOKEN` in a permanent environment variable. I assume you already have a *Framer X* account, use your email address of course

```bash
npx framer-cli authenticate <email@address>
```

Then I edited my *.bash_profile* with something like

```bash
export FRAMER_TOKEN=123...
```

## Create project

Open *Framer X*, create a new project and save it as a *folder-backed project*. You need to choose as *File Format* the option **Framer X (Folder)**.

My Goal is to create a custom Sass build, importing it into the project and design components with that style into *Framer X*.

I also uploaded it on GitHub, this is the final result: [fibo/sass-build-example.framerfx](https://github.com/fibo/sass-build-example.framerfx).

After I created the empty project and uplaoded it on GitHub for the first time I see the following

```
.
├── .gitignore
├── README.md
├── build
│   ├── index.js
│   └── vendors.js
├── code
├── design
│   └── document.json
├── metadata
│   └── .gitignore
├── package.json
├── tsconfig.json
└── yarn.lock
```

Also, I edited my *package.json* accordingly, in particular I do not want to upload it on the npm registry, so I added

```json
  "private": true,
```

## Sass build

I am going to import my component library [Trunx](https://trunx.dev) which uses [Bulma](https://bulma.io), and customize the Sass build. So I created a *sass/* folder with the following files:

* _custom-variables.scss
* app.scss

File: *_custom-variables.scss*.

```scss
$azure: hsl(180, 100%, 97%);
$limegreen: hsl(120, 61%, 50%);
$steelblue: hsl(207, 44%, 49%);
$tomato: hsl(9, 100%, 64%);

$body-background-color: $azure;

$primary: hsl(197, 79%, 60%);
$link: hsl(219, 61%, 57%);
$info: $steelblue;
$success: $limegreen;
$warning: hsl(48, 89%, 60%);
$danger: $tomato;
```

File: *app.scss*.

```scss
/* Import variables first, then the whole Bulma. */
@import "custom-variables";
@import "bulma/bulma";
```

Let's install some dependencies

```bash
yarn add framer react react-dom node-sass --dev
```

I also added *trunx*, cause it is needed in my case. Probably you do not need it

```bash
yarn add trunx --dev
```

<div class="paper warning">
  I am an <em>npm</em> fan but in a <em>Framer X</em> project I am going to use <em>yarn</em>. Both will get the job done.
</div>

Then add a `sass` script in *package.json*

```json
"scripts": {
  "sass": "node-sass --include-path node_modules sass/app.scss > code/app.css"
}
```

And run it

```bash
yarn sass
```

It creates a *code/app.css* file, and here it is the trick! Create a *code/loadStyles.js* file with the following content

```js
const id = 'app-css'

function loadStyles () {
  const css = document.createElement('link')
  css.href = './app.css'
  css.id = id
}

if (document.getElementById(id) === null) loadStyles()
```

And you are done, *Framer X* will import the Sass build under the hood.

<div class="paper info">
 You can use any file name, just create a <em>dot js</em> file in the <em>code</em> folder.
</div>

## Create a component

I started creating a *Button* component, *Framer X* generated a *code/Button.tsx* file I could edit to get the following

```js
import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"
import * as Tx from "trunx"

export function Button({ isPrimary, text, ...props }) {
    return (
        <Frame {...props}>
            <Tx.Button isPrimary={isPrimary}>{text}</Tx.Button>
        </Frame>
    )
}

Button.defaultProps = {
    isPrimary: false,
    text: "Click me",
}

addPropertyControls(Button, {
    isPrimary: {
        title: "Primary",
        type: ControlType.Boolean,
        defaultValue: false,
    },
    text: {
        title: "Text",
        type: ControlType.String,
        defaultValue: "Hello Framer!",
    },
})
```

<div class="paper warning">
  You may need to restart <em>Framer X</em> in case during the steps above you see an error message in the canvas.
</div>

## Conclusion

*Framer X* looks really promising, I just started and even if usually I am picky it looks this is an awesome tool and it is worth to spend time learning it.

