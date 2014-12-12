---
title: NFS mount how to
tags:
  - Unix
description: >
    Steps required to do an NFS mount.
---

## Scenario

Imagine one source host, for instance *host1.example.org*, that will export its storage */store* with *read/write* permissions to two target hosts, for instance *host2.example.org* and *host3.example.org*.

I like to use for the target folder the following naming convention

```
/nfs/<source hostname>
```

Of course, the target folder **must** exist on target hosts and it is assumed that there is a route from source to target.

<div class="alert alert-warning">All commands must be run with <strong>root</strong> privileges.</div>


## Source host

Connect to *host1.example.org*, that is our source host.

### NFS service

<div class="alert alert-info">I assume here that source host has Red Hat OS.</div>

First of all, start NFS service

```bash
$ /etc/init.d/nfs start
```

Make sure the NFS service will start at boot.

```bash
$ chkconfig nfs on
```

### Export it

Edit file */etc/exports*

```
/store host2.example.org(rw) host3.example.org(rw)
```

After changing configuration launch

```bash
$ exportfs -au
$ exportfs -a
```

To check you are exporting filesystems, launch

```bash
$ exportfs
/store          host2.example.org
/store          host3.example.org
```

## Target host

Connect to *host2.example.org*, that is one of the target hosts. Then repeat instructions *host3.example.org* too.

### Mount it

Edit */etc/fstab*

```
host1.example.org:/store /nfs/host1.example.org nfs _netdev,noatime,nfsvers=3,rsize=8192,wsize=8192,nocto,intr,bg,rw,soft,actimeo=300 0 0
```

Check that source host is exporting correctly

```bash
$ showmount -e host1.example.org
Export list for host1.example.org:
/store host2.example.org,host3.example.org
```

Finally you can mount launching

```bash
$ mount /nfs/host1.example.org
```
or

```bash
$ mount host1.example.org:/store
```

Don' t forget a final test, just launch

```bash
$ df -h
...
host1.example.org:/store 99G  667M   93G   1% /nfs/host1.example.org
```

### Fix listing

After mount, if I do an `ls` I see something like

```bash
$ ls -l /nfs/host1.example.org/

drwx------ 4 15111 15110  4096 Mar 11 18:23 dir1
drwx------ 3 15112 15110  4096 Mar 10 18:06 dir2
drwx------ 3 15109 15110  4096 Mar 10 16:23 dir3
```

I see *ids* instead of *usernames*. In the source host I have these entries in the */etc/passwd*

```
user1:x:15109:15110::/home/user1:/bin/bash
user2:x:15111:15110::/home/user2:/bin/bash
user3:x:15112:15110::/home/user3:/bin/bash
```

Be consistent: keep the same userid on every host.

In this case, I don't want users can login on target hosts so, I change *home* and *shell* entries to `/var/tmp/:/sbin/nologin`.

So in */etc/passwd* on target hosts I have

```
user1:x:15109:15110::/var/tmp:/sbin/nologin
user2:x:15111:15110::/var/tmp:/sbin/nologin
user3:x:15112:15110::/var/tmp:/sbin/nologin
```

Now I can see

```bash
$ ls -l /nfs/host1.example.org/

drwx------ 4 user1   15110  4096 Mar 11 18:23 dir1
drwx------ 3 user2   15110  4096 Mar 10 18:06 dir2
drwx------ 3 user3   15110  4096 Mar 10 16:23 dir3
```

Yep, the same concept applies to group ids. I need to add this row on */etc/group* on target hosts

```
grp1:x:15110:user1,user2,user3
```

Et voilà! Listing is fixed

```bash
$ ls -l /nfs/host1.example.org/

drwx------ 5 user1   grp1  4096 Mar 21 10:05 dir1
drwx------ 3 user2   grp1  4096 Mar 10 18:06 dir2
drwx------ 3 user3   grp1  4096 Mar 10 16:23 dir3
```
