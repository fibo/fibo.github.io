---
title: React Semantic-UI customized
tags:
  - React
description: >
    React and Semantic-UI are awesome! This article describes step by sted how to use them together and create a custom build.
---

## Goal

[Semantic-UI] is really a great piece of software and recently was released

> The official Semantic-UI-React integration

[![Semantic-UI-React](http://react.semantic-ui.com/logo.png)][Semantic-UI-React]

What I need is to use React components provided by integration, but, using
a customized look&feel. My theme name is called, for instance, **beintoo**.

## How to build

Install gulp globally

```bash
npm install gulp -g
```

Install [Semantic-UI] and follow interactive instructions

```bash
npm install semantic-ui --no-save
```

I **recommend** to use a `--no-save` flag here, otherwise everytime you
will run `npm install` you will be prompted into the interactive setup.
Furthermore, file *semantic.json* will be generated with a `version` attribute.

Create a *beintoo* theme and customize it

```bash
cp -R semantic/src/themes/default/ semantic/src/themes/beintoo/
```

In particular, I started changing some color in *semantic/src/themes/beintoo/globals/site.variables*.

If you are not going to use the *flags* component you can remove the *images/flags.png*
from your assets: this will save ~27kb.

```bash
rm semantic/src/themes/beintoo/assets/images/flags.png
```

Just make sure you do not select it during setup.

![Semantic interactive setup](/images{{ page.id }}/semantic_setup.png){:.responsive}

Another important trick to get started is to change images and fonts path

```diff
-@imagePath : '../../themes/default/assets/images';
-@fontPath  : '../../themes/default/assets/fonts';
+@fontPath  : '../../themes/beintoo/assets/fonts';
+@imagePath : '../../themes/beintoo/assets/images';
```

Configure build to use *beintoo* theme, editing file *semantic/src/theme.config*. You can change
*default* to *beintoo*, for example using vi with this command

```bash
vi semantic/src/theme.config +%s/default/beintoo/g
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
git add semantic/dist/themes/beintoo
# build files
git add semantic.json
git add -f semantic/src/theme.config
git add -f semantic/src/themes/beintoo/
```

Edit your *.gitignore*.

```bash
cat <<GITIGNORE >> .gitignore

# Semantic custom files and dist.
!semantic/src/theme.config
!semantic/src/themes/beintoo/
!semantic/dist/semantic.min.css
!semantic/dist/themes/beintoo/
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
semantic/dist/themes/beintoo/
```

must be served statically.

## You are done

Now that you have your custom CSS assets built with [Semantic-UI] you just need to do

```bash
npm install semantic-ui-react --save-dev
```

and start using [Semantic-UI-React] that is really cool, trust me!
As a bonus, you don't need jQuery to make your [React] components work
with [Semantic-UI].

[React]: https://facebook.github.io/react/ "React"
[Semantic-UI]: http://semantic-ui.com/ "Semantic UI"
[Semantic-UI-React]: http://react.semantic-ui.com/ "Semantic UI React"
