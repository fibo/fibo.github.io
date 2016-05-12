---
title: AWS Redshift compatible PostgreSQL client
tags:
  - AWS
  - PostgreSQL
  - Redshift
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

Consider set your environment to point to your main database.  For example I added to my *~/.bashrc*

```bash
export PGUSER=mydb_user
export PGDATABASE=mydb
export PGPORT=5439
export PGHOST=mydb-instance.cd274s5bo4aq.eu-west-1.redshift.amazonaws.com
```

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
export PASSWD=s3cret
echo $PGHOST:$PGPORT:$PGDATABASE:$PGUSER:$PASSWD >> ~/.pgpass
```

Now you can connect to the database just launching `psql`.

## Custom prompt

To display also the database user in the prompt, put the following line in your *~/.psqlrc*

```
\set PROMPT1 '%n@%/=%# '
```

See also [psql prompting](http://www.postgresql.org/docs/8.4/static/app-psql.html#APP-PSQL-PROMPTING) for more choices.

