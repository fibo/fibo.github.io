---
title: Server hardening tips
tags:
  - Security
  - Linux
description: >
    You got a Linux server and you want to prevent security issues: follow these instructions.
---

In this article I write what I do when I get a Linux server. Steps are really minimal 'cause I am lazy. I hope they are enough to prevent security issues.

<div class="paper info">I assume OS is a Centos 7. If you are using Ubuntu, few modifications are needed, using <em>apt-get</em> instead of <em>yum</em>, <em>service</em> instead of <em>systemctl</em>, etc. Aside few details, the same concepts applies on both as well as other Linux distros.</div>

## ASAP

<div class="paper warning">Do the following steps <strong>As Soon As Possible</strong>, i.e. when you access the server the first time.</div>

1. Login as root and change password, use a *passphrase*.
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

Commit changes restarting ssh daemon

```bash
# systemctl restart sshd
```

For instance to change default port, for instance to 222

```bash
sudo perl -i -p -e 's/Port 22/Port 222/' /etc/ssh/sshd_config
```

After this you should not see the failed login attempts warning. Test it with

```bash
$ grep failed /var/log/secure | more
```

See also [what does it mean “POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure][1].

<div class="paper info">Many articles recommend to change default ssh port. It is not really a security enhancement, but, yes it can reduce the number of break-in attempts. One really benefit that I found about changing port number is to set it to <em>443</em> to bypass restrictive corporate firewalls.</div>

<div class="paper warning">Consider using <em>ssh-keygen</em> and <em>ssh-copy-id</em> to configure ssh access without password.</div>

## How to

### Update software

Keep kernel and other software up to date.

```bash
# yum update -y
```

You can schedule yum updates with *yum-cron*

```bash
# yum install yum-cron -y
# systemctl enable yum-cron.service
# systemctl start yum-cron
```

<div class="paper warning">Automatic updates should be configured <strong>only</strong> in a test environment.</div>

### Run a server on port 80

If you want to run a server on port 80, **do not** run it has root.
Use `CAP_NET_BIND_SERVICE` capabilities instead. Suppose, for example, you want to run a server using *nodejs*.

```bash
$ su -
# yum install libpcap -y
# setcap cap_net_bind_service=ep /path/to/node
```

Check it out with

```bash
$ getcap /path/to/node
/path/to/node = cap_net_bind_service+ep
```

Now any user can run a *nodejs* server on port 80. See also [how do I grant permission on port <1024][3], in particular [this quote](http://forums.fedoraforum.org/showpost.php?p=1129664&postcount=7).

<div class="paper warning">Note that I used <em>/path/to/node</em> instead of <em>/usr/bin/node</em> cause I highly recommend to <a href="http://g14n.info/dotsoftware">separate user software from system software</a>.
In this particular case, if you update Node using yum you will loose the <em>cap_net_bind_service=ep</em> setting and your server will fail to restart on port 80.</div>

### Restrict ssh access

As you can read in [Configure ssh](#configure-ssh) section, there are many login attempts. See it your self (sit down first 😱 )

```bash
tail -f /var/log/secure
```

You can use [TCP wrapper][4] lib to filter access to your host. Note that the following instructions work because *sshd* is compatible with *tcpwrappers*, in fact

```bash
$ ldd /usr/sbin/sshd | grep libwrap
        libwrap.so.0 => /lib64/libwrap.so.0 (0x00007fac80451000)
```

First of all remove ssh access to everyone, make sure your */etc/hosts.deny* has the following line

```
sshd: ALL
```

Now you can give access selectively. For example, if you want to allow ssh access only from a class C IPv4 subnet, for instance *10.20.30* add to your */etc/hosts.allow* the row

```
sshd: 10.20.30.
```

You are done! Now only accesses from trusted origin can enter.

#### How to block a country

Sadly, if you check where does the ssh failed login attempts come form, it turns out they are from China. You can use [IPdeny][6] lists to block or allow connections coming from a country.

For example, to deny connections from China you can launch, as root

```bash
echo -e \# $(date +%F): IP blocks from http://www.ipdeny.com/ipblocks/data/countries/cn.zone >> /etc/hosts.deny
#                                "cn" stands for China. Extract class B subnets.  Prepend "sshd:"; append "." .
#                                                     ↓                        ↓                              ↓
curl -L http://www.ipdeny.com/ipblocks/data/countries/cn.zone 2> /dev/null     | cut -d . -f1-2 | sort | uniq | while read subnet; do echo sshd: ${subnet}.; done >> /etc/hosts.deny
# Double check results appended to /etc/hosts.deny config!
```

Yes, double check results appended to your */etc/hosts.deny* config file and compare them with your last logins. Just use a simple `last | head -20` and `more /etc/hosts.deny` with a little bit from your brain.

## References

* [“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?][1]
* [Top 20 OpenSSH Server Best Security Practices][2]
* [How do I grant permission on port <1024][3]
* [Unexpected DDOS: Blocking China with ipset and iptables][5]
* [Network Security with tcpwrappers][7]
* [3 Steps to Perform SSH Login Without Password Using ssh-keygen & ssh-copy-id][8]

[1]: http://serverfault.com/questions/260706/possible-break-in-attempt-in-var-log-secure-what-does-this-mean "“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?"
[2]: http://www.cyberciti.biz/tips/linux-unix-bsd-openssh-server-best-practices.html "Top 20 OpenSSH Server Best Security Practices"
[3]: http://forums.fedoraforum.org/showthread.php?t=207398 "How do I grant permission on port <1024"
[4]: https://en.wikipedia.org/wiki/TCP_Wrapper "TCP wrapper"
[5]: https://mattwilcox.net/web-development/unexpected-ddos-blocking-china-with-ipset-and-iptables/ "Unexpected DDOS: Blocking China with ipset and iptables"
[6]: http://www.ipdeny.com/ "IPdeny"
[7]: https://ubuntu-tutorials.com/2007/09/02/network-security-with-tcpwrappers-hostsallow-and-hostsdeny/ "Network Security with tcpwrappers"
[8]: http://www.thegeekstuff.com/2008/11/3-steps-to-perform-ssh-login-without-password-using-ssh-keygen-ssh-copy-id/ "3 Steps to Perform SSH Login Without Password Using ssh-keygen & ssh-copy-id"

