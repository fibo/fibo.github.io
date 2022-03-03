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

<div class="paper info">
  This section is highly <b>opinionated</b>. Pleae consider the configurations below as a starting point. To me they are <em>essentials to a joyful developer experience.</em>
</div>

Install *vim-plug* for *Neovim* first, [instructions here](https://github.com/junegunn/vim-plug#neovim).

*Neovim* configuration entry file is *~/.config/nvim/init.vim*. This is how it looks mine.

```vim
" cannot code without the following
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set encoding=UTF-8
syntax on
set number

" only vim can do this
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set cursorline
set cursorcolumn

" open terminal
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <leader>t :below 10sp term://$SHELL<cr>i
" hit <Escape> key to exit from terminal mode
:tnoremap <Esc> <C-\><C-n>

" use current file directory as a start to find file to edit
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
map ,e :e <C-R>=expand("%:p:h") . "/" <CR>
map ,t :tabe <C-R>=expand("%:p:h") . "/" <CR>
map ,s :split <C-R>=expand("%:p:h") . "/" <CR>
" credits to:
" https://stackoverflow.com/a/1708936

" it is ok to wrap lines, just use gj or gk to move
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set wrap

" console.log hot key: type cll
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" insert mode, puts focus inside parentheses
imap cll console.log()<Esc><S-f>(a
" from visual mode on next line, puts visual selection inside parentheses
vmap cll yocll<Esc>p
" from normal mode, wraps word under cursor
nmap cll yiwocll<Esc>p
" credits to:
" https://gist.github.com/jasongonzales23/6189da1d82ee05a91edfd53403d6941d

" cycle buffers
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
:nnoremap gb :bnext<CR>

" load plugins
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
source ~/.config/nvim/plugins.vim
```

I keep plugins in a separate file: *~/.config/nvim/plugins.vim*.
One of the following plugins is a personal choice, i.e. the *bubblegum* colorscheme (configured as last one).
Other than that the plugins listed are considered **essentials** to me. There are also few custom configurations.

```vim
" vim-plug start
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
call plug#begin('~/.nvim/plugged')

" syntax highlighting
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'sheerun/vim-polyglot'

" files hierarchy tree
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'scrooloose/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin'

" toggle NERDTree with ctrl-e, similar to vscode
nmap <C-E> :NERDTreeToggle<CR>
" exit Vim if NERDTree is the only window left.
autocmd BufEnter * if tabpagenr('$') == 1 && winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() |
    \ quit | endif

" cool icons
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'ryanoasis/vim-devicons'

let g:webdevicons_enable_nerdtree = 1

" editorconfig support
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'editorconfig/editorconfig-vim'

" git integration
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'tpope/vim-fugitive'
Plug 'airblade/vim-gitgutter'

" lean & mean status/tabline
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

let g:airline#extensions#tabline#enabled = 1

" emmet (like), essential toolkit for abbreviation expansion
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'mattn/emmet-vim'

" trigger expansion with <Comma> <Comma> keys
let g:user_emmet_leader_key=','

" awesome completion tool
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" use <Tab> key to trigger completion and navigate to the next complete item;
" can use also <Ctrl-N> to go to next element
"              <Shift-Tab> <Ctrl-P> to go to previous element
function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~ '\s'
endfunction
inoremap <silent><expr> <Tab>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<Tab>" :
      \ coc#refresh()

" Use <Shift-K> to show documentation in preview window.
nnoremap <silent> K :call <SID>show_documentation()<CR>
function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  elseif (coc#rpc#ready())
    call CocActionAsync('doHover')
  else
    execute '!' . &keywordprg . " " . expand('<cword>')
  endif
endfunction

" insert or delete parenthesis in pair
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'vim-scripts/auto-pairs-gentle'

" toggle comments
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" use `gcc` to comment out a line (takes a count),
" `gc` in visual mode to comment out the selection, and much more...
Plugh 'tpope/vim-commentary'

" search tool
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'mileszs/ack.vim'

" my favourite colorscheme, bubblegum
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'baskerville/bubblegum'

" vim-plug end, add plugins to &runtimepath
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
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

I recomment at least the following:

* coc-css
* coc-html
* coc-json
* coc-prettier
* coc-tsserver

See other *coc.nvim* extensions [here](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions).

You may also want to configure CoC, for instance launch command `:CocConfig`
(or edit *~/.config/nvim/coc-settings.json* file) and start with the following

```json
{
  "coc.preferences.formatOnSaveFiletypes": ["typescript", "typescriptreact"],
  "diagnostic.checkCurrentLine": true,
  "typescript.suggestionActions.enabled": true
}
```

See also CoC configuration JSON schema [here](https://github.com/neoclide/coc.nvim/blob/release/data/schema.json).

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
--ignore-dir=.next
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

