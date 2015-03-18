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

<div class="alert alert-warning">Do the following steps As Soon As Possible, i.e. when you access the serve the first time.</div>

1. Login as root and change password
2. Create a new user.
3. Configure ssh, in particular to disable root access.

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
PermitRootLogin no
MaxAuthTries 2
```

So root user cannot login and any other user is disconnected if password is wrong.

Commit changes restarting ssh daemon.

```
# sudo systemctl restart sshd
```

After this you should not see the failed login attempts warning. Test it with

```
grep failed /var/log/secure |more
```

see also [what does it mean “POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure][1]

## References

[“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?][1]

  [1]: http://serverfault.com/questions/260706/possible-break-in-attempt-in-var-log-secure-what-does-this-mean "“POSSIBLE BREAK-IN ATTEMPT!” in /var/log/secure — what does this mean?"

