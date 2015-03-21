---
title: Server hardening tips
tags:
  - Security
  - Linux
description: >
    You got a Linux server and you want to prevent security issues: follow these instructions.
---

In this article I write what I do when I get a Linux server. Steps are really minimal 'cause I am lazy. I hope they are enough to prevent security issues.

I assume OS is Centos 7.

## ASAP

<div class="alert alert-warning">Do the following steps As Soon As Possible, i.e. when you access the server the first time.</div>

1. Login as root and change password, use a passphrase.
2. Create a new user.
3. [Configure ssh](#configure-ssh), in particular to disable root access.
4. [Update software](#update-software).

### Configure ssh

If you login as root you will see a message like

```
Using username "root".
Last failed login: Fri Jan 16 07:09:14 CST 2015 from 183.136.216.4 on ssh:notty
There were 20011 failed login attempts since the last successful login.
Last login: Tue Jan 15 09:56:30 2015 from host16-249-static.143-193-b.business.telecomitalia.it
```

Yes, there will a lot of **failed login attempts**. It is incredible how the number grows. The Internet is a jungle!

Edit your */etc/ssh/sshd_config* and set

```
Protocol 2
PermitRootLogin no
MaxAuthTries 2
```

So root user cannot login and any other user is disconnected if password is wrong.

Commit changes restarting ssh daemon.

```
# systemctl restart sshd
```

After this you should not see the failed login attempts warning. Test it with

```
$ grep failed /var/log/secure | more
```

see also [what does it mean “POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure][1]

### Update software

Keep kernel and other software up to date.

```
# yum update -y
```

## How to

### Run server on port 80

If you want to run a server on port 80, **do not** run it has root.
Use `CAP_NET_BIND_SERVICE` capabilities instead. Suppose, for example, you want to run a server using nodejs.

```
$ su -
# yum install libpcap -y
# setcap cap_net_bind_service=ep /usr/bin/node
```

Check it out

```
$ getcap /usr/bin/node
/usr/bin/node = cap_net_bind_service+ep
```

Now any user can run a nodejs server on port 80. See also [how do I grant permission on port <1024][3], in particular [this quote](http://forums.fedoraforum.org/showpost.php?p=1129664&postcount=7).

## References

* [“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?][1]
* [Top 20 OpenSSH Server Best Security Practices][2]
* [How do I grant permission on port <1024][3]

  [1]: http://serverfault.com/questions/260706/possible-break-in-attempt-in-var-log-secure-what-does-this-mean "“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?"
  [2]: http://www.cyberciti.biz/tips/linux-unix-bsd-openssh-server-best-practices.html "Top 20 OpenSSH Server Best Security Practices"
  [3]: http://forums.fedoraforum.org/showthread.php?t=207398 "How do I grant permission on port <1024"

