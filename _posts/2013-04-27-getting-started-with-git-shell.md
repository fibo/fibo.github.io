---
title: Getting started with Git shell on Windows
tags:
  - Git
  - Windows
description: >
   This is a step by step guide to help you getting started with git on Windows.
---

![Git logo](http://git-scm.com/images/logo@2x.png)

## Install the git shell

There is a fresh Github gui for Windows as well as many other graphic interfaces, but, git was designed to be used from a shell: remember that it was the version control system that Linus Torvalds wrote to develop Linux.

It is much more expressive using it from command line, and to mock up a gui with all those features and options would be completely insane.

So, use the <span style="font-size: large;">ghost in the shell</span>.

Go to [Git for Windows platform download page](http://git-scm.com/download/win) and get the last installer: at the time of this writing is

> Git-1.8.5.2-preview20131230.exe

just hit the *Next* button and trust defaults.

## Configuration

<div class="paper warning">All the following commands should be launched from a <strong>git shell</strong>.</div>

### Basics

First of all, know your current configuration.

```sh
git config --list
```

Add your user *name* and *email*, for instance

```sh
git config --global user.email "fibo@users.noreply.github.com"
git config --global user.name "fibo"
```

<div class="paper info">
The email used in the commands is the default email you get from GitHub. Of course you need to set your actual email as well as your name, <b>do not use fibo</b>
</div>

### SSH public key based authentication


This step is not required, but, it is really usefull. You can generate an ssh key to bypass authenitcation prompt, i.e. insert your username and password everytime you push to remote server.

#### Create an ssh key


You need an ssh key if you want to authenticate easily on a [web-based hosting service](http://en.wikipedia.org/wiki/Shared_web_hosting_service), like GitHub.

```sh
ssh-keygen -t rsa -C "fibo@users.noreply.github.com"
```

By now I just hit enter three times, even when prompted for a passphrase.

For more information about passphrase see: [Working with SSH key passphrases](https://help.github.com/articles/working-with-ssh-key-passphrases).

#### Add your ssh key on your hosting service

You need to copy the content of you id_rsa.pub. The easiset way to copy it, if you have the **clip.exe** command is

```sh
clip < $HOME/.ssh/id_rsa.pub
```

which will copy your public key to the clipboard so you can edit your hosting service's account preferences and paste it after you add a new ssh key.

For example, on GitHub is under the [SSH keys profile settings menu](https://github.com/settings/ssh).

#### Check it

You can check your ssh key is working, using `ssh -T`, for instance

```sh
$ ssh -T git@github.com
The authenticity of host 'github.com (204.232.175.90)' can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'github.com,204.232.175.90' (RSA) to the list of know
n hosts.
Hi fibo! You've successfully authenticated, but GitHub does not provide shell ac
cess.
```

or even

```sh
$ ssh -T git@bitbucket.org
conq: logged in as fibo.  You can use git or hg to connect to Bitbucket. Shell access is disabled.
```

<div class="paper warning">If the check above does not work, probably your <strong>firewall does not allow connections on  port 22</strong>.</div>

Read [Bypass restrictive firewall settings]({% post_url 2014-02-14-git-shell-windows-tips %}#bypass-restrictive-firewall-settings) instructions to work around it.

