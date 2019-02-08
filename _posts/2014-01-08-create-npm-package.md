---
title: Create an npm package
tags:
  - Node
description: >
    Ok, you ❤ Node! but, how to create an npm package?
---

## Get an account

Do you have an npm account? If not, create it on [npm site][npm], then run

```bash
npm login
```

insert your authentication credentials, and you are ready to start!

## Start with a GitHub repository

This is your choice, but, if you want to follow what seems to be a *de facto* standard in Node community, use [GitHub]!

### About the package name

I assume the repo and the package have the same name.

<div class="paper warning">Note that npm will <strong>not</strong> accept uppercase letters in package names.</div>

I use only letters, numbers, and hyphens. No *-js* suffix.

### Create your repo on GitHub first

Create a new repository, for instance *tris3d*

* clear your mind and choose a **good** name
* add a description, it should be almost the same than the npm package description
* check the *README flag*
* add a *Node* .gitignore

![create repo](/images{{ page.id }}/new-GitHub-repo.png){:.responsive}

Ok, this is the **next level**. Use [git hub](https://github.com/ingydotnet/git-hub) to

1. Create report from command line
2. Add a description
3. Add an homepage

```bash
git hub repo-new tris3d
git hub repo-edit tris3d description "is a cool package"
git hub repo-edit tris3d homepage "http://npm.im/tris3d"
```

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
: make it easy to find your package on [npm site][npm]

author
: use your npm nick

See [npm's package.json specifics](https://docs.npmjs.com/files/package.json) to know about what's required in your *package.json* file, and the meaning of every attribute.


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
$ npm test
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
  "url": "http://g14n.info/mit-license"
} ],
```

### Add an homepage

It is also a good idea to add a link to your project homepage, so it will showed by [npm site][npm].

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

You can tell npm which files to ignore adding a *.npmignore* file, the syntax is the same as the *.gitignore*.

I use to start with this content

```
.travis.yml
docs/
```

## See also

* [npm-developers]


[npm]: https://npmjs.org/
[npm-developers]: https://docs.npmjs.com/misc/developers
[GitHub]: https://github.com/
