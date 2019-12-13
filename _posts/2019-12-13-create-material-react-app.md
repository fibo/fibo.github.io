---
title: Create a Material React app
tags:
  - Web
  - JavaScript
  - React
description: >
     How to use create-react-app with Material web components.
---

<div class="paper warning">
  **This article is a WIP**
</div>

## Getting started

<div class="paper info">
  Source code is available here: [fibo/material-react-app](https://github.com/fibo/material-react-app).
</div>

[Material](https://material.io) is a beautiful and open source design system, by Google.
There are some unofficial and popular packages implementing Material with React but now there is an official one: [Material Components for React (MDC React)](https://github.com/material-components/material-components-web-react)

[Create React App (CRA)](https://create-react-app.dev/) is the official React development tool and let you

> Set up a modern web app by running one command.

Let's create a webapp that uses both Material and React, plus [TypeScript](https://www.typescriptlang.org/).

Create a react app with TypeScript template.

```bash
npx create-react-app material-react-app --template typescript
cd material-react-app
yarn start
```

If everything went well your browser will open and you can start coding and see changes live thanks to awesome livereload.

*CRA* creates also a git repo, I am going to push it on GitHub. Of course, you are going to use a different repo name and URL. For instance

```bash
git remote add origin git@github.com:fibo/material-react-app.git
git push -u origin master
```

We are going to add *Sass*, since it is used by Material for theme customization and it is also supported by *CRA*. Launch commands

```bash
yarn add node-sass
git mv src/App.css src/App.scss
```

Then update style import in your *src/App.tsx*

```diff
-import './App.css';
+import './App.scss';
```
