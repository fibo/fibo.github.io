---
title: Welcome to fish-shell
tags:
  - Unix
description: >
    When I started using the fish-shell and entered in a nice community
---

Yesterday I tryed the [fish-shell][1].

Well, in the morning I noticed that the Homepage was broken so I [opened an issue](https://github.com/fish-shell/fish-site/issues/32) and I got a really quick response.
I thought the following:

> there is one big internet community

where people help each other, in fact I can get a great piece of software and contribute back with a pr, opening an issue or whatever.

The community around [fish-shell][1] is part of that *big community*.
In the evening I was also contacted by [bucaran](http://bucaran.me) who is the author of many quality software projects, in particular [fisherman][2].

So, I was really stimulated from the first day and most of all: [fish-shell][1] looks great.

## First impressions

*Tab completions*, *autosuggestions* and *syntax highlighting* is really captivating! You can also update
it by parsing installed man pages with `fish_update_completion`.

*Web based configuration* with `fish_config` seems a good idea but I tried it and customized few things and got an issue in the configuration.
Don't worry, to reset configuration just launch `rm -rf $HOME/.config/fish`.

In general, [fish shell Design](http://fishshell.com/docs/current/design.html) is really interesting and fascinating.

### Cons

To be honest, right now I am missing my bash aliases and functionalities
but I guess this *nostalgia* will not last long.

[fish-shell][1] seems not linked to [GNU Readline](https://cnswww.cns.cwru.edu/php/chet/readline/rltop.html), so for example <kbd>CTRL-X-X</kbd> shortcut
which moves the cursor form the end of the line to the beginning and vice-versa does not work.

If I launch `vi /path/to/file` syntastic plugin complains

```
syntastic: error: your shell /usr/local/bin/fish can't handle traditional UNIX syntax for redirections
Press ENTER or type command to continue
```

However, if I use `vim` instead, it works.

## Setup

I tryed it on Linux and OSX. On OSX you can install it with [Homebrew](http://brew.sh/)

```
brew install fish
```

then to make it your default shell edit */etc/shells*, for instance with `sudo vi /etc/shells`,
and add the row

```
/usr/local/bin/fish
```

then run

```
chsh -s /usr/local/bin/fish
```

## Plugins

So let's try [fisherman][2], and let's trust its author too! Just launch

```
curl -L install.fisherman.sh | fish
```

<sub>(by the way, it works also from a bash shell :)</sub>

Ok ok, for those who do not feel comfortable with piping external content to their
shell: you are right! Take a look to [Installing fisherman](https://github.com/fisherman/fisherman/wiki/Installing-Fisherman) detailed instructions.

First thing I miss is [z](https://github.com/rupa/z) which I installed at path *~/.shell/z/z.sh*.

Install it with

```
fisher install oh-my-fish/plugin-z
```

Then configure it: create a file *~/.config/fisherman/conf.d/z.fish*and add the line

```
set -g Z_SCRIPT_PATH ~/.shell/z/z.sh
```

Yes, [fish-shell][1] can run bash programs, and furthermore my **z** history is shared among shells.

It's time to defeat bash nostalgia, let's install [Shellder](https://github.com/simnalamburt/shellder), a beautiful *powerline* prompt.
OSX Terminal supports powerline patched fonts, I chose *Roboto Mono Medium for Powerline* font.
You can get them from [powerline/fonts](https://github.com/powerline/fonts) repo.

Once you have the proper fonts installed, launch

```
fisher install shellder
```

and you will get this

![qs-install](https://cloud.githubusercontent.com/assets/8317250/12331695/fecb63ca-bb2d-11e5-960b-90198bc2bbf6.gif)

## Resources

* [awesome-fish](https://github.com/bucaran/awesome-fish).
* [fisherman][2].
* [Oh My Fish](https://github.com/oh-my-fish): The Fishshell Framework.

[1]: http://fishshell.com/ "fish-shell Homepage"
[2]: http://fisherman.sh/ "fisherman"

