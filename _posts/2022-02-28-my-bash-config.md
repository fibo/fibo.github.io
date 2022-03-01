---
title: My Bash configuration
tags:
  - Unix
description: >
     Few tips I want to remember about bash configuration
---

## Locale

This tip can prevent many issues, add this to your *.bash_profile* to specify a locale or change it accordingly.

```bash
export LC_ALL=en_US.UTF-8
```


## Auto completion

Create a *~/.bash/completion* folder and copy there files [npm](https://github.com/fibo/home/blob/home/.bash/completion/npm) and [git-completion.bash](https://github.com/fibo/home/blob/home/.bash/completion/git-completion.bash) then add these lines to your *.bash_profile*.

```bash
source ~/.bash/completion/npm
source ~/.bash/completion/git-completion.bash
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

## Latest bash on Mac

<div class="paper warning">
Currently Mac supports <em>zsh</em> by default. Due to licensing (GPL3 in latest bash) probably it could be completely removed. Consider the instructions below as <b>legacy</b>.
</div>

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
