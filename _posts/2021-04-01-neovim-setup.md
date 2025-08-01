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
set encoding=UTF-8
syntax on
set number

" only vim can do this
set cursorline
set cursorcolumn

" map leader to Space
let mapleader = " "

" use current file directory as a start to find file to edit
" credits to: https://stackoverflow.com/a/1708936
map <leader>e :e <C-R>=expand("%:p:h") . "/" <CR>
map <leader>s :split <C-R>=expand("%:p:h") . "/" <CR>

" it is ok to wrap lines, just use gj or gk to move
set wrap

" console.log hot key: type cll
" credits to: https://gist.github.com/jasongonzales23/6189da1d82ee05a91edfd53403d6941d
""""
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
:nnoremap gb :bnext<CR>

" move camelCase-wise
""""
" Use Shift + arrow keys,
" source: https://vim.fandom.com/wiki/Moving_through_camel_case_words

nnoremap <silent><S-Left> :<C-u>call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%^','bW')<CR>
nnoremap <silent><S-Right> :<C-u>call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%$','W')<CR>
inoremap <silent><S-Left> <C-o>:call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%^','bW')<CR>
inoremap <silent><S-Right> <C-o>:call search('\<\<Bar>\U\@<=\u\<Bar>\u\ze\%(\U\&\>\@!\)\<Bar>\%$','W')<CR>

" Finally, load plugins
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
let g:airline_powerline_fonts = 1

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
" Then type ,, to trigger expansion.
"
" More tutorials here: https://github.com/mattn/emmet-vim/blob/master/TUTORIAL
Plug 'mattn/emmet-vim'
"
" Notice that original trigger is <C-y>, (Ctrl y ,) but emmet leader key is set to comma in the config below.
" So for example
"
"     div,,
"
" will generate <div></div>

let g:user_emmet_leader_key=','

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

" Use ripgrep instead of ack, in particular files in .gitignore are excluded.
if executable('rg')
  let g:ackprg = 'rg --vimgrep --smart-case'
endif

Plug 'ctrlpvim/ctrlp.vim'
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/](\.git|\.next|node_modules)$',
  \ 'file': '\v\.(exe|so|dll)$',
  \ }

if executable('rg')
  let g:ctrlp_user_command = 'rg --files %s'
  let g:ctrlp_use_caching = 0
  " Set local working directory, as the nearest ancestor that contains .git
  let g:ctrlp_working_path_mode = 'r'
endif

" Markdown
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'godlygeek/tabular'
Plug 'preservim/vim-markdown'

set conceallevel=2
let g:vim_markdown_folding_style_pythonic = 1
let g:vim_markdown_follow_anchor = 1
let g:vim_markdown_math = 1
let g:vim_markdown_frontmatter = 1

" JSON
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'neoclide/jsonc.vim'

" Artifical Intelligence helper
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
Plug 'Exafunction/codeium.vim', { 'branch': 'main' }

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

See other [*coc.nvim* extensions](https://github.com/neoclide/coc.nvim/wiki/Using-coc-extensions#implemented-coc-extensions).

You may also want to configure CoC, for instance launch command `:CocConfig`
(or edit *~/.config/nvim/coc-settings.json* file) and start with the following

```json
{
  "[javascript][javascriptreact][typescript][typescriptreact]": {
    "coc.preferences.formatOnSave": true
  },
  "diagnostic.checkCurrentLine": true,
  "typescript.suggestionActions.enabled": true
}
```

See also [CoC configuration JSON schema](https://github.com/neoclide/coc.nvim/blob/release/data/schema.json).

### ripgrep

> ripgrep recursively searches directories for a regex pattern while respecting your gitignore

You need to install [ripgrep](https://github.com/BurntSushi/ripgrep). With *brew* just run

```bash
brew install ripgrep
```

### NerdFonts

Install a patched font from [NerdFonts](https://www.nerdfonts.com/) for example I downloaded [Fura Code Retina Nerd Font Complete](https://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/FiraCode/Retina/complete/Fira%20Code%20Retina%20Nerd%20Font%20Complete.ttf). Wow, that font name sounds good!

Thanks to vim plugin [ryanoasis/vim-devicons](https://github.com/ryanoasis/vim-devicons) you will get an awesome result.

![Vim devicons](/images{{ page.id }}/vim-devicons.png)
