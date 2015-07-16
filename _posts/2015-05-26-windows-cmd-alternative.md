---
title: Windows CMD alternative
tags:
  - Windows
  - Software
description: >
    Tyred of MS/DOS prompt limitations? Try ConEmu.
---

Follow instructions in this article to get the coolest shell experience on Windows.

I use to put portable software in folder `C:\Portable`.

## ConEmu

Download [ConEmu][1].

It can be installed as a portable software, as you can read in *Portable.txt*

> If You want to use «Portable» mode, just create empty file
«ConEmu.xml» in this folder.

that is the folder where you uncompress *ConEmu*.

You will see a configuration wizard first time you run *ConEmu*, and, **yes** check the *Quake-style slide down from the to of the screen* flag.

![ConEmu_fast_configuration](//{{ site.domain }}/images/2015-05-26-windows-cmd-alternative/ConEmu_fast_configuration.jpg)

Since my default keyboard layout is Italian, I see <kbd>CTRL+ò</kbd> as the keyboard shortcut.
It is better to change it to <kbd>CTRL+\</kbd> that is what the author meant, i.e. <kbd>CTRL+`</kbd> if you have a USA keyboard layout.

## Babun integration

You can add as many so called *Tasks* as you want. That is the name *ConEmu* gives to a shell, many of them are already preconfigured.
As an example, I will add *Babun*.

### Install Babun

Download [Babun][2] and uncompress it.

Change dir to the path where you uncompressed *Babun* and launch the installer with a custom target.

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

probably you are behind a proxy, so, as you can read in the message, you need to

> adjust proxy settings in ~/.babunrc and execute 'source ~/.babunrc'

### Configure a new ConEmu task

In *ConEmu* press <kbd>Win+Alt+P</kbd> or open settings from menu, go to *Startup > Tasks*, press **+** icon to add a new task and set it as specified in [Babun FAQ](http://babun.github.io/faq.html#_how_do_i_integrate_babun_with_conemu) but with the custom path.

* Task parameters: `/icon "C:\Portable\.babun\cygwin\bin\mintty.exe" /dir "C:\Portable"`
* Commands: `C:\Portable\.babun\cygwin\bin\mintty.exe`

  [1]: http://sourceforge.net/projects/conemu/ "ConEmu"
  [2]: http://babun.github.io/ "Babun"

