---
title: Optimize Maxmind database loaded on Redshift using Analytics functions
tags:
  - AWS
  - Maxmind
  - Redshift
  - SQL
description: >
    I am using Redshift since two years ago, and as every database it has its SQL dialect and its secrets. I will write here everything I discover and it is worth to be annotated.
---

## The goal

I have many traffic data, for instance clicks, where I know the IP. I need
to get its associated country known from Maxmind database (there is a free
version available if you want to try it out). The IP distribution is
really fragmented and I want to reduce the number of lines in order to
reduce the query execution time. I have rows like the following

```
   ip_inf   |   ip_sup   | isocode2
------------+------------+----------
   16859136 |   16875520 | JP
   16875520 |   16908288 | TH
   16908288 |   16908800 | CN
   16908800 |   16909056 | CN
   16909056 |   16909312 | US
   16909312 |   16910336 | CN
   16910336 |   16912384 | CN
   16912384 |   16916480 | CN
   16916480 |   16924672 | CN
   16924672 |   16941056 | CN
```

...and I want a result set like

```
   ip_inf   |   ip_sup   | isocode2
------------+------------+----------
  16859136 |   16875520 | JP
  16875520 |   16908288 | TH
  16908288 |   16909056 | CN
  16909056 |   16909312 | US
  16909312 |   16941056 | CN
```

I will use Redshift analytic functions to achieve the result showing the
query step by step.

## The solution

```sql
INSERT INTO dim.geoip_country_optimized
SELECT
        CASE
                WHEN u.isocode2 = u.prev_isocode2 THEN u.prev_ip_inf
                ELSE u.ip_inf
        END AS ip_inf,
        u.ip_sup,
        u.isocode2
FROM (
        SELECT t.ip_inf,t.ip_sup,t.isocode2,
        LEAD(t.isocode2) OVER (ORDER BY t.ip_inf) AS next_isocode2,
        LAG(t.isocode2) OVER (ORDER BY t.ip_inf) AS prev_isocode2,
        LAG(t.ip_inf) OVER (ORDER BY t.ip_inf) AS prev_ip_inf
        FROM (
                SELECT
                        ip_inf,
                        ip_sup,
                        isocode2,
                        LAG(isocode2) OVER (ORDER BY ip_inf) AS prev,
                        LEAD(isocode2) OVER (ORDER BY ip_inf) AS next
                        FROM dim.geoip_country
        ) t
        WHERE t.isocode2 != t.prev OR t.isocode2 != t.next
) u
WHERE u.isocode2 != u.next_isocode2
;
```
