---
title: Redshift tips
tags:
  - AWS
  - PostgreSQL
  - Redshift
description: >
    I am using Redshift since two years ago, and as every database it has its SQL dialect and its secrets. I will write here everything I discover and it is worth to be annotated.
---

## Temporary tables

Prepend an hash (`#`) to table name to create a temporary table.

```sql
CREATE TABLE #mytable AS SELECT 1;
```

Table `#mytable` will be clean up when session will be closed.
Two simultanei sessions can create a temporary table with the same name
with no conflicts.

