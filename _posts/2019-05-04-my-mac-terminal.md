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
alias vi='nvim '

alias ls='ls -G'
alias ',,'='cd .. && pwd'
alias ','='ls -Galrth'

alias ga='git add .'
alias gd='git diff'
alias gc='git commit '
alias gl='git log'
alias gpl='git pull '
alias gps='git push '
alias gs='git status'

alias ns='npm start'
alias nt='npm test'
```

## Auto completion

Create a *~/.bash/completion* folder and copy there files [npm](https://github.com/fibo/home/blob/home/.bash/completion/npm) and [git-completion.bash](https://github.com/fibo/home/blob/home/.bash/completion/git-completion.bash) then add these lines to your *.bash_profile*.

```bash
source ~/.bash/completion/npm
source ~/.bash/completion/git-completion.bash
```

## Locale

This tip can prevent many issues, add this to your *.bash_profile* to specify a locale or change it accordingly.

```bash
export LC_ALL=en_US.UTF-8
```

## Other tips

### Switch language shortcut

I often need to switch language since the US keyboard is the best layout in my opinion for programming, so it is useful to have a shortcut.
Go to *System Preferences* > *Keyboard* > *Input Sources* and flag **Select the previous input source**.

![siwtch language shortcut](/images{{ page.id }}/switch_language_shortcut.png)

This is a good solution if you needd to switch on two languages, in my case US an IT: the shortcut <kbd>CTRL</kbd> <kbd>SPACE</kbd> will do the trick.

### Screen recording

When I discover it I said:

> Yes, I ❤  Mac!

On Mojave you have a native screen recorder, invoke it with <kbd>COMMAND SHIFT 5</kbd>. It also manage screeshots.

