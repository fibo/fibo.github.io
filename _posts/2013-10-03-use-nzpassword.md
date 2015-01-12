---
title: Use nzpassword!
tags:
  - Netezza
description: >
    How to authenticate securely on Netezza.
---

## Motivation

Automating authentication to a Netezza database from a shell session could expose your credentials.
If you write your password in your command line, other users could see your history.
If you write your password in a file, it can be seen as well.
Even if you set your `NZ_PASSWORD` environment variable, it can be seen by other users that have rights on */proc*.
The right and also the **most comfortable** way to perform a Netezza authentication is using `nzpassword`.

## Requirements

I assume you are on a Linux host, with Netezza tools like *nzpassword* and *nzsql*, in your path.
I recommend that Netezza tools are installed by root in the usual path, that is */usr/local/nz*. So, if you don't have nzpassword in your path, just to your *.bash_profile* something like this

## Set your environment

```bash
$ export NZ_HOST=netezza-twinfin-1.mycompany.com
$ export NZ_USER=pippo
$ export NZ_DATABASE=system
```

It is not specify to specify a database to use *nzpassword*, but, it is a good idea, so you can test it immediatly.

Set everything, except `NZ_PASSWORD`. You can check your environment like this

```bash
$ env | grep NZ
NZ_USER=pippo
NZ_HOST=netezza-twinfin-1.mycompany.com
NZ_DATABASE=system
```

## How to use nzpassword

### List cached passwords

```bash
$ env | grep NZ
NZ_USER=pippo
NZ_HOST=netezza-twinfin-1.mycompany.com
NZ_DATABASE=system
```

### Add a cached password

```bash
$ nzpassword add
```

### Add a cached password

If you add a cached password you will be prompted to add password once and in a secure way.
Since the environment is setted properly, it will be as easy as do

```bash
$ nzpassword add
Password:
```

Now you can see the authentication you just cached.

```bash
$ nzpassword
Host                           User
------------------------------ -------
netezza-skimmer-1.mycompany.com admin
netezza-twinfin-1.mycompany.com pippo
```

### Test your cached authentication

Since the environment is setted properly, it will be as easy as do

```bash
$ nzsql
Welcome to nzsql, the Netezza SQL interactive terminal.
Type:  \h for help with SQL commands
       \? for help on internal slash commands
       \g or terminate with semicolon to execute query
       \q to quit
SYSTEM(PIPPO)=>
```

### Remove a cached password

When you are done, just to

```bash
$ nzpassword delete
```

or even

```bash
$ nzpassword delete -all
```

You could also keep password cached and avoid writing Netezza users passwords in the config files of your scripts.
That is the way nerds like it :)

## See also

* [How to drop a user on Netezza](http://g14n.info/2013/12/how-to-drop-user-on-netezza)
* [SQL client for Netezza](http://g14n.info/2013/05/sql-client-for-netezza)
* [How to collect Netezza history](http://g14n.info/2013/12/how-to-collect-netezza-history)

