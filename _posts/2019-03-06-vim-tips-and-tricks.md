---
title: Vim tips & tricks
tags:
  - Vim
description: >
     Vim is awesome and can speed up your productivity, however it is hard to learn. I will write here things it is worth to remember.
---

## Save and exit

Just hit `ZZ`.

## Undo | redo

Un-do with `u`. Re-do with <kbd>CTRL</kbd> <kbd>r</kbd>.

Type `.` in command mode to repeat last executed command.

## Moving faster

- Move to start of previous paragraph or code block: `{`.
- Move to end of next paragraph or code block: `}`.

- Move upwards: <kbd>CTRL</kbd> <kbd>u</kbd>.
- Move downwards: <kbd>CTRL</kbd> <kbd>d</kbd>.

- Move forward one screenful: <kbd>CTRL</kbd> <kbd>f</kbd>.
- Move backward one screenful: <kbd>CTRL</kbd> <kbd>b</kbd>.

- Jump back to the previous buffer (file): <kbd>CTRL</kbd> <kbd>^</kbd>.

- Jump back to the previous (older) location: <kbd>CTRL</kbd> <kbd>o</kbd>.
- Jump forward to the next (newer) location: <kbd>CTRL</kbd> <kbd>i</kbd>.

- Move to the first line in a file: `gg`.
- Move to the last line in a file: `G`.

- Move to start of line: `0`.
- Move to first character of line: `^`.
- Move to end of line: `$`.

- Move to start of next word: `w`.
- Move backward to beginning of word: `b`.
- Move to end of word: `e`.

## Wrap lines

It is ok to wrap lines, add to your vim config

```
set wrap
```

Then just use `gj` or `gk` to move on a wrapped line.

## Sort lines

Select the lines you want to sort, for example do:

1. Place cursor on the first line and start selection with <kbd>SHIFT</kbd> <kbd>V</kbd>.
2. Go down to the last line, for example using <kbd>J</kbd>.

Then sort lines with <kbd>:</kbd> <kbd>sort</kbd>.

To sort and remove duplicates to <kbd>:</kbd> <kbd>sort u</kbd>.

## Registers

Hey, multiple clipboards are available: to see them type <kbd>ESC</kbd> `:reg`.
Let’s say you want to copy a line into a specific register: `"kyy` will yank the current line into register *"k*. If you later want to paste register *"k* you can do this: `"kp`. Easy, huh?

## Marks

Create a mark labeled as **a**: `ma`.

Go to mark **a**: `'a`.

Usually I create a mark labeled as **m**: typing `mm` and then `'m` is faster.

Use capital letters to create marks across files, e.g. `mA`.

List marks with command `:marks`.

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

Split window to a file relative to current open file. This will expand to current file directory: `:split %:p:h` <kbd>TAB</kbd>.
You can also add this map to your config `map ,s :split <C-R>=expand("%:p:h") . "/" <CR>` (credits here[https://stackoverflow.com/a/1708936]).

## Tabs

To open a new tab you can do `:tabnew` but it is more common to open a new tab moving the cursor on a file name and pressing `t` (for example with NERDTree or Ack).

Go to next tab: `gt`.

## Buffers

See listed buffers with `:ls`, the for example to open buffer number 2, do `:b2`. Go to previous or next buffer with `:bprev` and `:bnext`. Adding the following to your vim config

```
:nnoremap gb :bnext<CR>
```

let you cycle throw buffers with `gb`.

## Change or delete **inside**

The command logic is, _c(hange)i(inside)x(something)_ or _d(delete)i(inside)x(something)_. For example:

- `ciw` change inside word; `diw` delete inside word.
- `cip` change inside paragraph; `diw` delete inside paragraph.
- `cit` change inside tag; `dit` delete inside tag.

Place cursor on a word, then `ciw` to change it or `diw` to delete it.

Place a cursor inside a paragraph, then `cip` to change it or `dip` to delete it.

Place a cursor inside an HTML tag, for example

```html
<ul>
  <li>place cursor here</li>
</ul>
```

then `cit` to change it or `dit` to delete it.

Move inside single quotes and type `ci'`, for example if you have

```
some 'quoted content'
```

then you move cursor inside the `'quoted content'` and type `ci'` you will get

```
some ''
```

and you can start typing to replace previous `'quoted content'` with something else.

It also work with other enclosing characters, for example, to change content inside square brackets, do `ci[`.

If you want just to delete content use `d` instead of `c`, for example if you have

```
function (parameter) {
  // some code
}
```

and you place the cursor inside parenthesis and type `di(`, or also `di)` you will get

```
function () {
  // some code
}
```
