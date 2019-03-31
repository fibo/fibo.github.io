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

## Marks

Create a mark labeled as **a**: `ma`.

Go to mark **a**: `'a`.

## Split window

Split window and open another file: `:split path/to/file`.

Split window and open current directory: `:split .`

Split window to a file relative to current open file. This will expand to current file: `:split %` <kbd>TAB</kbd>.

## Tabs

To open a new tab you can do `:tabnew` but it is more common to open a new tab moving the cursor on a file name and pressing `t` (for example with NERDTree or Ack).

Go to next tab: `gt`.
