---
title: load-html
npm: true
---
# load-html

> include HTML code inside HTML pages using a custom tag `load-html` to load content dynamically

[Usage](#usage) |
[Annotated source](#annotated-source) |
[License](#license)

## Usage

Start with your *index.html*

```html
<!doctype html>
<html>
  <head>
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
  innerHtml();
})
</script>
```

## Annotated source

Start with attribution comment: web site and license.

```javascript
// https://g14n.info/load-html License: MIT
```

Just define a global *loadHtml* function.

```javascript
function loadHtml () {
```

Select all `load-html` tags. Note the **loaded** attribute, used to achieve
recursive loading.

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

Keep track of number of DOM nodes loaded, then try to repeat recursively.

```javascript
        toBeLoaded--;
        if (toBeLoaded == 0) {
          loadHtml();
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
