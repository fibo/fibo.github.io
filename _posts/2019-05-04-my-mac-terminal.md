---
title: My Mac Terminal configuration
tags:
  - Mac
description: >
     Mac Terminal is the Non Plus Ultra. Let me share my configuration, in particular I want to remember that font! R.I.P. Steve.
---

## Appearance

Ok, let me get this straight: I use the *Pro* terminal profile. I always loved transparency effect in terminals.

Then I want a nice monospace font, possibly with ligatures. Go for [FiraCode](https://github.com/tonsky/FiraCode) by [tonsky](https://tonsky.me).
Font size, of course, is up to you: mine is *14 pt*. Turn on *Antialias text*.

Another default configuration that I suggest to change is:

* When the shell exits
  - [x] Close if the shell exited cleanly.

I often use <kbd>CTRL</kbd> <kbd>D</kbd> to close the shell, and I mean it so no confirmation is required.

## Latest bash

Bash version provided by default on a Mac, at the time of this writing (with Mojave) is still *3.2*. Let's install latest!
With [brew](https://brew.sh) do

```bash
brew install bash
```

Edit */etc/shells* and add this line

```
/usr/local/bin/bash
```

For instance you can do something like

```bash
sudo echo /usr/local/bin/bash >> /etc/shells
```

Now set it as you default shell

```bash
chsh -s /usr/local/bin/bash $USER
```

Now quit Terminal and re-open it! Check if all ok?

```bash
echo $BASH_VERSION
```

## Git Aware Prompt

Thanks to [jimeh/git-aware-prompt](https://github.com/jimeh/git-aware-prompt) you can

> Display current Git branch name in your terminal prompt when in a Git working directory.

Install with the following commands

```bash
mkdir -p ~/.bash
cd ~/.bash
git clone git://github.com/jimeh/git-aware-prompt.git
```

Then configure it adding to your *.bash_profile*

```bash
export GITAWAREPROMPT=~/.bash/git-aware-prompt
source "${GITAWAREPROMPT}/main.sh"
export PS1="\u@\h \[$txtgrn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
```

## Aliases

Cannot live without these aliases

```bash
alias ls='ls -G'

alias ga='git add '
alias gd='git diff'
alias gc='git commit '
alias gl='git log'
alias gpl='git pull '
alias gps='git push '
alias gs='git status'

alias ns='npm start'
alias nt='npm test'
```
