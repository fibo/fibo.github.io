---
title: Install WebLogic 12c
description: >
    How to install WebLogic 12c development version on Linux RedHat
tags:
  - Web development
  - Software
---

## Installation

Get files from [Apache Ant][1] and [Oracle][2] download pages.

Copy files *apache-ant-1.9.4-bin.zip* and *wls1213_dev.zip* to */tmp* path on
target host, for instance *s-ng-cmunica-dev.premiere.de* and create folders *weblogic* user will own.

    $ sudo su -
    # mkdir /opt/weblogic
    # chown weblogic:campaign /opt/weblogic

Perform installation with *weblogic* user. Extract archives

    # sudo su - weblogic
    $ cd /opt/weblogic
    $ unzip /tmp/apache-ant-1.9.4-bin.zip
    $ unzip /tmp/wls1213_dev.zip

Edit *.bash_profile* and add the following lines

    export JAVA_HOME=/opt/java
    export PATH=$PATH:$JAVA_HOME/bin

    export ANT_HOME=/opt/weblogic/apache-ant-1.9.4
    export PATH=$PATH:$ANT_HOME/bin

    alias start_weblogic='nohup /opt/weblogic/wls12130/user_projects/domains/mydomain/bin/startWebLogic.sh > $HOME/start_weblogic.nohup 2>&1 &'
    alias stop_weblogic='/opt/weblogic/wls12130/user_projects/domains/mydomain/bin/stopWebLogic.sh'

then source it

    source $HOME/.bash_profile

Configure WebLogic and create a domain

    $ export MW_HOME=/opt/weblogic/wls12130
    $ cd /opt/weblogic/wls12130
    $ . ./configure.sh

    Do you want to configure a new domain?  [y/n]? y

    Enter username to boot WebLogic server:weblogic
    Enter password to boot WebLogic server:
    For confirmation, please re-enter password required to boot WebLogic server:
where the same Unix *weblogic* user credentials were used for the WebLogic.

It will take some time (approx 30 min.)

When you see message

    Server state changed to RUNNING

login to http://s-ng-cmunica-dev.premiere.de:7001/console with *weblogic* user credentials.
*weblogic* user.

Finally login with another session as *weblogic* Unix user and launch

    $ stop_weblogic

Then try to start it

    $ start_weblogic

Check that it starts *RUNNING mode*

    $ tail -f $HOME/start_weblogic.nohup

Press <kbd>CTRL-C</kbd>> to exit.


  [1] http://ant.apache.org/bindownload.cgi "Apache Ant download"
  [2] http://www.oracle.com/technetwork/indexes/downloads/index.html "Oracle downloads"
