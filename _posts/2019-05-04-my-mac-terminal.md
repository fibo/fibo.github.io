---
title: My Mac Terminal configuration
tags:
  - Mac
  - Unix
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

## Shortcuts

### Switch language

I often need to switch language since the US keyboard is the best layout in my opinion for programming, so it is useful to have a shortcut.
Go to *System Preferences* > *Keyboard* > *Input Sources* and flag **Select the previous input source**.

![switch language shortcut](/images{{ page.id }}/switch_language_shortcut.png)

This is a good solution if you need to switch on two languages, in my case US an IT: the shortcut <kbd>CTRL</kbd> <kbd>SPACE</kbd> will do the trick.

### Screen recording

When I discover it I said:

> Yes, I ❤  Mac!

On Mojave you have a native screen recorder, invoke it with <kbd>COMMAND</kbd> <kbd>SHIFT</kbd> <kbd>5</kbd>. It also manage screeshots.

### Map Caps Lock to Escape

As a *Vim* user I cannot resist to [Map Caps Lock to Escape](https://vim.fandom.com/wiki/Map_caps_lock_to_escape_in_macOS).
Open *System Preferences > Keyboard*, click on *Modifier Keys*. Then choose to map *Caps Lock* to *Escape*.

![map caps lock to escake](/images{{ page.id }}/map_caps_lock_to_escape.png)

## Shell

I like simplicity, and *bash* is ok to me. But now Mac set *zsh* as default shell.
So, simpler solution wins! I switched to *zsh* too.

I am using the following configuration files:

- *~/.zshenv* which is sourced before and contains environment variables
- *~/.zshrc* for interactive shell configuration

### Locale

This tip can prevent many issues, add this to your *~/.zshenv* to specify a locale or change it accordingly.

```zsh
export LC_ALL=en_US.UTF-8
```

### Prompt

I could not find a zsh prompt that I like. Probably you will find one, there
are many that you may like.

I created my own. It is really minimal:
1. it shows only the current folder path but only its parent and the folder itself, not the complete path.
2. it shows the git branch if any.

Paste the following in your *~/.zshrc*.

```zsh
# Shell prompt
###
autoload -Uz vcs_info
precmd() { vcs_info }
zstyle ':vcs_info:git:*' formats '%b · '
setopt PROMPT_SUBST
PROMPT='${vcs_info_msg_0_}%2~/ '
```

Other zsh configurations I use

```zsh
# Do not enter command lines into the history list
# if they are duplicates of the previous event.
setopt histignorealldups

# CTRL-L to clear history and scrollback buffer
# Credits: https://unix.stackexchange.com/questions/517025/zsh-clear-scrollback-buffer
function clear-scrollback-buffer {
  clear && printf '\e[3J'
  zle && zle .reset-prompt && zle -R
}
zle -N clear-scrollback-buffer
bindkey '^L' clear-scrollback-buffer && history -p
```

### Autocompletion

Create a *~/.zsh* folder to contain autocompletion definitions and other zsh stuff

```zsh
mkdir ~/.zsh
```

The following code to your *~/.zshrc* will update `$fpath` adding the *~/.zsh* folder
where, in particular, you can write into.

```zsh
# Autocompletion
###
fpath=(~/.zsh $fpath)
autoload -Uz compinit
compinit -i
```

For example on [GitHub CLI documentation](https://cli.github.com/manual/gh_completion#zsh) they say

> Generate a _gh completion script and put it somewhere in your $fpath

In our case this translates to the following command

```zsh
gh completion -s zsh > ~/.zsh/_gh
```

To add *git* completion requires the following steps: get the completion scripts (both bash and zsh are required)

```zsh
curl -o ~/.zsh/_git https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.zsh
curl -o ~/.zsh/git-completion.bash https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash
```

And add the following to your *~/.zshrc*

```zsh
# git completion
zstyle ':completion:*:*:git:*' script ~/.zsh/git-completion.bash
```

Another nice autocompletion feature

```zsh
# Small letters will match small and capital letters
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
```

You may also want to take a look to [zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions/).

### Aliases

Cannot live without these aliases. Put them, in shared *~/.shell/aliases* and load them in *~/.zshrc* with `source ~/.shell/aliases`.

```sh
# Aliases
###

# Go to up folder
alias ',,'='cd .. && pwd'
# List files and folders
alias ','='ls -Galrth'

# Git
alias ga='git add .'
alias gc='git commit'
alias gd='git diff'
alias gl='git log --graph'
alias gpl='git pull'
alias gps='git push'
alias gpsf='git push --force-with-lease'
alias gs='git status'

# Use `vi` for NeoVim, `vim` for good old `Vim`.
alias vi='nvim '

# npm
alias ns='npm start'
alias nt='npm test'
```

Run also the following commands to set *git aliases*:

```sh
# Modify previous commit
git config --global alias.amend "commit --amend"
# List files with merge conflicts
git config --global alias.conflicts "diff --name-only --diff-filter=U"
# Undo previous commit
git config --global alias.undo "reset HEAD~1 --mixed"
```
