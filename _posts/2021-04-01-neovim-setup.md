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

Install vim-plug for Neovim first, [instructions here](https://github.com/junegunn/vim-plug#neovim).

Neovim configuration entry file is *~/.config/nvim/init.vim*. This is how it looks like.

```vim
set encoding=UTF-8

syntax on

set number

" open terminal in footer
nnoremap <leader>t :below 10sp term://$SHELL<cr>i
" hit `Escape` key to exit from terminal mode
:tnoremap <Esc> <C-\><C-n>

" load plugins
source ~/.config/nvim/plugins.vim
```

I keep plugins in a separate file: *~/.config/nvim/plugins.vim*.
One of the following plugins is a personal choice, i.e. the *bubblegum* colorscheme (configured as last one).
Other than that the plugins listed are considered **essentials** to me. There are also few custom configurations.

```vim
" vim-plug start
call plug#begin('~/.nvim/plugged')

Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
let g:airline#extensions#tabline#enabled = 1

" git integration
Plug 'tpope/vim-fugitive'

Plug 'ryanoasis/vim-devicons'
let g:webdevicons_enable_nerdtree = 1

" files hierarchy tree
Plug 'scrooloose/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin'
" toggle NERDTree with CTRL-n
map <C-n> :NERDTreeToggle<CR>

" my favourite colorscheme, bubblegum
Plug 'baskerville/bubblegum'

" vim-plug end, add plugins to &runtimepath
call plug#end()

" activate bubblegum colorscheme
colorscheme bubblegum-256-dark
let g:airline_theme='bubblegum'
```

Once *vim-plug* is installed, and both config files are created, open Neovim and run command `: PlugInstall`.
