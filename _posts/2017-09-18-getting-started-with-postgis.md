---
title: Getting started with PostGIS
tags:
  - PostGIS
  - PostgreSQL
  - GeoJSON
description: >
    PostGIS is a PostgreSQL extension that adds support for geographic objects allowing location queries to be run in SQL.
---

I started using [PostGIS] and I will add here all the tips I think are useful, for you or the future me.
I have just added a [request on SVG porn](https://github.com/gilbarbara/logos/issues/244) to add a logo ( let's see what happens :).

## Installation

I will install PostGIS on an AWS EC2 instance. I choose official Ubuntu AMI
on a *postgis-sg* security group configured properly to accept inbound
connection on PostgreSQL port only from my office IP and few internal EC2 instances.

On an Ubuntu server install [PostGIS]
See tutorial [How to Install and Configure PostGIS on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postgis-on-ubuntu-14-04) as a reference.

```bash
sudo add-apt-repository ppa:ubuntugis/ubuntugis-unstable
sudo apt-get install postgis
```

If you already have a [PostgreSQL] instance probably you can skip the
following two instructions about creating a database and a user,
for instance, **mydb** and **myuser**.

Create a *mydb* database

```bash
sudo -i -u postgres
createdb mydb
```

Create user *myuser*.

```bash
createuser --no-createdb myuser
psql -c "ALTER USER myuser WITH PASSWORD '***';"
```

Enable PostGIS extension

```bash
psql -d mydb
mydb=# CREATE EXTENSION postgis;
```

Check it

```bash
mydb=# SELECT PostGIS_version();
            postgis_version
--------------------------------------
 2.2 USE_GEOS=1 USE_PROJ=1 USE_STATS=1
(1 row)
```

Modify file */etc/postgresql/x.y/main/postgresql.conf*, where *x.y* is current version and set

* `work_mem = 16MB`
* `maintenance_work_mem = 128MB`
* `random_page_cost = 2.0`
* `shared_buffers` to 75% of server RAM.
* `listen_addresses = '*'`, this is safe cause actually is *postgis-sg* EC2 security group which controls the network.

Modify file */etc/postgresql/x.y/main/pg_hba.conf*, where *x.y* is current version and set

* `host     mydb  myuser  0.0.0.0/0  md5`, this is safe cause actually is *postgis-sg* EC2 security group which controls the network.

Restart PostgreSQL: `sudo service postgresql restart`.

## Examples

The public schema will be used, I tryed to install PostGIS extension in
another schema, but as a newbie, I could not figure out how to do it :P

Create your first table, holding locations in lat/lng format.

```sql
CREATE TABLE location (
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR(256),
	geo GEOGRAPHY(POINT)
)
;
```

Insert the coordinates of two locations, the [Colosseum](https://en.wikipedia.org/wiki/Colosseum) and the [Duomo of Milan](https://en.wikipedia.org/wiki/Milan_Cathedral).
Note that `4326` value is fixed since it corresponds to [World Geodetic System](https://en.wikipedia.org/wiki/World_Geodetic_System) EGS84, also used by the [GPS](https://en.wikipedia.org/wiki/Global_Positioning_System).

```sql
INSERT INTO location (name, geo) VALUES
('Colosseo', ST_GeographyFromText('SRID=4326;POINT(41.8902102 12.4900422)')),
('Duomo', ST_GeographyFromText('SRID=4326;POINT(45.4640976 9.1897378)'))
;
```

Calculate distance from two locations

```sql
SELECT ST_Distance(
  (SELECT geo FROM location WHERE name = 'Colosseo'),
  (SELECT geo FROM location WHERE name = 'Duomo')
)
```

Get geo data in GeoJSON format.

```sql
SELECT ST_AsGeoJSON(geo) FROM location;
```

[PostGIS]: http://postgis.net/ "PostGIS"
