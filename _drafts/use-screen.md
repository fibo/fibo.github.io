---
title: Use screen
tags:
  - Unix
---

Be a cowboy console, use [GNU Screen][1]!

```bash
$ man screen
```

> Screen is a full-screen window manager that multiplexes a physical terminal between several processes (typically interactive  shells).

## Take a tour

Run all commands in this section to take a tour of basic *screen* usage.

To start screen, just launch

```bash
$ screen
```

you can also give a name to the session

```bash
$ screen -S myFirstScreenSession
```

Display help with <kbd>CTRL-a ?</kbd>.
All screen commands are prefixed by <kbd>CTRL-a</kbd>, written in documentation as `^a`.

List running sessions

```bash
$ screen -ls
There are screens on:

```

Launch some long running task, for example

```bash
$ find /
```

Detach from current session with <kbd>CTRL-a d</kbd>.

Attach to a running session

```bash
$ screen -x pst-0
```

## Customization

Here is my *~/.screenrc*

```bash
vbell off     # Turns visual bell off
shell -$SHELL # load shell profile
```

http://www.tecmint.com/screen-command-examples-to-manage-linux-terminals/
https://kb.iu.edu/d/acuy

http://aperiodic.net/screen/quick_reference "Screen quick reference"

  [1]: http://www.gnu.org/software/screen/

