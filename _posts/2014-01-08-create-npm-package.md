---
title: Create an npm package
tags:
  - Node
description: >
    Ok, you love Node! but, how to create an npm package?
---

## Get an account

Do you have an npm account? If not, create it on [npm site][1], then run

```
$ npm login
```

insert your authentication credentials, and you are ready to start!

## Start with a GitHub repository

This is your choice, but, if you want to follow what seems to be a *de facto* standard in Node community, use [GitHub][2]!

### About the package name

I assume the repo and the package have the same name.

<div class="alert alert-warning">Note that npm will <strong>not</strong> accept uppercase letters in package names.</div>

I use only letters, numbers, and hyphens. No *-js* suffix.

### Create your repo on GitHub first

Create a new repository, for instance *tris3d*

* clear your mind and choose a **good** name
* add a description, it should be almost the same than the npm package description
* check the *README flag*
* add a *Node* .gitignore

![create repo][3]

### Create your npm package locally

Now clone your repo locally, for instance

```bash
git clone git@github.com:fibo/tris3d.git
cd tris3d
```

 and create an npm package.
 
## Create a package.json

From your repo folder, just run

```bash
npm init
```

This will create a *package.json* file. You can also just hit enter and accept defaults, since you can edit the *package.json* file later. Anyway it is a good idea to edit at least the following entries

description
: can be almost the same as the GitHub repo description

keywords
: make it easy to find your package on [npm site][4]

author
: use your npm nick

See [npm's package.json specifics][5] to know about what's required in your *package.json* file, and the meaning of every attribute.


### Do you want to be public?

One important bit you should aware of, is that if you want to be sure that your package will not be published on the npm registry, you should add this to your *package.json* file.

```json
"private": true,
```

### Edit the test command

I use to edit the *package.json* file to use mocha for running tests, so I remove the default

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

and I add the following content

```json
"scripts": {
    "test": "mocha --bail --require should --reporter nyan"
  },
```

so the command

```bash
npm test
```

will run tests using mocha and the [nyan cat](http://www.nyan.cat/), that makes me very happy **:^)**

### Specify a license

I use to edit the *package.json* file to specify my own license, so I remove the default

```json
"license": "BSD",
```

and I add the following content

```json
"license": [ {
  "type": "MIT",
  "url": "http://fibo.mit-license.org/"
} ],
```

### Add an homepage

It is also a good idea to add a link to your project homepage, so it will showed by [npm site][6].

```json
"homepage": "http://g14n.info/tris3d",
```

## Do your first commit

Ok, now that your *package.json* is ready, you can do your first git commit and start coding!

```bash
git add package.json
git commit -m 'npm init'
git push origin master
```

## Add a *.npmignore* file

You can tell npm wich files to ignore adding a *.npmignore* file, the syntax is the same as the *.gitignore*.

I use to start with this content

```
.travis.yml
docs/
```

## See also

* [npm-developers][7]

### Other articles

* [Node ecosystem](http://g14n.info/2014/01/node-ecosystem)
* [Install Node.js without sudo](http://g14n.info/2013/01/install-nodejs-without-sudo)
* [Livereload with grunt](http://g14n.info/2013/12/livereload-with-grunt)
* [Badges everywhere](http://g14n.info/2014/01/badges-everywhere)
* [NodeICO badges](http://g14n.info/2013/12/nodeico-badges)
* [Node class template](http://g14n.info/2014/01/node-class-template)


  [1]: https://npmjs.org/
  [2]: https://github.com/
  [3]: https://lh4.googleusercontent.com/Y0V5ArmaIFawdLp8SqVShPPzNzy5wonuLVsqeaBFdBE=s0 "New GitHub repo"
  [4]: https://npmjs.org/
  [5]: https://npmjs.org/doc/json.html
  [6]: https://npmjs.org/
  [7]: https://www.npmjs.org/doc/misc/npm-developers.html

