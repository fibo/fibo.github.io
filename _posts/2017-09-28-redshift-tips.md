---
title: Redshift tips
tags:
  - AWS
  - PostgreSQL
  - Redshift
  - SQL
description: >
    I am using Redshift since two years ago, and as every database it has its SQL dialect and its secrets. I will write here everything I discover and it is worth to be annotated.
---

## psql

Use `psql`! It is a great tool: I use it for ETL scheduled processes
and on a daily basis to interact with Redshift.

See how to install [AWS Redshift compatible PostgreSQL client]{% post_url 2016-05-12-aws-redshift-compatible-psql %} article.

## Temporary tables

Prepend an hash (`#`) to table name to create a temporary table.

```sql
CREATE TABLE #mytable AS SELECT 1;
```

Table `#mytable` will be clean up when session will be closed.

<div class="paper info">
Two simultanei sessions can create a temporary table with the same name
with no conflicts.
</div>

You can also create a *tmp* schema, launching the following statement

```sql
/**
 * Statement above must be executed as admin
 *
 * NOTA BENE: replace <myuser> with the user that actually will
 *            use the tmp schema.
 */
CREATE SCHEMA tmp;
GRANT CREATE, USAGE ON SCHEMA tmp TO <myuser>;
```

The following bash script can ne scheduled to clean up the *tmp* schema.

```bash
#!/bin/bash

psql -A -t -q -c "
SELECT 'DROP TABLE tmp.' || table_name || ';'
FROM information_schema.tables
WHERE table_schema = 'tmp'
;
" | psql
```

## yyyymmdd

I use an integer field to store dates in the `YYYYMMDD` format. It is really
handy cause it can be sorted naturally, even in other contexts like folder
or file naming conventions. It is true that first two digits `20xxxxxx` are redundant
but they make it really easy to humans to recognize it is a date, like
`20170928` the day this article was published. So I use this format in
many other databases, it crosses contexts easily and in this section I
will write the snippets I use to convert it or manipulate it in Redshift,
however...

<div class="paper warning">
Consider also to use the <code>YYYY-MM-DD</code> string format that has the same benefits
and has also the advantage to be easier to cast in Redshift, for instance
<code>SELECT SYSDATE::DATE</code> returns current timestamp in this format.
</div>

Convert timestamp to yyyymmdd

```sql
SELECT TO_NUMBER(TO_CHAR(SYSDATE, 'YYYYMMDD'), 99999999);
SELECT TO_CHAR(SYSDATE, 'YYYYMMDD')::INTEGER;
```

First day of last week

```sql
 SELECT TO_CHAR(DATE_ADD('day', -7, DATE_TRUNC('week', SYSDATE)), 'YYYYMMDD');
```

Read given date from environment, for example in your bash script set
*YYYYMMDD* to yesterday

```bash
YYYYMMDD=$(date --date="yesterday" +%Y%m%d)
```

Then in your psql session

```sql
\set yyyymmdd `echo \'$YYYYMMDD\'`
SELECT CAST(:yyyymmdd AS INTEGER) AS yyyymmdd;
```
