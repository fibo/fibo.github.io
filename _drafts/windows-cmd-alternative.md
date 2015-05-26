---
title: Windows CMD alternative
tags:
  - Windows
  - Software
description: >
    Tyred of MS/DOS prompt limitations? Try this: Babun integrated with ConEmu.
---

Download [ConEmu][1], and [Babun][2].

I like to put portable software in folder `C:\Portable` so I need to launch *Babun* installer with a custom target.

```
install.bat /t "C:\Portable"
```

which will install *Babun* under `C:\Portable\.babun` path. When installation finishes if you get this warning

```
Executing daily babun check:
Source consistent [OK]
Prompt speed      [OK]
File permissions  [OK]
Connection check  [FAILED]
Update check      [FAILED]
```

probably you are behind a proxy, so you need to

> adjust proxy settings in ~/.babunrc and execute 'source ~/.babunrc'

Also *ConEmu* can be installed as a portable software

> If You want to use «Portable» mode, just create empty file
«ConEmu.xml» in this folder.

that is the folder where you uncompress *ConEmu*.
You will see a configuration wizard first time you run *ConEmu*, and, yes
check the *Quake-style slide down from the to of the screen* flag.
Since my default keyboard layout is italian, I see <kbd>CTRL+ò</kbd> as the keyboard shortcut. It is better to change it to <kbd>CTRL+\</kbd> that is what the author meant.




metti anche le customizzazioni
fighissima la Quake-like console <kbd>CTRL `</kbd> con la tastiera italiana
è <kbd>CTRL ò</kbd> booh, meglio rimapparlo

  [1]: http://sourceforge.net/projects/conemu/ "ConEmu"
  [2]: http://babun.github.io/ "Babun"

