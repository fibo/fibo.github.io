---
title: sqlplus tips
tags:
  - Oracle
  - SQL
description: >
    Tricks and tips about your everyday Oracle sqlplus usage.
---

After I tryed *psql*, **I hate sqlplus**.

Hey Oracle, you are a really big corporation. Why do you keep *sqlplus* so unusable? Don't you have money to pay your developers and add new features like command history?

    RANT> exit

By the way, sometimes I need to use *sqlplus*. Here it is a set of tips I always forget.


## How to login

     $ sqlplus schema@sid

where *schema* is your user name and *sid* can be found in the *tnsnames.ora*.

**Do not** show your password around, avoid this syntax

     $ sqlplus schema/password@sid

You can also do this

    $ sqlplus /nolog
    SQL> CONNECT AS SYSDBA -- if you can :)

### Check your environment

Make sure your env vars are set properly

    $ echo $ORACLE_HOME

Set your `EDITOR` var to enable the `EDIT` command. It is a good idea to set this variable in your *.bash_profile*, cause it is used also by other softwares (like git, subversion, PostgreSQL and many more)

    $ export EDITOR=vim

If you are already logged in sqlplus, you can do

    SQL> DEFINE _EDITOR=vim

### Exit command

    SQL> quit

## Basic operations

### Manage SQL buffer content

Suppose you run a query, for instance

    SQL> SELECT SYSDATE FROM DUAL;

    SYSDATE
    ------------------
    02-APR-15

Now the SQL buffer contains last statement, you can run it again with

    SQL> RUN

Or even, the more comfortable

    SQL> r

Yes, because Oracle is not case sensitive with its keywords and many sqlplus commands has a shorter alias, for example `LIST` has `L` or `l`.

If you want to show the most recently executed SQL command

    SQL> LIST

or simply

    SQL> l

### Show command help

    SQL> HELP INDEX

    Enter Help [topic] for help.

     @             COPY         PAUSE                    SHUTDOWN
     @@            DEFINE       PRINT                    SPOOL
     /             DEL          PROMPT                   SQLPLUS
     ACCEPT        DESCRIBE     QUIT                     START
     APPEND        DISCONNECT   RECOVER                  STARTUP
     ARCHIVE LOG   EDIT         REMARK                   STORE
     ATTRIBUTE     EXECUTE      REPFOOTER                TIMING
     BREAK         EXIT         REPHEADER                TTITLE
     BTITLE        GET          RESERVED WORDS (SQL)     UNDEFINE
     CHANGE        HELP         RESERVED WORDS (PL/SQL)  VARIABLE
     CLEAR         HOST         RUN                      WHENEVER OSERROR
     COLUMN        INPUT        SAVE                     WHENEVER SQLERROR
     COMPUTE       LIST         SET                      XQUERY
     CONNECT       PASSWORD     SHOW

For example

    SQL> HELP LIST

### Show sqlplus settings

    SQL> SHOW ALL

### Show current user

    SQL> SHOW USER

### Get tables list

    SQL> SELECT * FROM user_objects WHERE object_type = 'TABLE';

### List table columns

    SQL> DESC mytable

## Common tasks

### Get first n rows from a table

    SQL> SELECT * FROM foo WHERE ROWNUM < 100;

### Setup your prompt

Defaults are really weird, try to make it more usable.

Create a *login.sql* file in your current directory, your $HOME for instance, or in some directory you add to `SQLPATH` env var. Add to *login.sql* the following content

{% gist fibo/6592631 %}

Remember that, since *PAUSE* flag is on, you should hit enter after you run a query to see a first result.

### Compute table size

    SQL> SELECT segment_name, bytes/(1024*1024) AS Mb FROM user_segments WHERE segment_type = 'TABLE' ORDER BY 2 DESC;

### Spool table content to file

{% gist fibo/6807322 %}

### Edit SQL buffer

Suppose you write a wrong query and you want to fix it.

    SQL> SELECT
      2  sydate
      3  FROM DUAL;
    SYDATE
    *
    *ERROR at line 2:
    ORA-00904: "SYDATE": invalid identifier

Go to line 2

    SQL> 2
      2* sydate

Apply a substitution

    SQL> c/sydate/SYSDATE/
      2* sysdate

Run the query

    SQL> r
      1  SELECT
      2  SYSDATE
      3* FROM DUAL

    SYSDATE
    ------------------
    02-APR-15

### Format query output

If you try the following query without formatting output, you will get something unreadable.

    SQL> SELECT * FROM NLS_DATABASE_PARAMETERS;

Try this

    SQL> SET LINES 200
    SQL> COL parameter FOR a25
    SQL> COL name FOR a50

Then run it again

    SQL> r

Note that 25 is enough for *parameter* field, in fact

    SQL> SELECT MAX(LENGTH(parameter)) len FROM NLS_DATABASE_PARAMETERS;

           LEN
    ----------
            23

### Generate SQL

Sometimes it is really useful to launch a SQL that generates a SQL statement. For example in the example [Format query output](#format-query-output) you can run.


    SQL> SELECT 'COL parameter FOR a' || MAX(LENGTH(parameter)) copyme FROM NLS_DATABASE_PARAMETERS;

    COPYME
    --------------------------------------------------------------------------------
    COL parameter FOR a23

to generate the `COL parameter FOR a23` expression, and then just copy and paste it into your SQL prompt.

### Launch a script

    SQL> @script.sql

if *script.sql* is in the same directory you launched *sqlplus*.

You can pass an absolute path

    SQL> @/path/to/script.sql

and even a name with spaces, by adding double quotes

    SQL> @"001 - My script.sql"

Note that if there is an ampersand (`&`) you will be prompted to insert a value,
since it is the syntax for interactive variable assignations. Unluckly, if there is
any string in your insert that contains an ampersand, *sqlplus* will recognize it as a variable,
so you will be prompted for its assignation. You can solve it by setting

    SET DEFINE OFF

in your script or in the *sqlplus* session.

## See also

* [SQL*Plus on Oracle FAQ][1]

 [1]: http://www.orafaq.com/wiki/SQL*Plus_FAQ "SQL*Plus on Oracle FAQ"


