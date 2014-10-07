---
title: Install Node.js without sudo
tags:
  - Node
description: >
    This is a straightforward Node.js installation, just copy and paste the commands in your shell prompt. Root permissions are not required
---

<div class="alert alert-warning">The first and the last installation steps are necessary <strong>only</strong> during first installation.When you wish to upgrade to latest version, just repeat steps


<ul>
<li><a href="#get-it">Get it</a></li>
<li><a href="#build-it">Build it</a></li>
<li><a href="#update-it">Update it</a></li>
</ul>
</div>


## Prerequisites

I assume you are on a Unix-like host, with a bash shell, wget, tar, an Internet connection and that your $HOME environment variable is defined properly. You will need Python >= 2.6 and all the prerequisites necessary to build [Node.js][1] from sources: check out the [Installation page on Node.js wiki](https://github.com/joyent/node/wiki/Installation).

## Wanna Node NOW!

For the impatient, just copy the following commands and paste it in your shell prompt

```bash
NODEJS_ROOT=${NODEJS_ROOT:-~/nodejs}
cd /tmp
wget -N http://nodejs.org/dist/node-latest.tar.gz && tar xzf node-latest.tar.gz
NODEJS_CURRENT=$(tar tf node-latest.tar.gz|head -1)
mkdir -p $NODEJS_ROOT/$NODEJS_CURRENT
cd $NODEJS_CURRENT
./configure --prefix=$NODEJS_ROOT/$NODEJS_CURRENT && make install
cd $NODEJS_ROOT
rm current 2> /dev/null # Removes current symbolic link, if any
ln -s $NODEJS_CURRENT current
echo Do not forget to edit your environment http://www.g14n.info/2013/01/install-nodejs-without-sudo.html#edit-your-environment
echo Happy coding!
```

<div class="alert alert-danger"><p>If it is the first time you install <a href="http://nodejs.org/">Node.js</a> for that user in that host, go to <a href="#edit-your-environment">Edit your environment</a> section, otherwise you will miss <em>node</em> binary in your <em>PATH</em>.</p></div>

Note that, before launching commands, you can set *NODEJS_ROOT* environment variable to point to your target location otherwise it will default to *~/nodejs*.

## Installation steps

### Situate it

<span class="badge">Only once</span>

Choose your local folder, wherever you have enough space and read/write rights. Set a *NODEJS_ROOT* environment variabile, so you can use it during installation process.

```bash
$ NODEJS_ROOT=~/nodejs # or whatever
```

### Get it

Go to a temporary folder, */tmp* for instance and get latest [Node.js][1] source.

You will see a *node-vX.Y.Z* folder, that is *node-v0.8.17* right now, containing the latest [Node.js][1] sources. The `-N` flag, will overwrite file and download it only if it is newer.

```bash
$ cd /tmp
$ wget -N http://nodejs.org/dist/node-latest.tar.gz && tar xzf node-latest.tar.gz
```

### Build it

Now, figure out what is current version so you can point to the target directory (a.k.a. **prefix**) and compile [Node.js][1] sources.

```bash
$ NODEJS_CURRENT=$(tar tf node-latest.tar.gz|head -1)
$ mkdir -p $NODEJS_ROOT/$NODEJS_CURRENT
$ cd $NODEJS_CURRENT
$ ./configure --prefix=$NODEJS_ROOT/$NODEJS_CURRENT && make install
```

### Update it

When compilation ends successful, update or create a simbolic link to your current installation. This will make it easier to upgrade to next version.

```bash
$ cd $NODEJS_ROOT
$ rm current 2> /dev/null # Removes current symbolic link, if any
$ ln -s $NODEJS_CURRENT current
```

### Edit your environment

<span class="badge">Only once</span>

Add permanently *NODEJS_ROOT* variable to your environment, and add *node* and *npm* binaries to your *PATH*. This is one way to do it:

```bash
$ echo "export NODEJS_ROOT=$NODEJS_ROOT"            >> $HOME/.bash_profile
$ echo 'export PATH=$NODEJS_ROOT/current/bin:$PATH' >> $HOME/.bash_profile
$ source $HOME/.bash_profile # reload your env, so you can use node right now
```

## See also

* [Node ecosystem](http://www.g14n.info/2014/01/node-ecosystem.html)
* [Create an npm package](http://www.g14n.info/2014/01/create-npm-package.html)
* [Livereload with grunt](http://www.g14n.info/2013/12/livereload-with-grunt.html)
* [Badges everywhere](http://www.g14n.info/2014/01/badges-everywhere.html)
* [NodeICO badges](http://www.g14n.info/2013/12/nodeico-badges.html)
* [Node class template](http://www.g14n.info/2014/01/node-class-template.html)


  [1]: http://nodejs.org/


