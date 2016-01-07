---
title: psql tips
tags:
  - PostgreSQL
  - DataWarehouse
---

Prima cosa da fare quando entro in un db nuovo

List schemas

```
beintoodw=> \dn
        List of schemas
        name        |   owner   
--------------------+-----------
 dev                | dev_user
 information_schema | rdsdb
 pg_catalog         | rdsdb
 pg_internal        | rdsdb
 pg_toast           | rdsdb
 prod               | beintoo
 public             | rdsdb
 sand               | sand_user
 trk                | prod_user
```

Per selezionare un determinato schema

```
SET search_path TO trk;
```

Adesso, se faccio `\d` vedo gli oggetti relativi allo schema selezionato.

See current `search_path`

```
SHOW search_path;
```

Custom prompt

\set PROMPT1 '(%n@%M:%>) %`date +%H:%M:%S` [%/] \n%x%# '

ma questo e' troppo prolisso, meglio solo

\set PROMPT1 '%n@%/=%# '

da mettere in $HOME/.psqlrc

