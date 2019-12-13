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
  This article is a WIP
</div>

## Getting started

<div class="paper info">
  Source code is available here: <a href="https://github.com/fibo/material-react-app" target="_blank">fibo/material-react-app</a>.
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

Finally, add a *.env* file with the following content

```
SASS_PATH=node_modules
```

## Create a Layout

Let's start adding a [dismissible drawer](https://material.io/develop/web/components/drawers/) as well as other few components to create a basic layout with a top navigation bar.

> The navigation drawer slides in from the left and contains the navigation destinations for your app.

Install dependencies

```bash
yarn add @material/react-drawer @material/react-material-icon @material/react-top-app-bar @material/react-list
```

Include Material icons by adding the following to *public/index.html* file

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

Replace the content of *src/App.scss* with the following code

```scss
@import '@material/react-drawer/index.scss';
@import '@material/react-top-app-bar/index.scss';
@import '@material/react-list/index.scss';
@import '@material/react-material-icon/index.scss';

.drawer-container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  overflow: hidden;
}

.drawer-app-content {
  flex: auto;
  overflow: auto;
}
```

Replace the content of *src/App.tsx* with the following code

```javascript
import React, { useState } from 'react';

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle
} from '@material/react-top-app-bar';
import Drawer, {
  DrawerAppContent,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@material/react-drawer';
import MaterialIcon from '@material/react-material-icon';
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText
} from '@material/react-list';

import './App.scss';

export default function App () {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  return (
    <div className='drawer-container'>
      <Drawer dismissible open={drawerIsOpen}>
        <DrawerHeader>
          <DrawerTitle tag='h2'>
            jane.smith@gmail.com
          </DrawerTitle>
        </DrawerHeader>

        <DrawerContent>
          <List singleSelection selectedIndex={selectedIndex}>
            <ListItem>
              <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />

              <ListItemText primaryText='Mail' />
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer>

      <DrawerAppContent className='drawer-app-content'>
        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align='start'>
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon
                  hasRipple
                  icon='menu'
                  onClick={() => setDrawerIsOpen(!drawerIsOpen)}
                />
              </TopAppBarIcon>

              <TopAppBarTitle>Inbox</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>

        <TopAppBarFixedAdjust>
          Your inbox content
        </TopAppBarFixedAdjust>
      </DrawerAppContent>
    </div>
  )
}
```
