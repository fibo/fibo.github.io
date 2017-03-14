---
title: Node ecosystem
tags:
  - Node
description: >
    I annotate here links, resources and people about Node world.
---

For sure you know [node](http://nodejs.org/) and [npm](https://npmjs.org/) sites.

Despite it is so young, node ecosystem is pretty rich!

## Popular packages and frameworks

[Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs)
: A curated list of delightful Node.js packages and resources.

### Automation

> Build tools and task runners

[Gulp](http://gulpjs.com/)

[Grunt](http://gruntjs.com/)

[Fez](http://fez.github.io/)

[Broccoli](https://github.com/broccolijs/broccoli)

[gobble](https://github.com/gobblejs/gobble)

[fly](https://git.io/fly)

### Module bundlers

[Browserify](http://browserify.org/)
: Browserify lets you require('modules') in the browser by bundling up all of your dependencies. See also [browserify-cdn](http://wzrd.in/)

[Webpack](https://webpack.github.io/)
: A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the application on demand. Through "loaders" modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff.

[rollup](http://rollupjs.org/)
: the next-generation JavaScript module bundler

### Web

[Express](http://expressjs.com/)
: Web application framework.

[hapi](http://hapijs.com/)
: A rich framework for building applications and services

[restify](http://restify.com/)
: node.js REST framework specifically meant for web service APIs

[Sails.js](http://sailsjs.org/)
: Realtime MVC framework.

[MEAN.io](http://www.mean.io/)
: A boilerplate that provides a nice starting point for MongoDB, Node.js, Express, and AngularJS based applications.

[DocPad](http://docpad.org/)
: Streamlined web development

[Socket.IO](http://socket.io/)
: The cross-browser WebSocket for realtime apps.

[Primus](https://github.com/primus/primus)
: Abstraction layer for real-time to prevent module lock-in

[Apache Cordova](http://cordova.apache.org/)
: A platform for building native mobile applications using HTML, CSS and JavaScript.

[Helmet](https://github.com/helmetjs/helmet)
: Help secure Express apps with various HTTP headers.

### Documentation

[Docco](http://jashkenas.github.io/docco/)
: Is a quick-and-dirty documentation generator.

[dox](https://github.com/visionmedia/dox)
: JavaScript documentation generator for node using markdown and jsdoc.

[Gitbook](http://www.gitbook.io/)
: Build beautiful programming books and exercises using GitHub/Git and Markdown.

[YUIDoc](http://yui.github.io/yuidoc/)
: JavaScript Documentation Tool

### CLI

[nopt](https://www.npmjs.com/package/nopt)
: option parser used by npm CLI

[Commander](http://visionmedia.github.io/commander.js/)
: A light-weight, expressive, and powerful command-line framework for node.js.

[cli-table](https://github.com/LearnBoost/cli-table)
: Pretty unicode tables for the CLI with Node.JS.

### Test

[testling](https://testling.com/)
: Run your browser tests on every push

[mocha](http://visionmedia.github.io/mocha/)
: simple, flexible, fun, feature-rich test framework

[should](https://www.npmjs.org/package/should)
: BDD style assertions for node.js -- test framework agnostic

[Vows](http://vowsjs.org/)
: Asynchronous behaviour driven development for Node

[intern](http://theintern.io/)
: A next-generation JavaScript testing stack

### Other

[n](https://github.com/tj/n)
: Node version management

[localtunnel](http://localtunnel.me/)
: expose yourself to the world

[ShellJS](http://documentup.com/arturadib/shelljs)
: Portable Unix shell commands for Node.js

[async](https://www.npmjs.org/package/async)
: Higher-order functions and common patterns for asynchronous code

## People

<!-- Only GitHub profile pages -->

[Ryan Dahl](https://github.com/ry)

[substack](https://github.com/substack)

[TJ Holowaychuk](https://github.com/visionmedia)

[isaacs](https://github.com/isaacs)

## Sites

[Node weekly news and articles](http://nodeweekly.com/)

[Felix's Node.js Guide](http://nodeguide.com/)

[Node.js modules](https://nodejsmodules.org)

[Node Frameworks](http://nodeframework.com/)
: Hand-picked registry of Node.js frameworks

[Node webmodules](http://nodewebmodules.com/)
: A collection of web frameworks for Node.js

## Articles, tutorials and others resources

[Ryan Dahl: Introduction to Node.js (video)](http://www.youtube.com/watch?v=M-sc73Y-zQA)
: [slides](http://nodejs.org/cinco_de_node.pdf)

[Original Node presentation](http://www.youtube.com/watch?v=ztspvPYybIY)

[Jade Syntax Documentation](http://naltatis.github.io/jade-syntax-docs/)

[Creating and publishing a node.js module](http://quickleft.com/blog/creating-and-publishing-a-node-js-module)

[Generators in Node.js: Common Misconceptions and Three Good Use Cases](http://strongloop.com/strongblog/how-to-generators-node-js-yield-use-cases/)

[Node.js: managing child processes](http://tech.pro/tutorial/2074/nodejs-managing-child-processes)

[Better logging in Node.js](https://medium.com/on-coding/better-logging-in-node-js-b3cc6fd0dafd)
: Add context to your log messages

[Cross platform JavaScript with Browserify – Sharing Code Between Node.js and the Browser](https://blog.codecentric.de/en/2014/02/cross-platform-javascript/)

[Command-line utilities with Node.js](http://cruft.io/posts/node-command-line-utilities/)

[Using Node.js in Production](http://flippinawesome.org/2014/06/23/using-node-js-in-production/)

[Error Handling in Node.js](http://www.joyent.com/developers/node/design/errors)

[P2P workshop](https://p2p-workshop.mafintosh.com)
: by [mafintosh](https://mafintosh.com)

[10 Habits of a Happy Node Hacker (2016)](http://blog.heroku.com/archives/2015/11/10/node-habits-2016)

### Streams

[Node Streams: How do they work?](http://maxogden.com/node-streams)

[An Introduction to Node's New Streams](http://calv.info/an-introduction-to-nodes-new-streams/)

[Stream handbook](https://github.com/substack/stream-handbook)

[An Introduction to Node Streams (video)](http://tagtree.tv/intro-to-node-streams)
: In 8 minutes, Hendrik Swanepoel demonstrates how to create your own read, write, and transform stream, complete with written notes accompanying the video.

[Node.js Stream Playground](http://ejohn.org/blog/node-js-stream-playground/)
: Created by [John Resig][1] to help Node.js developers better understand how streams work by showing a number of use cases that are easily plug-and-play-able.

### Security

[Building Secure Node.js Applications](http://blog.safaribooksonline.com/2014/03/12/building-secure-node-js-applications/)

[Node.js Security Tips](http://blog.risingstack.com/node-js-security-tips/)

### Async/await

[The 80/20 Guide to Async/Await in Node.js](http://thecodebarbarian.com/80-20-guide-to-async-await-in-node.js.html)

### Promises

[Promise nuggets](http://promise-nuggets.github.io/)

## Paas hosting

[heroku](https://www.heroku.com/)

[nodejitsu](https://www.nodejitsu.com/)

[cloudno.de](http://cloudno.de/)

  [1]: http://ejohn.org/ "John Resig"

