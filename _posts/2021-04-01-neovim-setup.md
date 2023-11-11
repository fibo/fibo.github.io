---
title: My Neovim setup
tags:
  - Vim
  - TypeScript
  - React
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
  This section is highly <b>opinionated</b>. Please consider the configurations below as a starting point. To me they are <em>essentials to a joyful developer experience.</em>
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
" credits to: https://stackoverflow.com/a/1708936

map <leader>e :e <C-R>=expand("%:p:h") . "/" <CR>
map <leader>s :split <C-R>=expand("%:p:h") . "/" <CR>

" it is ok to wrap lines, just use gj or gk to move
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set wrap

" console.log hot key: type cll
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" credits to: https://gist.github.com/jasongonzales23/6189da1d82ee05a91edfd53403d6941d

" insert mode, puts focus inside parentheses
"
" if you are using coc-pairs or any other auto pairs plugin,
" use this code:
" imap cll console.log(
"
imap cll console.log()<Esc><S-f>(a

" from visual mode on next line, puts visual selection inside parentheses
vmap cll yocll<Esc>p

" from normal mode, wraps word under cursor
nmap cll yiwocll<Esc>p

" cycle buffers
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
:nnoremap gb :bnext<CR>

" move camelCase-wise
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Use Shift + arrow keys,
" source: https://vim.fandom.com/wiki/Moving_through_camel_case_words

nnoremap <silent><S-Left> :<C-u>call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%^','bW')<CR>
nnoremap <silent><S-Right> :<C-u>call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%$','W')<CR>
inoremap <silent><S-Left> <C-o>:call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%^','bW')<CR>
inoremap <silent><S-Right> <C-o>:call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%$','W')<CR>

" Finally, load plugins
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
source ~/.config/nvim/plugins.vim
```

I keep plugins in a separate file: *~/.config/nvim/plugins.vim*.

The last plugin listed, i.e. the *bubblegum* is my favourite colorscheme.
Other plugins and configurations are considered **essentials** to me.

```vim
" vim-plug start
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
call plug#begin('~/.nvim/plugged')

" files hierarchy tree
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'scrooloose/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin'

" toggle NERDTree with <Ctrl-e>, where 'e' stands for 'explorer'
nmap <C-E> :NERDTreeToggle<CR>

" cool icons
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'ryanoasis/vim-devicons'

let g:webdevicons_enable_nerdtree = 1

" Git integration
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'tpope/vim-fugitive'

" Enables :GBrowse from fugitive.vim to open GitHub URLs.
Plug 'tpope/vim-rhubarb'

" editorconfig support
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'editorconfig/editorconfig-vim'

" lean & mean status/tabline
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

let g:airline#extensions#tabline#enabled = 1

" emmet (like), essential toolkit for HTML & CSS abbreviation expansion
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Quick tutorial.
"
" Open or create index.html file.
"
" Type ("_" is the cursor position)
"
"      html:5_
"
" Then type <C-y>, (Ctrl y ,) to trigger expansion.
"
" More tutorials here: https://raw.githubusercontent.com/mattn/emmet-vim/master/TUTORIAL
Plug 'mattn/emmet-vim'

" awesome completion tool
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'neoclide/coc.nvim', {'branch': 'release'}

" use <Tab> key to trigger completion and navigate to the next complete item;
" can use also <Ctrl-n> to go to next element
"              <Shift-Tab> <Ctrl-p> to go to previous element
function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~ '\s'
endfunction
inoremap <silent><expr> <Tab>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<Tab>" :
      \ coc#refresh()

" Use K to show documentation in preview window.
nnoremap <silent> K :call ShowDocumentation()<CR>

function! ShowDocumentation()
  if CocAction('hasProvider', 'hover')
    call CocActionAsync('doHover')
  else
    call feedkeys('K', 'in')
  endif
endfunction

" Use `d[` and `d]` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list.
nmap <silent> d[ <Plug>(coc-diagnostic-prev)
nmap <silent> d] <Plug>(coc-diagnostic-next)

" Apply AutoFix to problem on the current line.
" Use `:CocFix` to get all choices avaliable.
nmap <leader>x <Plug>(coc-fix-current)

" GoTo code navigation.
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

" Symbol renaming.
nmap <leader>r <Plug>(coc-rename)

" Formatting selected code.
xmap <leader>f  <Plug>(coc-format-selected)
nmap <leader>f  <Plug>(coc-format-selected)

" toggle comments
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" use `gcc` to comment out a line (takes a count),
" `gc` in visual mode to comment out the selection, and much more...
Plug 'tpope/vim-commentary'

" search tool
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'mileszs/ack.vim'
" This Leader-a shortcut has a Ack! command with bang, which will search
" but do not jump to the first result automatically.
" Hit Leader-a and type string to search, or
" hit Leader-a and then Enter to search for string under cursor.
nnoremap <Leader>a :Ack!<Space>

Plug 'ctrlpvim/ctrlp.vim'
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/](\.git|\.next|node_modules)$',
  \ 'file': '\v\.(exe|so|dll)$',
  \ }

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
* coc-pairs
* coc-prettier
* coc-tsserver

See other *coc.nvim* extensions [here](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions).

You may also want to configure CoC, for instance launch command `:CocConfig`
(or edit *~/.config/nvim/coc-settings.json* file) and start with the following

```json
{
  "coc.preferences.formatOnSaveFiletypes": [
    "javascript", "javascriptreact",
    "typescript", "typescriptreact"
   ],
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

