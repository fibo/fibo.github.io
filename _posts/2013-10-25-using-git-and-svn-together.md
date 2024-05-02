---
title: Using git and svn together
tags:
  - Git
description: >
    This is a quick and dirty way to version a folder using svn and git at the same time.
---

## The problem

I have svn `version 1.6.11`, that means it creates a `.svn` folder in each subfolder

> **bleah!**

but I need to use svn cause is the official versioning tool at my job place.

I would like to use git, cause I feel more comfortable specially when working with branches.

## My solution

Start with svn, checkout your repository.

```bash
svn co http://url/to/my/svn/repo
```

Tell svn to ignore git files

```bash
cd repo
svn propedit svn:ignore .
```

and add the following entries

```
.git
.gitignore
```

Tell git to ignore svn, create a *.gitignore* file with this content

```
.svn
```

Now create your git repository

```bash
git init
```

Of course, don't forget to run, at least once

```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```

Now you can start working on your git repository, first of all, add *.gitignore* file.

```bash
git add .gitignore
git commit -m 'added .gitignore'
```

or even, if you just want to add every file in the svn repo

```bash
git commit -am 'init repo'
```

## Follow this rule

The only rule you should keep is to **use only the master branch** in this svn+git folder. If you want to use your git workflow you may want to clone the repo locally.

So if you want to clone the repo do

```bash
git clone /path/to/svn+git/repo /path/to/git/repo
cd /path/to/svn+git/repo
git remote add upstream /path/to/git/repo
```

Then go to `/path/to/git/repo` folder and start coding, using your favourite git branch model.

When you want to commit back to svn do

```bash
cd /path/to/svn+git/repo
git pull upstream master
svn add .
svn commit -m 'blah blah ...'
```

Note that you cannot push from `/path/to/git/repo` to `/path/to/svn+git/repo` cause it is not a bare git repository.

## Conclusion

Both git and svn will ignore each other and everything will *just work*.
Use Git to develop, then commit to a Subversion server and at the end, everyone <sup>[1](#footnote1)</sup> is happy!

<a name="footnote1">1</a>: Everyone means *me* and my *boss* :).
