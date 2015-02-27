---
title: My Putty settings
tags:
  - Windows
  - Software
  - Putty
description: >
    Putty configuration tips.
---

## Get Putty

[Putty][1] is a free (MIT-licensed) Win32 Telnet and SSH client. You need it if you want to use a terminal on Windows, I mean a **real** terminal, *MS/DOS* is not decent.

Check also [PuttyTray](https://puttytray.goeswhere.com/).

## Regedit

For the impatient: copy the following content in a *.reg* file. To import it in regedit, right click on it and choose *merge* on the contextual menu.

It will overwrite the *Default Settings* configuration, details are in [Configuration summary](#configuration-summary).

```
Windows Registry Editor Version 5.00

; This is a comment

[HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\Sessions\Default%20Settings]
"FullScreenOnAltEnter"=dword:00000001
"Font"="Consolas"
"FontIsBold"=dword:00000000
"FontCharSet"=dword:00000000
"FontHeight"=dword:0000000c
"FontQuality"=dword:00000003
"FontVTMode"=dword:00000004
"UseSystemColours"=dword:00000000
"TryPalette"=dword:00000000
"ANSIColour"=dword:00000001
"Xterm256Colour"=dword:00000001
"BoldAsColour"=dword:00000000
"Colour0"="211,208,200"
"Colour1"="242,240,236"
"Colour2"="45,45,45"
"Colour3"="116,115,105"
"Colour4"="0,0,0"
"Colour5"="252,151,31"
"Colour6"="45,45,45"
"Colour7"="116,115,105"
"Colour8"="242,119,122"
"Colour9"="249,145,87"
"Colour10"="153,204,153"
"Colour11"="102,179,102"
"Colour12"="255,204,102"
"Colour13"="255,189,51"
"Colour14"="102,153,204"
"Colour15"="160,159,147"
"Colour16"="204,153,204"
"Colour17"="232,230,223"
"Colour18"="102,204,204"
"Colour19"="210,123,83"
"Colour20"="211,208,200"
"Colour21"="242,240,236"
"LineCodePage"="UTF-8"
"UTF8Override"=dword:00000001
"X11Forward"=dword:00000001
```

## Configuration summary

### Window

#### Appearance

Use a [monospaced font](http://en.wikipedia.org/wiki/Monospaced_font), for instance *Consolas* with 12 point size.

Choose *ClearType* as font quality.

Check the *Hide mouse pointer when typing window* flag.



#### Behaviour

Check the *Full screen on Alt-Enter* flag.

#### Translation

Choose *UTF-8* encoding.

#### Colours

[Putty][1] default colours are not the best choice. Since folders are *blue* on a *black* background, the output of a simple `ls` is really hard to see.

The fastest workaround is to flag *Use system colours*.

You will joy a better color theme, for example this one taken from [base16-mintty]( https://github.com/geoffstokes/base16-mintty/blob/master/base16-eighties.minttyrc). See also [chriskempson/tomorrow-theme](https://github.com/chriskempson/tomorrow-theme) too see how it looks like.


| Colour name               | R | G | B |
 ---------------------------|---|---|---|
| Default Foreground        |211|208|200|
| Default Bold Foreground   |242|240|236|
| Default Background        | 45| 45| 45|
| Default Bold Background   |116|115|105|
| Cursor Text               |  0|  0|  0|
| Cursor Colour             |252|151| 31|
| ANSI Black                | 45| 45| 45|
| ANSI Black Bold           |116|115|105|
| ANSI Red                  |242|119|122|
| ANSI Red Bold             |249|145| 87|
| ANSI Green                |153|204|153|
| ANSI Green Bold           |102|179|102|
| ANSI Yellow               |255|204|102|
| ANSI Yellow Bold          |255|189| 51|
| ANSI Blue                 |102|153|204|
| ANSI Blue Bold            |160|159|147|
| ANSI Magenta              |204|153|204|
| ANSI Magenta Bold         |232|230|223|
| ANSI Cyan                 |102|204|204|
| ANSI Cyan Bold            |210|123| 83|
| ANSI White                |211|208|200|
| ANSI White Bold           |242|240|236|

### Connection

#### Data

Flag *Use system username* in the *When username is not specified* combo box.

#### SSH

##### X11

Flag the *Enable X11 forwarding* option if you want to launch graphic programs.

Install some X Server for Windows. For example you can use [XMing](http://www.straightrunning.com/XmingNotes/): you need to donate to download the *Website release*. I used an [older release on SourceForge](http://sourceforge.net/projects/xming/): I flagged the *Don't install an SSH client* installer option.

Then start XMing and connect with PuTTY to the remote server: now you can launch any graphic application, try with *Xeyes*.

![Xeyes][2]

## Tips

### Automate login

It is not considered really secure, but, if you are not paranoic this is a really good tip.

Create a shortcut to Putty, you know, right click on it an send to Desktop. Then right click the shortcut and edit the *Target* entry adding `-pw` and `-ssh` flags with *user* and *hostname* arguments, something like

```
"C:\Program Files (x86)\PuTTY\putty.exe" -ssh -pw s3cr3t user@server01.example.com
```

Voilà! Now you can connect just clicking on the shortcut. Even better:

* rename your shortcut as `user@hostname` argument, for instance *user@server01.example.com*
* on Windows 8, right click the shortcut and *Pin to Start*

Now you can access **really quickly** to your connection: <kbd>HOST + user@serv ...</kbd>

  [1]: http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html
  [2]: http://upload.wikimedia.org/wikipedia/commons/2/2e/Xeyes.png

