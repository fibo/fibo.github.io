---
title: GNU Screen
tags:
  - Unix
description: >
    Be a cowboy console, use GNU Screen!
---

Multiply your productivity by using a [terminal multiplexer](http://en.wikipedia.org/wiki/Terminal_multiplexer).

Yes, I know. It also exists [tmux](http://tmux.sourceforge.net/) but I flipped a coin and (by now ^:) chose [GNU Screen][1].

> Screen is a full-screen window manager that multiplexes a physical terminal between several processes (typically interactive  shells).

## Take a tour

Run all commands in this section to take a tour of basic *screen* usage.

Start with a simple *screen* customization, create a *~/.screenrc* with the following content

```bash
vbell off     # Turns visual bell off
shell -$SHELL # load shell profile
```

To start screen, just launch

```bash
$ screen
```

Display help with <kbd>CTRL-a ?</kbd>.

All screen commands are prefixed by <kbd>CTRL-a</kbd>, written in the help as `^A`.

You can give a name to the session

```bash
$ screen -S myFirstScreenSession
```

List running sessions

```bash
$ screen -ls
```

You can also start a session with a command, for example

```bash
$ screen -S install sudo apt-get install -y git
```

Detach from current session with <kbd>CTRL-a d</kbd>.

Attach to a running session

```bash
$ screen -x pst-0
```

## References

* [Screen quick reference][2]
* [In Unix, what is screen, and how do I use it?][3]

## See also

* [Screen User's Manual][4]
* [A nice default screenrc][5]

  [1]: http://www.gnu.org/software/screen/ "GNU Screen"
  [2]: http://aperiodic.net/screen/quick_reference "Screen quick reference"
  [3]: https://kb.iu.edu/d/acuy "In Unix, what is screen, and how do I use it?"
  [4]: http://www.gnu.org/software/screen/manual/screen.html "Screen User's Manual"
  [5]: https://gist.github.com/ChrisWills/1337178 "A nice default screenrc"

