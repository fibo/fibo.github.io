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
