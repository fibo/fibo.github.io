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

## Shell

I like simplicity, and *bash* is ok to me. But now Mac set *zsh* as default shell.
So, simpler solution wins! I switched to *zsh* too.

I am using the following configuration files:

- *~/.zshenv* which is sourced before and contains environment variables
- *~/.zshrc* for interactive shell configuration

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
PROMPT='${vcs_info_msg_0_}%2~ '
```

### Autocompletion

Create a *~/.zsh* folder to contain autocompletion definitions and other zsh stuff

```zsh
mkdir ~/.zsh
```

The following code to your *~/.zshrc* will update `$fpath` adding the *~/.zsh* folder
where, in particular, you can write into.

```zsh
fpath=(~/.zsh $fpath)
autoload -Uz compinit
compinit -i
```

For example on GitHub CLI documentation [here](https://cli.github.com/manual/gh_completion#zsh)
they say

> Generate a _gh completion script and put it somewhere in your $fpath

In our case this translates to the following command

```zsh
gh completion -s zsh > ~/.zsh/_gh
```

Another nice autocompletion feature

```zsh
# Small letters will match small and capital letters
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Za-z}'
```

### Aliases

Cannot live without these aliases. Put them, for instance, in your *~/.zshrc*.

```bash
alias vi='nvim '

alias ls='ls -G'
alias ',,'='cd .. && pwd'
alias ','='ls -Galrth'

alias ga='git add .'
alias gd='git diff'
alias gc='git commit '
alias gl='git log --graph'
alias gpl='git pull '
alias gps='git push '
alias gs='git status'

alias ns='npm start'
alias nt='npm test'
```

Run also the following commands to set *git aliases*:

```bash
# Modify previous commit
git config --global alias.amend "commit -a --amend"
# List files with merge conflicts
git config --global alias.conflicts "diff --name-only --diff-filter=U"
# Reset previous commit, but keep all the changes from that commit in the working directory.
git config --global alias.undo "reset HEAD~1 --mixed"
```

## Other tips

### Switch language shortcut

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

## Dev tools

### NVM

I am using [NVM](https://github.com/nvm-sh/nvm) to manage different versions of *Node.JS*.

I also want to switch to *Node.JS* version automatically when I enter a folder
containing a *.nvmrc* file.

Once installed I add the following to my *~/.zshrc*

```zsh
# Node Version Manager
# https://github.com/nvm-sh/nvm
###
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# invoke `nvm use` automatically in a directory with a .nvmrc file
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use --silent
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    nvm use default --silent
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc
```

### direnv

It happens often that different projects need some specific environment variables.
I found [direnv](https://direnv.net/) the perfect tool to achieve that.

After installing it, for example with homebrew

```bash
brew install direnv
```

Add it to your *~/.zshrc*

```zsh
# direnv
# https://direnv.net/
###
eval "$(direnv hook zsh)"
```
