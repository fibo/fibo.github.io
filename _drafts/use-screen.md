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
       
       
http://www.tecmint.com/screen-command-examples-to-manage-linux-terminals/
https://kb.iu.edu/d/acuy

screen


<kbd>CTRL-a ?</kbd>

# Customization

Here is my *~/.screenrc*

```bash
vbell off # Turns visual bell off

shell -$SHELL # load shell profile
```

  [1]: http://www.gnu.org/software/screen/

