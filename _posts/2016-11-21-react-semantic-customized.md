---
title: React Semantic-UI customized
tags:
  - React
description: >
    React and Semantic-UI are awesome! This article describes step by sted how to use them together and create a custom build.
---

## Goal

I want to give a nice look&feed to my side project video game [tris3d] which uses [React], [Redux] and [three.js] for its frontend.
[Semantic-UI] is really a great piece of software and recently was released the

> The official Semantic-UI-React integration

[![Semantic-UI-React](http://react.semantic-ui.com/logo.png)][Semantic-UI-React]

What I need is to use React components provided by integration, but, using
a custom css to ha ve a customizable look&feel.

## How to build

Install gulp globally

```bash
npm install gulp -g
```

Install [Semantic-UI] and follow interactive instructions

```bash
npm install semantic-ui --save-dev
```

Create a *tris3d* theme and customize it

```bash
cp -R semantic/src/themes/default/ semantic/src/themes/tris3d/
```

In particular, I started changing some color in *semantic/src/themes/tris3d/global/site.variables*.
Another important trick to get started is to change images and fonts path

```diff
-@imagePath : '../../themes/default/assets/images';
-@fontPath  : '../../themes/default/assets/fonts';
+@fontPath  : '../../themes/tris3d/assets/fonts';
+@imagePath : '../../themes/tris3d/assets/images';
```

Configure build to use *tris3d* theme, editing file *semantic/src/theme.config*.

Create a *semantic/.gitignore* to preserve *semantic/* folder and ignore everything except files we need, added to root *gitignore*

```bash
echo \* > semantic/.gitignore
```

```bash
cat <<GITIGNORE >> .gitignore

# Semantic custom files and dist.
!semantic/src/theme.config
!semantic/src/themes/tris3d/
!semantic/dist/semantic.min.css
!semantic/dist/themes/tris3d/
GITIGNORE
```

Enter *semantic/* folder and build it

```bash
cd semantic
gulp build
```

Add dist files, and push

```bash
git add semantic/dist/semantic.min.css
git commit -m 'semantic build'
git push
```

[three.js]: https://threejs.org/ "three.js"
[tris3d]: https://play.tris3d.net "play tic tac toe in 3d"
[React]: https://facebook.github.io/react/ "React"
[Redux]: http://redux.js.org/ "Redux"
[Semantic-UI]: http://semantic-ui.com/ "Semantic UI"
[Semantic-UI-React]: http://react.semantic-ui.com/ "Semantic UI React"
