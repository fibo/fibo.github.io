---
title: Article template
tags:
  - PostgreSQL
description: >
    Get PostgreSQL up and running on Centos 7
---

# tris3d-db

## How to

Install PostgreSQL on Centos 7

    $ su -
    # yum install postgresql-server.x86_64
    # /usr/bin/postgresql-setup initdb
    # systemctl enable postgresql
    # systemctl start postgresql

Login to psql prompt

    $ su -
    # su - postgres
    $ psql

## Section

All sections start with an **h2**.

<div class="alert alert-info">This is an alert</div>

## See also

* [article]({% post_url yyyy-mm-dd-article %})

## References

[ref1][1]

  [1]: http://link.com/ "link"

