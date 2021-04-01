---
title: How to setup Neovim
tags:
  - Vim
description: >
    Neovim is my favourite editor for modern web development with React, TypeScript, etc. Here it is my setup.
---

> I am the Editor thy Vi.

I cannot stop using Vim, I tryed many times with several editors. No way.
[Neovim](https://neovim.io/) is a great project since it is fully compatible with Vim's editing model but helped a lot moving forward, which was not possible due to retrocompatibility support (yes, Vim works on Amiga too).

The result is the best of both *good old* Vim and modern improvements. However, the configuration can take a lot of time scouting and trying plugins and configurations. Let me share what I obtained: a cool environment for web development.

First of all, Neovim configuration entry file is *~/.config/nvim/init.vim*. This is how mine looks like.

```vim
set encoding=UTF-8

syntax on

set number

" open terminal in footer
nnoremap <leader>t :below 10sp term://$SHELL<cr>i
" hit Escape key to exit from terminal mode
:tnoremap <Esc> <C-\><C-n>

" load plugins
source ~/.config/nvim/plugins.vim
```

I keep plugins in a separate file: *~/.config/nvim/plugins.vim*. Few of the following plugins are a personal choice, for example the *bubblegum* colorscheme.

```vim
" vim-plug
call plug#begin('~/.nvim/plugged')

Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
let g:airline#extensions#tabline#enabled = 1

" my favourite colorscheme
Plug 'baskerville/bubblegum'
colorscheme bubblegum-256-dark
let g:airline_theme='bubblegum'

" Add plugins to &runtimepath
call plug#end()

```

