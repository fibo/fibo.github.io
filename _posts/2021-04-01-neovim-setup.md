---
title: How to setup Neovim
tags:
  - Vim
description: >
    Neovim is my favourite editor for modern web development with React, TypeScript, etc. Here it is my setup.
---

## Why Vim

> I am the Editor thy Vi.

I cannot stop using Vim, I tryed many times with several editors. No way.
[Neovim](https://neovim.io/) is a great project since it is fully compatible with Vim's editing model but helped a lot moving forward, which was not possible due to retrocompatibility support (yes, Vim works on Amiga too).

The result is the best of both *good old* Vim and modern improvements. However, the configuration can take a lot of time scouting and trying plugins and configurations. Let me share what I obtained: a cool environment for web development.

## Configuration

Install *vim-plug* for *Neovim* first, [instructions here](https://github.com/junegunn/vim-plug#neovim).

*Neovim* configuration entry file is *~/.config/nvim/init.vim*. This is how it looks like.

```vim
" cannot code without the following
set encoding=UTF-8
syntax on
set number

" open terminal in footer
nnoremap <leader>t :below 10sp term://$SHELL<cr>i
" hit <Escape> key to exit from terminal mode
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

" syntax highlighting
Plug 'sheerun/vim-polyglot'

" files hierarchy tree
Plug 'scrooloose/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin'
" toggle NERDTree with <Control n> hot key
map <C-n> :NERDTreeToggle<CR>

" cool icons
Plug 'ryanoasis/vim-devicons'
let g:webdevicons_enable_nerdtree = 1

" editorconfig support
Plug 'editorconfig/editorconfig-vim'

" git integration
Plug 'tpope/vim-fugitive'
Plug 'airblade/vim-gitgutter'

" lean & mean status/tabline
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
let g:airline#extensions#tabline#enabled = 1

" awesome completion tool
Plug 'neoclide/coc.nvim', {'branch': 'release'}
"
function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~ '\s'
endfunction
" use <Tab> key to trigger completion and navigate to the next complete item
inoremap <silent><expr> <Tab>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<Tab>" :
      \ coc#refresh()

" insert or delete parenthesis in pair
Plug 'vim-scripts/auto-pairs-gentle'

" toggle comments: use `gcc` to comment out a line (takes a count),
" `gc` in visual mode to comment out the selection, and much more...
Plugh 'tpope/vim-commentary'

" search tool
Plug 'mileszs/ack.vim'

" my favourite colorscheme, bubblegum
Plug 'baskerville/bubblegum'

" vim-plug end, add plugins to &runtimepath
call plug#end()

" activate bubblegum colorscheme
colorscheme bubblegum-256-dark
let g:airline_theme='bubblegum'
```

## Further steps

Once *vim-plug* is installed, and both config files are created, open *Neovim* and run command

```
:PlugInstall
```

### CoC

Use [Conquer of Completion](https://github.com/neoclide/coc.nvim) (a.k.a. *coc.nvim* or simply *coc*) to install plugins. In *Neovim* run once the following command to install extendsions marketplace

```
:CocInstall coc-marketplace
```

Now you can:

* List/Install all available extensions with `:CocList marketplace`.
* Install extensions directly, e.g. `:CocInstall coc-json`

See other *coc.nvim*extensions [here](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions) I recomment at least the following:

* coc-json
* coc-html
* coc-css
* coc-tsserver

You may also create a *~/.config/nvim/coc-settings.json* file to configure CoC, for instance start with the following

```json
{
  "tsserver.enableJavascript": true,
  "typescript.suggestionActions.enabled": true
}
```

### ack!

> ack is a grep-like source code search tool

You need to install *ack!*, go [beyondgrep](https://beyondgrep.com/). With *brew* just run

```bash
brew install ack
```

To speed up, I also create a *~/.ackrc* file like the following

```
## Ack is awesome: https://beyondgrep.com/
#
--smart-case
# folders I usually do not want to look into
--ignore-dir=.nyc_output
--ignore-dir=_site
--ignore-dir=build
--ignore-dir=dist
# files I usually ignore
--ignore-file=match:/bundle/

```

### NerdFonts

Install a patched font from [NerdFonts](https://www.nerdfonts.com/) for example I downloaded [Fura Code Retina Nerd Font Complete](https://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/FiraCode/Retina/complete/Fira%20Code%20Retina%20Nerd%20Font%20Complete.ttf). Wow, that font name sounds good!

Thanks to vim plugin [ryanoasis/vim-devicons](https://github.com/ryanoasis/vim-devicons) you will get an awesome result.

![Vim devicons](/images{{ page.id }}/vim-devicons.png)

