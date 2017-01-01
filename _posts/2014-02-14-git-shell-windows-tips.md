---
title: Git shell Windows tips
tags:
  - Git
  - Windows
description: >
    There are a lot of goodies and tips it is worth to know when you install Git shell on Windows.
---

## Requirements

<div class="alert warning">I assume your Windows Git shell is installed and properly configured.</div>

See [Getting started with Git shell on Windows][1] before reading this article.

## Tips

### Fix terminal warning

With some commands, like `less` or `git log` you can get this annoying warning

```
WARNING: terminal is not fully functional
-  (press RETURN)
```

You can fix it setting the environment variable `TERM=msys`. Make it permanent adding it to your *.bash_profile*, for instance

```bash
$ echo export TERM=msys >> $HOME/.bash_profile; source $HOME/.bash_profile
```

### Better vim colors

Vim is default editor for git. Every time you commit without a message, it will be open a vim session to let you write, but, on Windows git shell vim colors are .. well let me translate literally from italian ..  really **unwatchable**!

<div class="well">How to fix it?</div>


Create a *colors* folder and grab your favourite color scheme, for instance *desert*.
Then configure vim to use it.

```bash
$ mkdir /share/vim/vim73/colors
$ curl -o /share/vim/vim73/colors/desert.vim https://vim.googlecode.com/hg/runtime/colors/desert.vim
$ echo colorscheme desert >> $HOME/_vimrc
```

<div class="alert alert-success">Ok, you are done!</div>

If you use vim as editor for everything, like me, you can use this trick. Since git shell uses vim73, and **of course** I have vim74 I added this to the bottom of my *_vimrc*

```vim
if version < 704
  colorscheme desert
endif
```

So I can change colorscheme on my vim74, without the need to update msysgit */share/vim/vim73/colors* folder.

### Folder structure

I use to create a site.com folder in my $HOME dir, so when I open the git shell I can see a folder structure that tells me in which site the repo is hosted, so for example I have

*   github.com/
*   bitbucket.org/
*   code.google.com/

#### GitHub folder

Inside the `~/github.com/` folder I like to follow the same structure GitHub has serverside, so I have many user/repo folders

* github.com/
  * joyent/node
  * twbs/bootstrap
  * fibo/dflow
  * fibo/iper
  * fibo/mocha
  * visionmedia/mocha
  * visionmedia/express

that is useful cause I can differ from original to forked repo.

### GitHub clone utility

I use mainly [GitHub][2] to host my repos. I have many repos, and I use more than one location. If you are in the same situation you will find handy to add a bash function to clone quickly a repo of yours.

I use to put my repos in `~/github.com/<MY_USER_NAME>` folder.

Set *github.user* in your git config

```bash
$ git config --global github.user "fibo"
```

Now, if you add this function to your *.bash_profile*

```bash
GITHUB_DIR=$HOME/github.com
GITHUB_USER=$(git config github.user)

function clone () {
  REPO_NAME=$1

  TARGET_DIR=$GITHUB_DIR/$GITHUB_USER
  mkdir -p $TARGET_DIR

  # Choose one of the following lines as $REPO_URL
  REPO_URL=git@github.com:${GITHUB_USER}/${REPO_NAME}.git
  #REPO_URL=https://github.com/${GITHUB_USER}/${REPO_NAME}

  cd $TARGET_DIR
  git clone ${REPO_URL}
  cd $REPO_NAME
}
```

you will be able to clone repo *foo* and cd into it just launching


```bash
$ clone foo
```

## Tricks

### Enter /usr/lib folder

There seem to be a */usr* folder, if you launch

```bash
$ perl -e 'print join "\n", @INC'
/usr/lib/perl5/5.8.8/msys
/usr/lib/perl5/5.8.8
/usr/lib/perl5/site_perl/5.8.8/msys
/usr/lib/perl5/site_perl/5.8.8
/usr/lib/perl5/site_perl
.
```

but it cannot be listed if you launch `ls /`. Anyway, you can enter it even if autocompletion will not work, just launch

```bash
$ cd /usr/lib
```

### Bypass restrictive firewall settings

If you are behind a firewall that does not allow connections on **port 22** (that's my case at my job place), when you try to clone a repo you can get an error message like this

```
ssh: connect to host github.com port 22: Bad file number
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

To work around it, you need to edit file `$HOME/.ssh/config`. For example, if you need to clone a repo from [GitHub][2] add this content.

```
Host github.com
  Hostname ssh.github.com
  Port 443
```

For more information see: [Using SSH over the HTTPS port](https://help.github.com/articles/using-ssh-over-the-https-port).

## Goodies

### cURL

*Git shell* gives you the awesome [curl](http://curl.haxx.se/) command on Windows!

> curl is a command line tool for transferring data with URL syntax, supporting DICT, FILE, FTP, FTPS, Gopher, HTTP, HTTPS, IMAP, IMAPS, LDAP, LDAPS, POP3, POP3S, RTMP, RTSP, SCP, SFTP, SMTP, SMTPS, Telnet and TFTP. curl supports SSL certificates, HTTP POST, HTTP PUT, FTP uploading, HTTP form based upload, proxies, cookies, user+password authentication (Basic, Digest, NTLM, Negotiate, kerberos...), file transfer resume, proxy tunneling and a busload of other useful tricks.

### find

*Git shell* gives you the power of [find](http://en.wikipedia.org/wiki/Find) command-line utility on Windows!


[1]: {% post_url 2013-04-27-getting-started-with-git-shell %}
[2]: https://github.com/

