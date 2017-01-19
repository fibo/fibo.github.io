---
title: npm-start-command
---
# npm-start-command

> creates a file you can double click to launch npm start

[Usage](#usage) |
[License](#license)

<img src="https://rawgit.com/fibo/os-icons8/master/Apple-50.png" width="50" height="50" />

## Usage

Assumptions:

0. You *are a* (or *work with a*) designer who want to launch a server to develop cool webapps.
1. You have [Node.js](https://nodejs.org/en/) installed.
2. Your working folder contains a [package.json](https://docs.npmjs.com/files/package.json). If there is no *package.json* yet, you can create it with `npm init -y`.
3. You can open a *Terminal* into your working folder and copy and paste commands into it.
4. Your *package.json* contains a `start` script


Install command with

```bash
npm install npm-start-command --save-dev
```

It will create a *start.command* file, if you click on it.

**TODO**:

* support Linux and Windows too.
* review installation process, make it easier: just download *npm-start.command* which contains `npm init -y` and `npm install`.
* link to [zeroconf-redux] and [x3dom-livereload].

## License

[MIT](http://g14n.info/mit-license/)

<sub>OS icons provided by <a href="https://icons8.com/">icons8</a>.</sub>

[zeroconf-redux]: http://g14n.info/zeroconf-redux
[x3dom-livereload]: http://g14n.info/x3dom-livereload
