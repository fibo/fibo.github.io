---
title: Install WebLogic 12c
tags:
  - Web development
  - Software
description: >
    How to install WebLogic 12c development version on Linux RedHat.
---

## Goal

Reading this article you will be able to perform a WebLogic 12c installation on a development server with a single WebLogic domain.

## Requirements

I assume the installation will be in */opt* folder and there is enough space, at least 1Gb

```bash
# du -sh /opt/*
0       /opt/java
26M     /opt/JDBC
286M    /opt/jdk1.7.0_71
20K     /opt/lost+found
539M    /opt/weblogic
```

I also assume *Java JDK 1.7* is installed and a symbolic link */opt/java* points to the current version, something like

```bash
$ ls -l /opt/|grep jdk
lrwxrwxrwx. 1 root     root        11 Nov 19 12:34 java -> jdk1.7.0_71
drwxr-xr-x. 8 root     root      4096 Sep 27 02:14 jdk1.7.0_71
```

Get files from [Apache Ant][1] and [Oracle][2] download pages. You will need an Oracle account, note also that, WebLogic is licensed **only for development** purpouse. For production environment you will need to purchase a license.

Copy files *apache-ant-1.9.4-bin.zip* and *wls1213_dev.zip* to */tmp* path on target host, for instance *host.example.com* and create folders *weblogic* user will own.

```bash
$ sudo su -
# mkdir /opt/weblogic
# chown weblogic /opt/weblogic
# mkdir /opt/weblogic/domain
```

Note that the domain folder must be a subfolder of a folder the *weblogic* user can read/write or the domain creation will fail.

## Installation

Perform installation with *weblogic* user. Extract archives

```bash
# sudo su - weblogic
$ cd /opt/weblogic
$ unzip /tmp/apache-ant-1.9.4-bin.zip
$ unzip /tmp/wls1213_dev.zip
```

Edit *.bash_profile* and add the following lines

```
export JAVA_HOME=/opt/java
export PATH=$PATH:$JAVA_HOME/bin

export ANT_HOME=/opt/weblogic/apache-ant-1.9.4
export PATH=$PATH:$ANT_HOME/bin

# default is
#                      -Xms256m  -Xmx512m  -XX:CompileThreshold=8000 -XX:PermSize=128m   -XX:MaxPermSize=256m
export USER_MEM_ARGS=" -Xms1024m -Xmx2048m -XX:CompileThreshold=8000 -XX:PermSize=1024m  -XX:MaxPermSize=2048m "

alias start_weblogic='nohup /opt/weblogic/domain/bin/startWebLogic.sh > $HOME/start_weblogic.nohup 2>&1 &'
alias stop_weblogic='/opt/weblogic/domain/bin/stopWebLogic.sh'
```

then source it

```bash
$ source $HOME/.bash_profile
```

Configure WebLogic

```bash
$ export MW_HOME=/opt/weblogic/wls12130
$ cd $MW_HOME
$ . ./configure.sh

Do ```you want to configure a new domain?  [y/n]? n
```

Answer **n** otherwise it will be created a domain under the *MW_HOME* which is not recommended (see $MW_HOME/README.txt).

## Create a domain

```bash
$ cd /opt/weblogic/domain
$ $JAVA_HOME/bin/java $JAVA_OPTIONS -Xmx1024m -XX:MaxPermSize=256m weblogic.Server

Would you like the server to create a default configuration and boot?  (y/n): y

Enter username to boot WebLogic server:weblogic
Enter password to boot WebLogic server:
For confirmation, please re-enter password required to boot WebLogic server:
```

where I use the same Unix *weblogic* credentials for the WebLogic *weblogic* user.

It will take some time (approx 30 min.)

When you see message

```
Server state changed to RUNNING
```

login to http://host.example.com:7001/console with *weblogic* user credentials.
*weblogic* user.

Finally login with another session as *weblogic* Unix user and launch

```bash
$ stop_weblogic
```

Then try to start it

```bash
$ start_weblogic
```

Check that it starts *RUNNING mode*

```bash
$ tail -f $HOME/start_weblogic.nohup
```

Press <kbd>CTRL-C</kbd> to exit.


  [1]: http://ant.apache.org/bindownload.cgi "Apache Ant download"
  [2]: http://www.oracle.com/technetwork/indexes/downloads/index.html "Oracle downloads"
