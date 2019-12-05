---
title: Vim tips & tricks
tags:
  - Vim
description: >
     Vim is awesome and can speed up your productivity, however it is hard to learn. I will write here things it is worth to remember.
---

## Save and exit

Just hit `ZZ`.

## Moving faster

Move to start of previous paragraph or code block: `{`.

Move to end of next paragraph or code block: `}`.

Move forward one screenful: <kbd>CTRL F</kbd>.

Move backward one screenful: <kbd>CTRL B</kbd>.

Jump back to the previous (older) location: <kbd>CTRL O</kbd>

Jump forward to the next (newer) location: <kbd>CTRL I</kbd> or also <kbd>TAB</kbd>.

Move to the first line in a file: `gg`.

Move to the last line in a file: `G`.

## Wrap lines

It is ok to wrap lines, add to your vim config

```
set wrap
```

Then just use `gj` or `gk` to move on a wrapped line.

## Marks

Create a mark labeled as **a**: `ma`.

Go to mark **a**: `'a`.

Usually I create a mark labeled as **m**: typing `mm` and then `'m` is faster.

## Macros

1. Start recording a macro labeled as **a**: `qa`.
2. Execute a sequence of commands you want to repeat.
3. Stop recording macro: `q`.

Invoke your macro labeled as **a**: `@a`.

Usually I create a macro labeled as **q**, so I just type `qq` to start recording, `q` to stop recording and `@q` to invoke it.

Note also that you can launch macro *n* times, for example to execute my macro ten times, I do `10@q`.

## Split window

Split window and open another file: `:split path/to/file`.

Split window and open current directory: `:split .`

Split window to a file relative to current open file. This will expand to current file: `:split %` <kbd>TAB</kbd>.

## Tabs

To open a new tab you can do `:tabnew` but it is more common to open a new tab moving the cursor on a file name and pressing `t` (for example with NERDTree or Ack).

Go to next tab: `gt`.

## Buffers

See listed buffers with `:ls`, the for example to open buffer number 2, do `:b2`. Go to previous or next buffer with `:bprev` and `:bnext`. Adding the following to your vim config

```
:nnoremap gb :bnext<CR>
```

let you cycle throw buffers with `gb`.

## Icons

<span class="badge">Plugin</span>

Install a patched font from [NerdFonts](https://www.nerdfonts.com/) for example I downloaded [Fura Code Retina Nerd Font Complete](://github.com/ryanoasis/nerd-fonts/blob/master/patched-fonts/FiraCode/Retina/complete/Fira%20Code%20Retina%20Nerd%20Font%20Complete.ttf). Wow, that font name sounds good!

Thanks to vim plugin [ryanoasis/vim-devicons](https://github.com/ryanoasis/vim-devicons) you will get an awesome result.

![Vim devicons](/images{{ page.id }}/vim-devicons.png)

## Emmet

<span class="badge">Plugin</span>

Install [mattn/emmet-vim](https://github.com/mattn/emmet-vim) plugin

> which provides support for expanding abbreviations similar to [emmet](http://emmet.io)

Then add this mapping to your configuration

```
imap ,, <C-y>,
```

For example, typing `div` or any other emmet expression, you can expand it to markup with `,,`.
