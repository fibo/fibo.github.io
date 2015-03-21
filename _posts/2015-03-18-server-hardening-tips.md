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

### Restrict ssh access 

As you can read in [Configure ssh](#configure-ssh) section, there are many login attempts. See it your self (sit down first :)

```
# tail -f /var/log/secure
```

You can use [TCP wrapper][4] lib to filter access to your host. Note that the following instructions work because *sshd* is compatible with tcpwrappers, in fact

```
$ ldd /usr/sbin/sshd | grep libwrap
        libwrap.so.0 => /lib64/libwrap.so.0 (0x00007fac80451000)
```

For example, if you want to allow ssh access only from a class C IPv4 subnet, for instance *10.20.30* do

edit */etc/hosts.allow*

```
sshd: 10.20.30.
```

edit */etc/hosts.deny*

```
sshd: ALL
```

and restart ssh daemon

```
# systemctl restart sshd
```

Sadly, if you check where does the ssh failed login attempts come form, it turns out they are from China. You can use [IPdeny][6] lists to block or allow connections coming from a country.

For example, to allow connections from Italy you can launch, as root

```
#                                "cn" stands for China. Drop curl progress bar. Extract class C IPv4 subnets. Append a dot to every subnet.
#                                                     ↓                       ↓                             ↓                              ↓
curl -L http://www.ipdeny.com/ipblocks/data/countries/cn.zone                 2> /dev/null                  | cut -d . -f1-3 | sort | uniq | while read subnet; do echo ${subnet}.; done >> /etc/hosts.deny
# Double check results appended to /etc/hosts.deny config file!
```

Note that the result is an aproximation, but, it is a pretty good one.

Apply filter if last login is not blacklisted

```
last | head -4 # Just to have a look
LAST_IPV4_C_SUBNET=$(last | head -1 | awk '{print $3}' | cut -d . -f1-3)
grep $LAST_IPV4_C_SUBNET  /etc/hosts.deny || systemctl restart sshd
```


## References

* [“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?][1]
* [Top 20 OpenSSH Server Best Security Practices][2]
* [How do I grant permission on port <1024][3]
* [Unexpected DDOS: Blocking China with ipset and iptables][5]

  [1]: http://serverfault.com/questions/260706/possible-break-in-attempt-in-var-log-secure-what-does-this-mean "“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?"
  [2]: http://www.cyberciti.biz/tips/linux-unix-bsd-openssh-server-best-practices.html "Top 20 OpenSSH Server Best Security Practices"
  [3]: http://forums.fedoraforum.org/showthread.php?t=207398 "How do I grant permission on port <1024"
  [4]: https://en.wikipedia.org/wiki/TCP_Wrapper "TCP wrapper"
  [5]: https://mattwilcox.net/web-development/unexpected-ddos-blocking-china-with-ipset-and-iptables/ "Unexpected DDOS: Blocking China with ipset and iptables"
  [6]: http://www.ipdeny.com/ "IPdeny"
