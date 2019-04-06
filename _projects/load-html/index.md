---
title: load-html
npm: true
---
# load-html

> include HTML code inside HTML pages using a custom tag `load-html` to load content dynamically

[Features](#features) |
[Usage](#usage) |
[API](#api) |
[Annotated source](#annotated-source) |
[License](#license)

## Features

* Load HTML snippets from remote URLs, recursively.
* Can be used to load Web Components, as an alternative to HTML imports: see [Web Components Template example](https://github.com/fibo/load-html/tree/master/examples/webcomponents-template).
* Supports IE 10.

## Usage

See [usage example folder](https://github.com/fibo/load-html/tree/master/examples/usage) or read below.

Start with your *index.html*

```html
<!doctype html>
<html>
  <head>
    <title>load-html usage example</title>
  </head>
  <body>
    <load-html src="helloWorld.html">Loading...</load-html>
  </body>
</html>
```

Content inside `<load-html>` custom HTML tag is optional.

Create files *helloWorld.html* and *linkToHomepage.html* in the same folder.

```html
<!-- helloWorld.html -->

<h1>Hello World</h1>

<load-html src="linkToHomepage.html"></load-html>
```

```html
<!-- linkToHomepage.html -->

<p>
  This content was loaded by <a href="https://g14n.info/load-html">load-html</a>.
</p>
```

Import `loadHtml` function some how, for example, add the following tag
to your *index.html*:

```html
<script src="https://unpkg.com/load-html"></script>
```

Then invoke it on window load, for instance add the following snippet to your *index.html*:

```html
<script>
  window.addEventListener('load', function () {
    loadHtml();
  })
</script>
```

## API

### `loadHtml(callback)`

You can pass an **optional** callback function as argument:

* It will be executed when `<load-html />` nodes are loaded.
* Loaded nodes will be passed as first argument.
* Note that loading is recursive, hence callback function could be executed more than once.

```html
<script>
  window.addEventListener('load', function () {
    loadHtml(function (nodes) {
      console.log('load-html nodes loaded: ' + nodes.length)
    });
  })
</script>
```

**NOTA BENE** The `nodes` argument passed to callback is a [NodeList](https://developer.mozilla.org/docs/Web/API/NodeList).

> Although `NodeList` is not an `Array`, it is possible to iterate over it with `forEach()`

For example, using something like `nodes.filter(node => !node.getAttribute('error'))` will fail.

However you may want to filter those nodes that did not loaded correctly. Do something like

```html
<script>
  window.addEventListener('load', function () {
    loadHtml(function (nodes) {
      nodes.forEach(node => {
        if (node.getAttribute('error')) {
          return
        }

        // Do something with your node...
      })
    });
  })
</script>
```

## Annotated source

Start with attribution comment: web site and license.

```javascript
// https://g14n.info/load-html
// License: MIT
```

Just define a global *loadHtml* function.

```javascript
function loadHtml (callback) {
```

Select all `<load-html />` tags. Note the **loaded** attribute is used to achieve recursive loading.

```javascript
  var nodes = document.querySelectorAll('load-html:not([loaded])');
  var toBeLoaded = nodes.length;
```

Fetch the HTML content for each node.

```javascript
  nodes.forEach(function (node) {
    try {
      var loader = new XMLHttpRequest();
      loader.addEventListener('load', function loadHtml () {
        if (loader.status == 200) {
          node.innerHTML = loader.responseText;
        }
        node.setAttribute('loaded', true);
```

Keep track of number of DOM nodes loaded, then try to repeat recursively. Invoke *callback*, if any.

```javascript
        toBeLoaded--;
        if (toBeLoaded == 0) {
          if (typeof callback == 'function') {
            callback(nodes)
          }

          loadHtml(callback);
        }
      });
```

Send request to fetch content.

```javascript
      loader.open('GET', node.getAttribute('src'), true);
      loader.send();
```

Store error, mark include as loaded.

```javascript
    } catch (e) {
      console.error(e);
      node.setAttribute('error', e);
      node.setAttribute('loaded', true);
    }
  })
}
```

Export it as a global function.

```javascript
window.loadHtml = loadHtml;
```

## License

[MIT](http://g14n.info/mit-license)
