---
title: Learning Golang
tags:
  - Go
  - Programming
description: >
    I want to play with the Go Programming Language! This is my learning path.
---

## Motivation

I remember when [Go][1] was announced on november 2009. It was really interesting, also because it is nice to follow a project since the beginning. But I decided to learn it only at the time of this writing.

It has interesting features, a clean ecosystem, it runs on GAE: it is very attractive!

## Setup

### Installation

Get your installer from [Go Downloads][2].

### Environment

Create or edit the following environment variables

GOROOT
: the path to your [Go][1] installation

GOPATH
: see [here](http://golang.org/doc/code.html#GOPATH)

PATH
: edit it to find the *go* binary in your *PATH*

For instance, on Windows I add the environment variables 

* `GOROOT=C:\Go`
* and `GOPATH=%USERPROFILE%\GOPATH`, 
* then I edit  `PATH` adding  `%GOROOT%\bin;%GOPATH%\bin;`.

Don't forget to create *GOPATH* folder

For instance, open an *MS-DOS* prompt and launch

```
C:\> mkdir %GOPATH%
```

### Vim integration

Golang is intgrated with Vim by its creators. See *Go* section in [my Vim configuration]({% post_url 2013-07-26-my-vim-configuration %}#go).

## Code 30 minutes everyday

Inspiered by [Why Go is elegant and makes my code elegant](http://filippo.io/why-go-is-elegant-and-makes-my-code-elegant/) and [Write code everyday](http://ejohn.org/blog/write-code-every-day/) articles, since I am a mathematician, I started my quest on [Project Euler](https://projecteuler.net/) to get my hands dirty with [Go][1].

  [1]: http://golang.org/ "The Go Programming Language"
  [2]: https://golang.org/dl/ "Go Downloads"

