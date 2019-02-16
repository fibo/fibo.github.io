---
title: npm-start-command
npm: true
---
# npm-start-command

> creates a file you can double click to launch npm start

[Usage](#usage) |
[License](#license)

<img src="https://g14n.info/os-icons8/Apple-50.png" width="50" height="50" />
<img src="https://g14n.info/os-icons8/Windows8-50.png" width="50" height="50" />

## Usage

Assumptions:

0. You *are a* (or *work with a*) designer who want to launch a server to develop cool webapps.
1. You have [Node.js](https://nodejs.org/en/) installed.
2. Your working folder contains a [package.json](https://docs.npmjs.com/files/package.json). If there is no *package.json* yet, you can create it with `npm init -y`.
3. Your *package.json* contains a `start` script


Install command with

```bash
npm install npm-start-command --save-dev
```

This will create two files:

- *_MacOS.npm-start.command*
- *_Windows.npm-start.bat*

### MacOS

Click on file *_MacOS.npm-start.command* , your development server will be launched.

### Windows

Click on file *_Windows.npm-start.bat* , your development server will be launched.

## License

[MIT](http://g14n.info/mit-license/)

<sub>OS icons provided by <a href="https://icons8.com/">icons8</a>.</sub>
