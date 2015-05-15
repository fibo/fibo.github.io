---
title: Use ssh instead of sudo
tags:
  - Unix
description: >
    Be indipendent when you switch user.
---

<div class="alert alert-info">This is not a post against <em>sudo</em></div>

## Motivation

> [sudo][1] allows users to run programs with the security privileges of another user

and it is a great piece of software, often used to switch user with

```bash
$ sudo su - userfoo
```

I think it is far better to use ssh command to do that.

* it does not need a **superuser** (a.k.a. root) to enable it and configure it.
* often *sudo* configuration is not done properly and allows to switch to the root user.

## How to

```
alias u='ssh localhost -l'
```

```bash
$ u userfoo
```


  [1]: https://en.wikipedia.org/wiki/Sudo "sudo"

