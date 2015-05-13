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

## 

To start screen, just launch

```bash
$ screen
```

you can also give a name to the session

```bash
$ screen -S myFirstScreenSession
```
Display help

<kbd>CTRL-a ?</kbd>

## Customization

Here is my *~/.screenrc*

```bash
vbell off     # Turns visual bell off
shell -$SHELL # load shell profile
```

http://www.tecmint.com/screen-command-examples-to-manage-linux-terminals/
https://kb.iu.edu/d/acuy


  [1]: http://www.gnu.org/software/screen/

