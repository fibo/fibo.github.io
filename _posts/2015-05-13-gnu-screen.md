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
$ screen -S mySecondScreenSession
```

List running sessions

```bash
$ screen -ls
There are screens on:
        16704.mySecondScreenSession      (Attached)
        16562.pts-3.server01    (Attached)
2 Sockets in /var/run/screen/S-user.
```

Detach from current session with <kbd>CTRL-a d</kbd>.

Attach to a running session

```bash
$ screen -x pst-3
```

## Use case

Suppose you need to login as *user1* in some host, then you can switch to user *user2*, *user3* … *userN*.

<div class="alert alert-danger">Do not follow this instructions if any of the users is <em>root</em>.</div>

As *user1* start a named screen session and switch to *user2*

```bash
$ screen -S user2
$ su - user2
```

then detach with <kbd>CTRL-a d</kbd> and you are back to *user1* session.

Repeat the analogous commands for *user3*, till *userN*.

You get a screen session for every user. Now you do not need to enter passwords again
and if the connection is broken you can enter again as *user1* then go to *user2* with

```bash
$ screen -x user2
```

## Tips

### Resize split window

Split window with <kbd>CTRL-a S</kbd>. It creates a new region below.
Go to new region with <kbd>CTRL-a TAB</kbd>.
The region is empty, create a new window inside it with <kbd>CTRL-a c</kbd>
Resize region by entering a screen command with <kbd>CTRL-a :</kbd>,
then type for example `resize -5` to reduce region height by five rows.

This is very useful if you want a separated window where you launch tasks like running tests, watch files for changes, tail logs, etc.

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

