---
title: x3dom-livereload
---
# x3dom-livereload

> is an [x3dom] tiny boilerplate with a [livereload] server

## How to

First install [Node.js][node]. Then copy and paste the following code into a terminal

```bash
npm install x3dom-livereload
node_modules/.bin/budo -lo
```

First command will install *x3dom-livereload*. An *index.html* will be
created, on *postinstall*, if it does not exists: it is a minimal starting
point with an [x3dom] cube.
Second command will start a server and open your browser. You should see this

![HelloX3DOM](https://cdn.rawgit.com/fibo/x3dom-livereload/master/media/HelloX3DOM.png)

Play with [x3dom] and every time you save the *index.html* your 3d scene will be updated
magically without reloading your browser, thanks to [livereload].

## License

[MIT](http://g14n.info/mit-license)

[x3dom]: http://www.x3dom.org/ "x3dom"
[livereload]: http://livereload.com/ "livereload"
[node]: https://nodejs.org/ "Node.js"
