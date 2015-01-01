---
title: Install Oracle Xe
tags:
  - Oracle
description: >
    Guidelines to post creation, verbatim. Use punctuation!
---

## Section

oracle-xe-11.2.0-1.0.x86_64.rpm.zip
on linux redhat 6.6  but works also on 5

## References

[ref1][1]

  [1] http://link.com/ "link"


## Oracle

Ho installato Oracle XE, vedi http://www.davidghedini.com/pg/entry/install_oracle_11g_xe_on

```
 [root@localhost ~]# cat /etc/sysctl.conf
# Kernel sysctl configuration file for Red Hat Linux
#
# For binary values, 0 is disabled, 1 is enabled.  See sysctl(8) and
# sysctl.conf(5) for more details.

# Controls IP packet forwarding
net.ipv4.ip_forward = 0

# Controls source route verification
net.ipv4.conf.default.rp_filter = 1

# Do not accept source routing
net.ipv4.conf.default.accept_source_route = 0

# Controls the System Request debugging functionality of the kernel
kernel.sysrq = 0

# Controls whether core dumps will append the PID to the core filename
# Useful for debugging multi-threaded applications
kernel.core_uses_pid = 1

# Controls the use of TCP syncookies
net.ipv4.tcp_syncookies = 1

# Controls the default maxmimum size of a mesage queue
kernel.msgmnb = 65536

# Controls the maximum size of a message, in bytes
kernel.msgmax = 65536

# Controls the maximum shared segment size, in bytes
#kernel.shmmax = 68719476736

# Controls the maximum number of shared memory segments, in pages
#kernel.shmall = 4294967296

kernel.sem = 250 32000 100 128
kernel.shmmax = 4294967295
kernel.shmall = 2097152
fs.file-max = 6815744
net.ipv4.ip_local_port_range = 9000 65500

```

```
# mv /tmp/oracle-xe-11.2.0-1.0.x86_64.rpm.zip .
#  unzip -q oracle-xe-11.2.0-1.0.x86_64.rpm.zip
# cd Disk1/
# rpm -ivh oracle-xe-11.2.0-1.0.x86_64.rpm
Preparing...                ########################################### [100%]
   1:oracle-xe              ########################################### [100%]
Executing post-install steps...
You must run '/etc/init.d/oracle-xe configure' as the root user to configure the database.
```

```bash
# /etc/init.d/oracle-xe configure

Oracle Database 11g Express Edition Configuration
-------------------------------------------------
This will configure on-boot properties of Oracle Database 11g Express
Edition.  The following questions will determine whether the database should
be starting upon system boot, the ports it will use, and the passwords that
will be used for database accounts.  Press <Enter> to accept the defaults.
Ctrl-C will abort.

Specify the HTTP port that will be used for Oracle Application Express [8080]:

Specify a port that will be used for the database listener [1521]:

Specify a password to be used for database accounts.  Note that the same
password will be used for SYS and SYSTEM.  Oracle recommends the use of
different passwords for each database account.  This can be done after
initial configuration:
Confirm the password:

Do you want Oracle Database 11g Express Edition to be started on boot (y/n) [y]:

Starting Oracle Net Listener...Done
Configuring database...Done
Starting Oracle Database 11g Express Edition instance...Done
Installation completed successfully.
```


tnsnames is /u01/app/oracle/product/11.2.0/xe/network/admin/tnsnames.ora

Per trovare le .so rotte, ma questo va bene ad esempio per il client

```bash
find . -name "*so"| while read f; do ldd $f | grep found; done
```

## Environment

faccio sudo su - oracle
mi ritrovo in /u01/app/oracle
creo li un /u01/app/oracle/.bash_profile, se non setto l'ambiente non funziona una mazza


```
echo source /u01/app/oracle/product/11.2.0/xe/bin/oracle_env.sh >> /u01/app/oracle/.bash_profile
```

devo poter fare

```
-bash-4.1$ sqlplus /nolog

SQL*Plus: Release 11.2.0.2.0 Production on Thu Nov 27 13:35:14 2014

Copyright (c) 1982, 2011, Oracle.  All rights reserved.

SQL> conn sys as sysdba
Enter password:
Connected to an idle instance.
SQL> quit
Disconnected
```

