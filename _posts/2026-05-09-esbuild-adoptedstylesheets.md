---
title: Esbuild adoptedStylesheets plugin
tags:
  - Node
  - Web
description: >
     A plugin to load adoptedStylesheets in esbuild
---

You can create a style sheet with `CSSStyleSheet` then push it in to the [document.adoptedStylesheets](https://developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets) or into a Web Component `shadowRoot`. This is a very promising technique I started using both on side projects and in production but I really do not like to have CSS into JS files in particular embedded with backticks that makes the JS bundle hard to minify.

In general I have this principle:

> Put foo code into .foo files

Inline code can be useful sometimes but it should be avoided in most of the cases. In this case I want CSS in .css files, so for example you can lint it.

I am also using [esbuild](https://esbuild.github.io/) a lot, I like it for so many reasons even if there are many features that are not supported. The good thing is that it is so flexible and it's very easy to write an esbuild plugin and extend it.

So I wrote this small plugin that loads CSS files into `CSSStyleSheet`. The necessary __convention__ is to have the file named as `*.sheet.css`.

The plugin uses [Lightning CSS](https://lightningcss.dev/) to bundle and transform the CSS, so you can use `@import`, CSS nesting, etc.

For example, this can be a _base.sheet.css_

```css
@import "./reset.css";
@import "./typography.css";
```

And you just need to import it in your web app as any other CSS file

```js
import './base.sheet.css';
```

You can start with the code below for your plugin, you just need to add it to the `plugins` list in the esbuild build options.

Notice that the _CSS nesting_ feature is enabled, you may want to change the _Lightning CSS_ options according to your needs.

```js
import { bundle as bundleCss, transform as transformCss, Features as CssFeature } from 'lightningcss';

/**
 * Load files with extension .sheet.css as adopted stylesheets.
 */
const adoptedStylesheetsLoaderPlugin = {
  name: 'adopted-stylesheets-loader',
  setup(build) {
    build.onLoad({ filter: /\.sheet\.css$/ }, async (args) => {
      const filename = args.path;

      const { code } = await bundleCss({ filename });

      const result = transformCss({
        filename,
        code,
        minify: true,
        errorRecovery: false,
        include: CssFeature.Nesting
      });

      try {
        return {
          contents: `
            const sheet = new CSSStyleSheet();
            sheet.replaceSync(${JSON.stringify(result.code.toString())});
            export default sheet;
          `,
          loader: 'js',
        };
      } catch(error) {
        throw new Error(`CSS error\nfile: ${filename}\n${error.message}`);
      }
    });
  }
}
```
