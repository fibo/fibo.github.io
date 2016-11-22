---
title: React Semantic-UI customized
tags:
  - React
  - Semantic-UI
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
npm install semantic-ui
```

I do not recommend to use a `--save-dev` flag here, otherwise everytime you
will run `npm install` you will be prompted into the interactive setup.
Furthermore, file *semantic.json* will be generated with a `version` attribute.

Create a *tris3d* theme and customize it

```bash
cp -R semantic/src/themes/default/ semantic/src/themes/tris3d/
```

In particular, I started changing some color in *semantic/src/themes/tris3d/globals/site.variables*.

If you are not going to use the *flags* component you can remove the *images/flags.png*
from your assets: this will save ~27kb.

```bash
rm semantic/src/themes/tris3d/assets/images/flags.png
```

Just make sure you do not select it during setup.

![Semantic interactive setup](/images{{ page.id }}/semantic_setup.png)

Another important trick to get started is to change images and fonts path

```diff
-@imagePath : '../../themes/default/assets/images';
-@fontPath  : '../../themes/default/assets/fonts';
+@fontPath  : '../../themes/tris3d/assets/fonts';
+@imagePath : '../../themes/tris3d/assets/images';
```

Configure build to use *tris3d* theme, editing file *semantic/src/theme.config*. You can change
*default* to *tris3d*, for example using vi with this command

```bash
vi semantic/src/theme.config +%s/default/tris3d/g
```

Create a *semantic/.gitignore* to preserve *semantic/* folder and ignore everything except files we need, added to root *gitignore*

```bash
echo \* > semantic/.gitignore
git add -f semantic/.gitignore
```

Enter *semantic/* folder and build assets and CSS. You don't need to build JavaScript modules cause those
[Semantic-UI] features are provided by [Semantic-UI-React].

```bash
cd semantic
gulp build-css
gulp build-assets
cd ..
```

Add to versioning dist files and other files needed to build.

```bash
# dist files
git add semantic/dist/semantic.min.css
git add semantic/dist/themes/tris3d
# build files
git add semantic.json
git add -f semantic/src/theme.config
git add -f semantic/src/themes/tris3d/
```

Edit your *.gitignore*.

```bash
cat <<GITIGNORE >> .gitignore

# Semantic custom files and dist.
!semantic/src/theme.config
!semantic/src/themes/tris3d/
!semantic/dist/semantic.min.css
!semantic/dist/themes/tris3d/
GITIGNORE
```

To force setup to run again, you can launch

```bash
rm -rf semantic/src/definitions/
npm explore semantic-ui gulp install
```

Note that the dist folder *semantic/dist* can be configured in your *semantic.json* during
interactive setup. For example you could use a *public* folder, since files

```
semantic/dist/semantic.min.css
semantic/dist/themes/tris3d/
```

must be served statically.

## You are done

Now that you have your custom CSS assets built with [Semantic] you just need to do

```bash
npm install react-semantic-ui --save-dev
```

and start using [Semantic-UI-React] that is really cool, trust me! As a bonus, you don't need jQuery
to make your [React] components work with [Semantic-UI].

[three.js]: https://threejs.org/ "three.js"
[tris3d]: https://play.tris3d.net "play tic tac toe in 3d"
[React]: https://facebook.github.io/react/ "React"
[Redux]: http://redux.js.org/ "Redux"
[Semantic-UI]: http://semantic-ui.com/ "Semantic UI"
[Semantic-UI-React]: http://react.semantic-ui.com/ "Semantic UI React"
