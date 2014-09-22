---
title: Working with git branches
tags:
  - Git
description: >
    Learn how to perform basic tasks with git local and remote branches
---

<div class="alert alert-info">Launch all the commands in this tutorial, from the first to the last, and you will cover almost all operations on branches.</div>

## Clone a repo

First of all, since we are going to talk also about remote branches, you need to clone a repo. For instance, suppose I am cloning a brand new repository I just created on GitHub.

```bash
git clone https://github.com/myuser/mynewrepo.git
cd repo
```

## Show current branch

The first command you need to know in order to use git branches will answer the question

> Which is current branch?

The answer is easy, just launch

```bash
git branch
```

Since this is a new repository you should see only the master branch.

## Create a local branch

Create a new *develop* branch and switch to it

```bash
git checkout -b develop
```

Now you are on *develop* branch, add or edit some file, the README.md for instance, so the below *merge* command will make sense. Use your favourite editor, that is **vim** of course!

Do some modification and commit

```bash
git commit -am 'added repo infos'
```

## Create a remote branch

Just push the local branch to remote *origin*.

```bash
git push origin develop
```

## Change branch

If you want to go back to master branch launch

```bash
git checkout master
```

## Merge two branches

If you want to merge *develop* into master, launch

```bash
git merge develop
```

## Delete a local branch

If you want to delete develop branch locally, launch

```bash
git branch -d develop
```

## Show remote branches

Branch *develop* on remote *origin* still exists, see

```bash
git branch -r
```

## Checkout existing remote branch

When you clone a repo by default `git branch` will show only *master* branch. Suppose you want to work on a remote *develop* branch, launch this to check it out

```bash
git checkout -b develop origin/develop
```

Now you have again a local *develop* branch and it is your **current** branch.

## Update local branch from remote

If you want to fetch last version of your remote *develop* branch and merge it to your local *develop* branch, launch

```bash
git pull origin develop
```

Since in this case there is no difference between remote and local *develop* branch, git will answer with an *Already up-to-date* message.

## Delete a remote branch

Suppose you want to delete *develop* remote branch, launch

```bash
git push origin :develop
```

Note that this will not remove your *develop* local branch.

## See also

* [Git shell Windows tips](http://blog.g14n.info/2014/02/git-shell-windows-tips.html)
* [Git extras on Windows](http://blog.g14n.info/2014/02/git-extras-on-windows.html)

