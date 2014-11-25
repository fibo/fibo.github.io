---
title: How to drop a user on Netezza
tags:
  - Netezza
description: >
    You are trying to drop a user but Netezza complains cause it "owns objects"? This article shows how to solve this problem.
---

## Problem

You probably know the sql statement to drop a user

```sql
DROP USER pippo;
```

but you could get this error

```sql
ERROR:  DROP USER: user "PIPPO" owns objects, cannot be removed
```

## Solution

The short answer is: **just run this query**

```sql
SELECT database, objtype, objname
FROM _V_OBJ_RELATION_XDB
WHERE owner = ^pippo^
```

which shows you the objects owned by the user you want to drop. You should alter those
objects and transfer their ownership to another user.

You can install my [*Netezza utilities*][1] to simplify this task and save time.

Get the list of objects owned by user *pippo*.

```sql
CALL util..objects_owned_by('pippo');
```

Then connect to every database containing objects owned by *pippo* and transfer ownership to user *pluto*.

```sql
\c mydatabase
CALL util..transfer_objects_owned_by('pippo', 'pluto');
```

Finally, when no other object is owned by *pippo* you will be able to drop it.

## See also

* [Use nzpassword !](http://g14n.info/2013/10/use-nzpassword)
* [SQL client for Netezza](http://g14n.info/2013/05/sql-client-for-netezza)
* [How to collect Netezza history](http://g14n.info/2013/12/how-to-collect-netezza-history)

  [1]: http://g14n.info/nz-util
  
