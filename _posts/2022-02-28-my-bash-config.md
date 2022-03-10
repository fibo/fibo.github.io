---
title: My Bash configuration
tags:
  - Unix
description: >
     Few tips I want to remember about bash configuration
---

## Locale

This tip can prevent many issues, add this to your *~/.bashrc* to specify a locale or change it accordingly.

```bash
export LC_ALL=en_US.UTF-8
```


## Auto completion

Create a *~/.bash/completion* folder and copy there files [npm](https://github.com/fibo/home/blob/home/.bash/completion/npm) and [git-completion.bash](https://github.com/fibo/home/blob/home/.bash/completion/git-completion.bash) then add these lines to your *~/.bashrc*.

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

Then configure it adding to your *~/.bashrc*

```bash
export GITAWAREPROMPT=~/.bash/git-aware-prompt
source "${GITAWAREPROMPT}/main.sh"
export PS1="\u@\h \[$txtgrn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
```

## SSH agent

When you generate an SSH key you should use a passphrase. Using an *SSH agent* you can
provide the required passphrase **once** when you start your first bash session
(rather than, for example, at every git commit).

I copied the following script from GitHub documentation... now I cannot find it online.

Create a *~/.ssh/agent* file

```bash
# Note: ~/.ssh/environment should not be used, as it
#       already has a different purpose in SSH.

env=~/.ssh/agent.env

# Note: Don't bother checking SSH_AGENT_PID. It's not used
#       by SSH itself, and it might even be incorrect
#       (for example, when using agent-forwarding over SSH).

agent_is_running() {
    if [ "$SSH_AUTH_SOCK" ]; then
        # ssh-add returns:
        #   0 = agent running, has keys
        #   1 = agent running, no keys
        #   2 = agent not running
        ssh-add -l >/dev/null 2>&1 || [ $? -eq 1 ]
    else
        false
    fi
}

agent_has_keys() {
    ssh-add -l >/dev/null 2>&1
}

agent_load_env() {
    . "$env" >/dev/null
}

agent_start() {
    (umask 077; ssh-agent >|"$env")
    . "$env" >/dev/null
}

if ! agent_is_running; then
    agent_load_env
fi

# if your keys are not stored in ~/.ssh/id_rsa or ~/.ssh/id_dsa, you'll need
# to paste the proper path after ssh-add
if ! agent_is_running; then
    agent_start
    ssh-add
elif ! agent_has_keys; then
    ssh-add
fi

unset env
```

Add this to your *~/.bashrc*

```bash
if [ -f ~/.ssh/agent ]; then
  . ~/.ssh/agent
fi
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
