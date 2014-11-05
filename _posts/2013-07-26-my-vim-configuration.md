---
title: My Vim configuration
tags:
  - Vim
description: >
    This is a collection of vim configuration directives.
---

## How to edit your configuration

First of all, you need to know how to edit your user configuration, which is defined in your *vimrc* file. Open your vim and type

```
:e $HOME/.vimrc
```

or, if you are on Windows

```
:e $HOME\_vimrc
```


This will create your own user configuration file. From now on, you can edit it with

```
:split $MYVIMRC
```

See [Open vimrc file](http://vim.wikia.com/wiki/Open_vimrc_file) as a reference.


### Autosource config on exit

Here it is the first line you are going to add to your vimrc.

```vim
" autosource config on exit
au BufLeave $MYVIMRC :source $MYVIMRC
```

So new configuration will be sourced when you finish editing and close the file (a.k.a. ZZ command).

See also [Keep your vimrc file clean](http://vim.wikia.com/wiki/Keep_your_vimrc_file_clean).

## Survival kit

### Vim is not vi

```vim
set nocompatible    " be iMproved
set wildmenu        " enhanced command-line completion
set laststatus=2    " always show status line
set ruler
```

### Choose a color theme

I use *desert* here cause is a dark theme I always find by default. However there are better color schemes around: you can install them using Vundle, see [Vundle config](#vundle-config) section.

```vim
" if you are using vim from an ssh terminal, probably you should uncomment the line below
" set t_Co=256

colorscheme desert
```

### Indentation and syntax highlight

```vim
syntax on         " can't code without
filetype plugin indent on

set autoindent    " always set autoindenting on
set copyindent    " copy the previous indentation on autoindenting
set shiftround    " use multiple of shiftwidth when indenting with '<' and '>'
set showmatch     " set show matching parenthesis
```

See [Programming languages][1] section for specific configuration.

### Disable that annoing beep

```vim
" disable beeping and flashing
" see http://vim.wikia.com/wiki/Disable_beeping
set noerrorbells visualbell t_vb= " don't beep
autocmd GUIEnter * set visualbell t_vb=
```

### Enhanced cursor

```vim
set cursorcolumn
set cursorline
"if version >= 703
if exists('+colorcolumn')
  set colorcolumn=80
endif
```

### Use UTF-8 encoding

```vim
set encoding=utf8
set termencoding=utf-8
set fileencodings=          " Don't do any encoding conversion
" Fonts, see http://vimdoc.sourceforge.net/htmldoc/options.html#%27guifontwide%27
set guifontwide=MingLiU:h10 " Display mixed character sets
set guifont=Consolas:h11:cANSI
```

## Nice to have

### Enable list

```vim
set number        " always show line numbers
set list

" Define characters to show when you show formatting
" stolen from https://github.com/tpope/vim-sensible
if &listchars ==# 'eol:$'
  set listchars=tab:>\ ,trail:-,extends:>,precedes:<,nbsp:+
  if &termencoding ==# 'utf-8' || &encoding ==# 'utf-8'
    let &listchars = "tab:\u21e5,trail:\u2423,extends:\u21c9,precedes:\u21c7,nbsp:\u26ad"
  endif
endif

" another nice listchars configuration
" set listchars=tab:\|\ ,eol:¬
" set listchars=eol:¬,tab:>-,trail:.,extends:»,precedes:«
" set listchars=tab:\|\ ,eol:¬,trail:-,extends:>,precedes:<,nbsp:+

```

### Set gvim window size

I prefer *gvim* starts maximized

```vim
" See http://vim.wikia.com/wiki/Maximize_or_set_initial_window_size

if has("gui_running")
  " GUI is running or is about to start.
  " Maximize gvim window.
  set lines=999 columns=999
endif
```

### Pastoggle

Use <kbd>F2</kbd> to toggle auto-indenting for text paste.

```vim
" See http://vim.wikia.com/wiki/Toggle_auto-indenting_for_code_paste
set pastetoggle=<F12> 
```

### Buffers

```vim
set hidden " abandon a buffer when unloaded
```

### History

```vim
set history=1000    " remember more commands and search history
set undolevels=1000 " use many muchos levels of undo
```


### No shit around

If I am on a single user on a local host it does not make sense to use swap files.

```vim
set nobackup
set noswapfile " IMPORTANT: comment this line if you are working on a remote host
set wildignore=*.swp,*.bak,*.pyc,*.class
```

### Split

#### Easier split navigations

We can use different key mappings for easy navigation between splits to save a keystroke. So instead of <kbd>CTRL-w</kbd> then <kbd>j</kbd>, use just <kbd>CTRL-j</kbd>

```vim
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
```

#### More natural split opening

Open new split panes to right and bottom, which feels more natural than default *Vim* behaviour.

```vim
set splitbelow
set splitright
let g:netrw_altv = 1 " when navigating a folder,
                     " hitting <v> opens a window at right side (default is left side)
```


### Better search

```vim
set smarttab   " insert tabs on the start of a line according to
               "   shiftwidth, not tabstop
set hlsearch   " highlight search terms
set incsearch  " show search matches as you type
set smartcase  " ignore case if search pattern is all lowercase,
               "   case-sensitive otherwise
set ignorecase " ignore case when searching
```

### Plugins

#### Vundle config

Vim is great but it gets even better with tons of plugins you can use to make people, **including your boss**, say:

> Hey, what editor are you using?

For plugin management I use [Vundle][2], it works really great.

Installation that is not really straightforward on Windows, see [Vundle-for-Windows](https://github.com/gmarik/Vundle.vim/wiki/Vundle-for-Windows) installation instructions, but it really worth it!

Edit your configuration (see below), launch

```vim
:VundleInstall
```


and *Vundle* will manage everything!


```vim
"""""""""""""""""""""
" start Vundle config
set nocompatible               " be iMproved
filetype off                   " required!

set rtp+=~/.vim/bundle/vundle/ " Use ~/vimfiles/bundle/vundle if you are on Windows
call vundle#rc()


" let Vundle manage Vundle
" required!
Bundle 'gmarik/vundle'

"""""
" my plugin list here
" Bundle 'godlygeek/tabular'
" Bundle 'walm/jshint.vim'
" Bundle 'bling/vim-airline'
" Bundle 'baskerville/bubblegum'
" Bundle 'kchmck/vim-coffee-script'
" Bundle 'AndrewRadev/vim-eco'


syntax enable
filetype plugin indent on " required!
" end Vundle config
"""""""""""""""""""
```

After Vundle config you can add plugins configuration directives

```vim
" Color schemes (uncomment one of the rows below)
"""""""""""""""""""""""""""""""""""""""""""""""""
" colorscheme desert
" colorscheme base16-atelierdune
colorscheme bubblegum
" colorscheme base16-tomorrow
" colorscheme base16-greenscreen
" colorscheme base16-eighties

```


#### Cool plugins

[vim-airline](https://github.com/bling/vim-airline)
: lean&mean statusline for vim

[base16-vim](https://github.com/chriskempson/base16-vim)
: color schemes for hackers

[Tabular](https://github.com/godlygeek/tabular)
: vim script for text filtering and alignment

[bubblegum](https://github.com/baskerville/bubblegum)
: vim color scheme based on xoria256

[Gist-vim](https://github.com/mattn/gist-vim)
: vimscript for gist

[YouCompleteMe](http://valloric.github.io/YouCompleteMe/)
: fast, as-you-type, fuzzy-search code completion engine

[Supertab](https://github.com/ervandew/supertab)
: perform all your vim insert mode completions with Tab

[Fugitive](https://github.com/tpope/vim-fugitive)
: a Git wrapper so awesome, it should be illegal

[The NERD Tree](https://github.com/scrooloose/nerdtree)
: a tree explorer plugin for vim

[Syntastic](https://github.com/scrooloose/syntastic)
: syntax checking hacks for vim

## Programming languages


### Go

Install [Vim plugins for Go](http://golang.org/misc/vim/readme.txt).

Note that you need to set the *GOROOT* environment variable properly, see [environment section](http://g14n.info/2014/04/golang-on-windows#environment) in my *Golang on Windows* article.

```vim
" See http://golang.org/misc/vim/readme.txt
"""""""""""""""""""""""""""""""""""""""""""

" On Windows, add environment variable GOROOT=C:\Go
" and add %GOROOT%bin; to your PATH variable
filetype off
filetype plugin indent off
set runtimepath+=$GOROOT/misc/vim
filetype plugin indent on
syntax on

" Format Go source files when they are saved
autocmd FileType go autocmd BufWritePre <buffer> Fmt

" gocode: An autocompletion daemon for the Go programming language
" See https://github.com/nsf/gocode and https://github.com/Blackrush/vim-gocode
" Use <C-x><C-o> for autocompletion (omnifunc autocompletion)
Bundle 'Blackrush/vim-gocode'
```

### JavaScript

See also [Vim plugins page on Node wiki](https://github.com/joyent/node/wiki/Vim-Plugins).

```vim
" my JavaScript preferences
autocmd filetype javascript setlocal autoindent
autocmd filetype javascript setlocal expandtab
autocmd filetype javascript setlocal shiftwidth=2
autocmd filetype javascript setlocal tabstop=2
```

### Perl

```vim
" my Perl preferences
autocmd filetype perl map <F2> :%!perltidy<CR> " indent
autocmd filetype perl map <F3> :!prove -l<CR> " run tests
autocmd filetype perl setlocal autoindent
autocmd filetype perl setlocal expandtab
autocmd filetype perl setlocal shiftwidth=4
autocmd filetype perl setlocal tabstop=4

" Syntastic
" let g:syntastic_enable_perl_checker = 1
" au BufRead,BufNewFile *.t let g:syntastic_perl_perlcritic_args="--severity 4 --theme 'test'"
" au BufRead,BufNewFile *.pl let g:syntastic_perl_perlcritic_args="--severity 4 --theme 'script'"
" au BufRead,BufNewFile *.pm let g:syntastic_perl_perlcritic_args="--severity 4 --theme 'module'"

" use perltidy for .pl, .pm, and .t
au BufRead,BufNewFile *.pl setl equalprg=perltidy
au BufRead,BufNewFile *.pm setl equalprg=perltidy
au BufRead,BufNewFile *.t setl equalprg=perltidy
```

### CoffeeScript

Install plugins

[kchmck/vim-coffee-script](https://github.com/kchmck/vim-coffee-script)
: CoffeeScript support for vim

[AndrewRadev/vim-eco](https://github.com/AndrewRadev/vim-eco)
: Eco (embedded coffee-script) support for Vim

```vim
au BufRead,BufNewFile *.coffee set filetype=coffee
au BufRead,BufNewFile *.coffee.md set filetype=coffee
```

## See also

* [Vim resources](http:/g14n.info/2014/06/vim-resources)

  [1]: #programming-languages
  [2]: https://github.com/gmarik/vundle

