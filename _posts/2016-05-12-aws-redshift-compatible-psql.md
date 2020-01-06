---
title: AWS Redshift compatible PostgreSQL client
tags:
  - AWS
  - SQL
description: >
    How to install a PostgreSQL client (psql) that is compatible with AWS Redshift
---

## Install psql

In order to use a version that is as much compatible as possible with [Amazon Redshift](https://aws.amazon.com/redshift) you need version `v8.0.2`.

You can build it in few minutes.

Install requirements

```bash
sudo apt-get install make gcc libreadline-dev zlib1g-dev -y
```

Choose the directory where you want to install it, I recommend using

```bash
export PGROOT=/usr/local/
```

Then download it and build it with the following commands

```bash
cd /tmp
wget https://ftp.postgresql.org/pub/source/v8.0.2/postgresql-8.0.2.tar.gz
tar xf postgresql-8.0.2.tar.gz
cd postgresql-8.0.2
./configure --prefix=$PGROOT
make
sudo make install
```

## Environment

Do not forget to add `$PGROOT/bin` to your `$PATH`: it should be already
ok if you used the *PGROOT* recommended above.

Consider set your environment to point to your main database.  For example I added to my *~/.bashrc* something like

```bash
export PGHOST=mydb-instance.cd274s5bo4aq.eu-west-1.redshift.amazonaws.com
export PGPORT=5439
export PGDATABASE=mydb
export PGUSER=mydb_user
```

`PGHOST`
: Redshift hostname. You can find it in the AWS console, look for *Cluster Endpoint* in your Redshift instance *Configuration* tab: it is something like `my-dw-instance.nctgnxb2tav5.us-east-1.redshift.amazonaws.com`
`PGPORT`
: 5439, is default Redshift password.
`PGDATABASE`
: Your database name.
`PGUSER`
: Your database user name.

<div class="paper danger">
Do not use <code>PGPASSWORD</code> to set credentials, it is strongly recommended to use a pgpass file (read below).
</div>

## Credentials

It is a good choice to use a *pgpass* file to store passwords.

Create it,

```bash
touch ~/.pgpass
chmod 600 ~/.pgpass
```

and add lines in the following format

```
hostname:port:database:username:password
```

For instance

```bash
echo $PGHOST:$PGPORT:$PGDATABASE:$PGUSER:password >> ~/.pgpass
```

Then edit *.pgpass* and change *password*.

Now you can connect to the database just launching `psql`.

<div class="paper info">
It is possible to have multiple lines since environment variables
are read first, then password is grabbed from pgpass file.
</div>

## Custom prompt

To display also the database user in the prompt, put the following line in your *~/.psqlrc*

```
\set PROMPT1 '%n@%/=%# '
```

See also [psql prompting](http://www.postgresql.org/docs/8.4/static/app-psql.html#APP-PSQL-PROMPTING) for more choices.

