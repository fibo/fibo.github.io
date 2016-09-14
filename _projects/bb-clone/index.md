---
title: bb-clone
---
# bb-clone

> Bitbucket clone repo util

[![KLP](https://img.shields.io/badge/kiss-literate-orange.svg)](http://g14n.info/kiss-literate-programming)

Very simple bash function that let you quickly clone git your repositories
stored on Bitbucket.

See also [gh-clone](http://g14n.info/gh-clone) twin project, which do the
same but on GitHub.

## Annotated source

`bb-clone` expects one parameter, otherwise prints its **usage**

    if [ -z "$1" ]
    then
    	cat <<-EOF
    	# Bitbucket clone repo util
    	##
    	# Installation instructions, source and license available here:
    	# https://github.com/fibo/bb-clone#bb-clone
    	##
    	USAGE: bb-clone [user/]repo
    	EOF
    	return 0
    fi

Repos will be cloned under folder `$BITBUCKET_DIR` which defaults to *~/bitbucket.org*.

    BITBUCKET_DIR=${BITBUCKET_DIR:-~/bitbucket.org}

`MY_BITBUCKET_USER` is prompted once, if not already configured.

    MY_BITBUCKET_USER=$(git config --global bitbucket.user)
    if [ -z "$MY_BITBUCKET_USER" ]
    then
    	read -p "Enter your bitbucket.user: " MY_BITBUCKET_USER
    	git config --global bitbucket.user $MY_BITBUCKET_USER
    fi

Parse parameter which can be given in the form `$BITBUCKET_USER/$REPO_NAME` or just `$REPO_NAME`.

    BITBUCKET_USER=$(echo $1 | cut -d / -f1)
    REPO_NAME=$(echo $1 | cut -d / -f2)

In the latter case `$BITBUCKET_USER` defaults to `$MY_BITBUCKET_USER`.

    if [ "$REPO_NAME" == "$BITBUCKET_USER" ]
    then
    	BITBUCKET_USER=$MY_BITBUCKET_USER
    fi

Clone repo under `$BITBUCKET_DIR/$BITBUCKET_USER/$REPO_NAME` and cd into it.
Use `git clone --recursive` to initialize and updated submodules.

    TARGET_DIR=$BITBUCKET_DIR/$BITBUCKET_USER
    mkdir -p $TARGET_DIR
    cd $TARGET_DIR
    REPO_URL=git@bitbucket.org:$BITBUCKET_USER/${REPO_NAME}.git
    git clone --recursive $REPO_URL && cd $REPO_NAME

**Bonus feature**: run `npm install` if it looks like a Node project and
there is some *npm* available.

    if [ -e package.json ]
    then
    	NPM=$(which npm 2> /dev/null)
    	if [ ! -z "$NPM" ]
    	then
    		$NPM install
    	fi
    fi

… and run `bower install` if  there is a *bower.json* anb *bower* is found in your `PATH`.

    if [ -e bower.json ]
    then
    	BOWER=$(which bower 2> /dev/null)
    	if [ ! -z "$BOWER" ]
    	then
    		$BOWER install
    	fi
    fi

Clean up

    unset BOWER
    unset BITBUCKET_DIR
    unset BITBUCKET_USER
    unset MY_BITBUCKET_USER
    unset NPM
    unset REPO_NAME
    unset REPO_URL
    unset TARGET_DIR

## Installation

Instructions borrowed from [git-aware-prompt](https://github.com/jimeh/git-aware-prompt#installation).

```bash
mkdir -p ~/.bash
cd ~/.bash
git clone git://github.com/fibo/bb-clone.git
```

Edit your *~/.bash_profile* or *~/.profile* and add the following

```bash
source ~/.bash/bb-clone/fun.sh
```

## License

[MIT](http://g14n.info/mit-license)

