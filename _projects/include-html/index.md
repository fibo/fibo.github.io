---
title: include-html
npm: true
---
# include-html
include HTML code inside HTML pages using a custom tag `include-html` to load content dynamically

## Usage

Start with your *index.html*

```html
<!doctype html>
<html>
  <head>
  </head>
  <body>
    <include-html src="helloWorld.html">Loading...</include-html>
  </body>
</html>
```

Content inside `<include-html>` custom HTML tag is optional.

Create an *helloWorld.html* file in the same folder

```html
<h1>Hello World</h1>
```

Import `includeHtml` function some how, for example, add the following tag
to your *index.html*:

```html
<script src="https://unpkg.com/include-html"></script>
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
// https://g14n.info/include-html License: MIT
```

Just define a global *includeHtml* function.

```javascript
function includeHtml () {
```

Select all `include-html` tags. Note the **loaded** attribute, used to achieve
recursive loading.

```javascript
  var nodes = document.querySelectorAll('include-html:not([loaded])');
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
        } else {
          node.setAttribute('status', loader.status);
        }

        node.setAttribute('loaded', true);
```

Keep track of number of DOM nodes loaded, then try to repeat recursively.

```javascript
        toBeLoaded--;
        if (toBeLoaded == 0) {
          includeHtml();
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
```

End of function, code is not exported nor minified.

```javascript
}
```
