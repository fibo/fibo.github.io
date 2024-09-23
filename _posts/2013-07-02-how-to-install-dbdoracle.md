---
title: How to install DBD::Oracle
tags:
  - Perl
  - SQL
  - Oracle
description: >
  I am going to put here all the steps required to install DBD::Oracle CPAN module, which is not a straightforward installation.
  The purpose is to reduce headache and turn it into a repeatable process.
---

## Requirements

### Use Oracle Instant Client

I really recommend to use your own Oracle lib, cause if your DBAs upgrade or dismiss or whatever the official Oracle installation, you will need to be warned and to reinstall [DBD::Oracle][1] since it links to the Oracle shared libs. Trust me, use *Oracle Instant Client*, at the time of this writing you can download it from [here](http://www.oracle.com/technetwork/database/features/instant-client/index-097480.html) or just [google it](https://www.google.com/?q=Oracle+Instant+Client+download).

Select your platform, download the files and put them somewhere in your home dir or some other path you can read/write. Check also the right version for your installation: latest is *12.1.0.1* right now, but I had to use an older one, for instance, *10.2.0.5*.

Ask your DBAs which version you should use, **probably the safe choice** is to pick up the same version as the remote database. So **don't guess**, login to the database server and launch

```
$ sqlplus /nolog

SQL*Plus: Release 10.2.0.5.0 - Production on Mar Mar 25 15:25:03 2014

Copyright (c) 1982, 2010, Oracle.  All Rights Reserved.

SQL>
```

Type `quit` to exit. But remember that,

<div class="paper info">Oracle Instant Client right version depends only on your host Operating System version.</div>

I'm going to put files under `$HOME/opt/Oracle` and store the *.zip* in the packages folder, so here there are my files

```bash
$ ls $HOME/opt/Oracle/packages
basic-10.2.0.5.0-linux-x64.zip
sdk-10.2.0.5.0-linux-x64.zip
sqlplus-10.2.0.5.0-linux-x64.zip
```

```bash
cd $HOME/opt/Oracle
unzip packages/basic-10.2.0.5.0-linux-x64.zip
unzip packages/sdk-10.2.0.5.0-linux-x64.zip
unzip packages/sqlplus-10.2.0.5.0-linux-x64.zip
```

### Setup your environment

I use to create a *.oracle_profile* with environment variables I need, so I can source it from *.bash_profile* or from another session (for example from a CPAN shell, see below).

<div class="paper warning">It is important you use the same environment variables as in your scripts as at the time of installation, since installation will create linked libraries.</div>

```bash
$ cat $HOME/.oracle_profile

export ORACLE_BASE=$HOME/opt/Oracle
export ORACLE_HOME=$ORACLE_BASE/instantclient_10_2
export PATH=$ORACLE_HOME:$PATH
export TNS_ADMIN=$HOME/etc
export NLS_LANG=ITALIAN_ITALY.WE8ISO8859P15

# Set LD_LIBRARY_PATH avoiding a final colon.
if [ -z "$LD_LIBRARY_PATH" ]; then
 export LD_LIBRARY_PATH=$ORACLE_HOME
else
 export LD_LIBRARY_PATH=$ORACLE_HOME:$LD_LIBRARY_PATH
fi
```

<div class="paper danger">Anyway avoid set <em>LD_LIBRARY_PATH</em> with a final colon (<strong>:</strong>) otherwise you can get unexpected results.</div>

Yes I know! It is said that [LD_LIBRARY_PATH is evil](https://blogs.oracle.com/ali/entry/avoiding_ld_library_path_the), but I couldn't complete a working installation without it.

<div class="paper info">
Also note that if you are using a full Oracle client, or even an Oracle server you probably should set it as <em>LIBRARY_PATH=$ORACLE_HOME/lib</em>.
</div>

Set `NLS_LANG` according to your needs. In the example above, it is ok for Italy and euro accounting (Western European character set).

`TNS_ADMIN` is the directory where you put your *tnsadmin.ora*, since we are not pointing to an Oracle server installation, we probably need also our own tns configuration.

<div class="paper warning">Don' t forget to source it from your <em>.bash_profile</em>!</div>

### Latest DBI

Configure [A CPAN client that works like a charm][2] and install latest DBI

```bash
cpan DBI
```

## Installation

### Get DBD::Oracle CPAN module

Download latest version of [DBD::Oracle][1] CPAN module, right now it is *DBD-Oracle-1.64.tar.gz*: you can download it manually from CPAN, untar it and cd into it

```bash
wget http://search.cpan.org/CPAN/authors/id/P/PY/PYTHIAN/DBD-Oracle-1.64.tar.gz
tar xzf DBD-Oracle-1.64.tar.gz
cd DBD-Oracle-1.64
```

or just open a cpan shell and type

```bash
$ cpan
...
cpan> look DBD::Oracle
...
Working directory is /home/wa/.cpan/build/DBD-Oracle-1.64-KIWHyH
```

Now you can source the *.oracle_profile* you created, to load the environment variables.

```bash
source $HOME/.oracle_profile
```

Check at least that sqlplus is working

```bash
sqlplus /nolog
```

If you see a `SQL> prompt`, it means your installation have good chances to complete successfully. If not, probably you picked up an Oracle Instant Client version that is not compatible with your Operating System.
Create a log dir in your `$ORACLE_HOME`, otherwise you will find Oracle logs in your home dir.

```bash
mkdir $ORACLE_HOME/log
```

### Compile

Now, clean your mind and pray the mantra

```bash
perl Makefile.PL
make
```

#### Troubleshooting

If *make* fails with an error like

```
/usr/bin/ld: cannot find -lclntsh
collect2: error: ld returned 1 exit status
make: *** [blib/arch/auto/DBD/Oracle/Oracle.so] Error 1
```

don't worry! You can fix it creating a symbolic link

Check your actual *libclntsh.so* version

```bash
$ ls $ORACLE_HOME/libclntsh.so*
/path/to/your/instantclient_11_2/libclntsh.so.xy.z
```

for instance *libclntsh.so.10.1*, and then link it to the shared lib *ld* need to compile

```bash
ln -s $ORACLE_HOME/libclntsh.so.11.1 $ORACLE_HOME/libclntsh.so
```

Now try again [compile steps](#compile).

### Test

Run tests, it is always a good idea! But set the `ORACLE_USERID` and  `ORACLE_DSN` env vars, otherwise it probably will default to `scott/tiger` and `dbi:Oracle:testdb` hence will fail (unless you have a brand new Oracle installation with the famous `scott/tiger` still around :).

```bash
export ORACLE_USERID=pippo/password123
export ORACLE_DSN='dbi:Oracle:mydsn'

make test
```

And finally

```bash
make install
```

#### Unit test

If some tests fails or you want to check connectivity to one or more databases to be sure the installation will not be useless, here it is a simple test you can fill with your credentials and run launching

```bash
prove oracle.t
```

```perl
use strict;
use warnings;
use DBI;
use File::Spec;
use Test::More;

my $user = 'scott';             # Change me
my $pass = 'tiger';             # Change me
my $conn = 'DBI:Oracle:testdb'; # Change me

ok $ENV{ORACLE_BASE}, '$ORACLE_BASE env var is defined';
ok $ENV{ORACLE_HOME}, '$ORACLE_HOME env var is defined';
ok $ENV{TNS_ADMIN},   '$TNS_ADMIN env var is defined';

ok -d $ENV{ORACLE_BASE}, '$ORACLE_BASE dir exists';
ok -d $ENV{ORACLE_HOME}, '$ORACLE_HOME dir exists';
ok -e File::Spec->catfile($ENV{TNS_ADMIN}, 'tnsnames.ora'), 'tnsnames.ora exists';

ok my $dbh = DBI->connect($conn, $user, $pass,{ PrintError => 1, }), 'database connection';

done_testing
__END__
```

[1]: https://metacpan.org/release/DBD-Oracle
[2]: {% post_url 2014-03-26-a-cpan-client-that-works-like-charm %}
