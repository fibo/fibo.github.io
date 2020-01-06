---
title: How to collect Netezza history
tags:
  - SQL
description: >
    Collecting your Netezza query history is a mandatory step before optimization. Read this article to know how to collect Netezza history easily.
---

## Netezza query history setup

First of all, log into your NPS with the *nz* user.
If you open an *nzsql* session, I suppose you login as **ADMIN**.

### Create *hist* user and *query* database

Open an *nzsql* session an launch the following

```sql
CREATE USER hist WITH PASSWORD '***' AUTH LOCAL;
GRANT CREATE DATABASE TO hist;
```

Log out, and back to the shell prompt to create a *query* database.

```bash
nzhistcreatedb --db query --db-type query --owner hist --pw '***' -v 1
```

Note that you should set the password according to your policies.

### History configurations

Get an *nzsql* prompt again and create two history configurations:

* all_hist
* no_hist

```sql
CREATE HISTORY CONFIGURATION all_hist
HISTTYPE QUERY
DATABASE query
USER hist
PASSWORD '***'
COLLECT PLAN, COLUMN
LOADINTERVAL     5
LOADMINTHRESHOLD 4
LOADMAXTHRESHOLD 20
STORAGELIMIT     25
LOADRETRY        1
VERSION          1
;

CREATE HISTORY CONFIGURATION no_hist
HISTTYPE NONE
;
```

### Set history configuration

To activate an history configuration you need an NPS restart.

**Attention: do it when there is no ETL running**

Set history configuration

```sql
SET HISTORY CONFIGURATION all_hist;
```

Back to the shell prompt and restart the NPS

```bash
nzstop
nzstart
```

### Create a group that can read the *query* database

For sure you need to grant permission to see the history to some users. I use a set of utils I created: checkout my [nz-util].

```sql
\c query
CALL util..grant_readonly('query_hist_readonly')
;
```

Now you can add any user to *query_hist_readonly* group, for instance

```sql
ALTER GROUP query_hist_readonly ADD USER pippo
;
ALTER GROUP query_hist_readonly ADD USER pluto
;
```


### List databases that collect history

To know which database are currently collecting history, run this query

```sql
SELECT datname FROM _T_DATABASE WHERE dbcollecthistory IS TRUE
;
```

## Some useful queries

Now that your query history collection is up and running, you can get many useful informations.

### Who/what connects to your NPS

```sql
SELECT
  clienthost,
  clientip,
  sessionusername,
  CASE
    WHEN clienttype = 0  THEN 'None'
    WHEN clienttype = 1  THEN 'LibPq client'
    WHEN clienttype = 2  THEN 'ODBC client'
    WHEN clienttype = 3  THEN 'JDBC client'
    WHEN clienttype = 4  THEN 'nzload / nzunload'
    WHEN clienttype = 5  THEN 'Client of the client manager'
    WHEN clienttype = 6  THEN 'nzbackup / nzrestore'
    WHEN clienttype = 7  THEN 'nzreclaim'
    WHEN clienttype = 8  THEN 'Unused'
    WHEN clienttype = 9  THEN 'Internal Netezza tool'
    WHEN clienttype = 10 THEN 'OLE DB client'
  END AS clienttype,
  COUNT(1) AS num
FROM query.hist."$hist_session_prolog_1"
GROUP BY clienthost,clientip,sessionusername,clienttype
;
```

[nz-util]: http://g14n.info/nz-util
