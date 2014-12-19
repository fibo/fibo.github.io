---
title: Bare git server
tags:
  - Git
description: >
    How to setup a git server, structured like GitHub. No web interface.
---

<div class="alert alert-info">This is a <strong>naïve</strong> implementation. Probably will be improved in the future. I really don't know how it is implemented GitHub backend and I don't pretend to achieve such a level of complexity. I only need a simple structure of a server where I host some git repos.</div>

<div class="alert alert-warning">This article does <strong>not</strong> contain web interface setup instructions.</div>

## Structure

I really like [GitHub][2] structure! It is a three level hierarchy:

1. A **server**, ehm [github.com][2].
2. Server's **users**, for example [fibo][3].
3. User's git **repos**, like [this][4].

It keeps everything clean specially when collaborative coding lead to fork repos: basically, it let coexist *cnorris/repofoo* fork of *jsmith/repofoo*.

## How to

In your Unix server *gitbox.example.org*, create user *jsmith*. Keep in mind that a user is just the second level of the tree. It can be a real person, an organization, or whatever groups a set of repos. For example I use to create a *user* for everyone of my customers, but, it could make sense also to create a user for every project.

In Unix context, a *user* will own a home folder: usually `/home/jsmith`. This folder will contain user's git repos.

### Create master git repo

On *gitbox.example.org*, as *jsmith* user, create a *repofoo* git repo.
The trick is to create a *bare* git repo, in order to be able to push to it.

```bash
$ cd
$ mkdir repofoo.git
$ cd repofoo.git
$ git init --bare
```

### Clone repo locally

Now on your laptop, or any other host you will use for development, you can clone repo via ssh.
I like to reflect the same [tree structure](#structure) also on folders, so in my laptop I do

```bash
$ cd
$ mkdir -p gitbox.example.org/jsmith
$ cd gitbox.example.org/jsmith
```

then I clone *repofoo* with

```bash
$ git clone jsmith@gitbox.example.org:~/repofoo.git
```

### Port local repo on server

A common scenario is init a repo locally, and then put it on git server lately.
First [create master git repo](#create-master-git-repo), *repobar* for instance.
I assume you already created *repobar* locally with `git init`.
Then go into your local *repobar* folder and add the **remote origin**.

```bash
$ cd ~/gitbox.example.org/jsmith/repobar
$ git remote add origin jsmith@gitbox.example.org:~/repofoo.git
```

Now you can push *repobar* commits from your laptop to *gitbox.example.org*


## See also

* [Git resources]({% post_url 2014-03-16-git-resources %})

## References

[Git on the Server][1]

  [1]: http://git-scm.com/book/en/Git-on-the-Server-Setting-Up-the-Server "Git on the Server"
  [2]: https://github.com/ "GitHub"
  [3]: https://github.com/fibo "fibo@github.com"
  [4]: {{ site.repo }} "{{ site.url }}"

