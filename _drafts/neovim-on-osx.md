---
title: Neovim on OSX
tags:
  - Vim
  - Neovim
  - OSX
description: >
    Install Neovim on OSX
---

I want to try angular2, so I want typescript autocompletion on vim, but neovim is the right choice

At first I installed neovim using homebrew, but I wanted a gui so I tryed neovim-dot-app

I opened this pull request https://github.com/rogual/neovim-dot-app/pull/169

```bash
$ brew tap neovim/neovim
$ brew tap rogual/neovim-dot-app
$ brew install --HEAD neovim-dot-app
$ brew linkapps
```

I strongly recommend to create a separated .nvimrc from scratch
and add only what you really need, some plgins are different in neovim

I choose to Use .nvim folder instead of .vim

which package manager to use?
It looks like [vim-plug is the choice](https://www.reddit.com/r/neovim/comments/2u6peg/which_package_manager_do_you_use_for_neovim/)

So, adapting [vim-plug][1] installation instructions

```bash
$ curl -fLo ~/.nvim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Then in my *.nvimrc*

```
call plug#begin('~/.nvim/plugged')

Plug 'benekastah/neomake'

" Add plugins to &runtimepath
call plug#end()
```

  [1]: https://github.com/junegunn/vim-plug "vim-plug"

