How to populate dim calendar
============================

## Calendar row

Copy and paste the following function in your bash prompt.

```
function calendar_row {
	export OFFSET=$1;
	perl -le \
	'($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst)=localtime(time + 86400 * $ENV{OFFSET}); \
	$mon++; $year+=1900; $yday++; \
	printf "%04d%02d%02d,%d,%d,%d,%d,%d\n", $year,$mon,$mday,$year,$mon,$yday,$mday,$wday'
}
```

Now if you launch `calendar_row` it will print the record about current day . It accepts an offset parameter, for example

```
calendar_row 10
calendar_row -20
```

will output the records of 10th day in the future and 20th day in the past.

## Calendar CSV

Add current year to calendar: start by determine the current day of year

```
calendar_row
20151012,2015,10,285,12,1
```

which is *285* (today is the 12th of October).

So, let's produce a */tmp/calendar.csv* file with the current year records.

```
seq -284 80 | while read n; do calendar_row $n; done > /tmp/calendar.csv
```

Put it on *Amazon S3*

```
aws s3 cp /tmp/calendar.csv s3://test.beintoo.com/tmp/
```

## Load calendar

First truncate *sta.calendar* staging table and load *calendar.csv* file into it.

```
export STAGING_TABLE=calendar
export INCOMING_FILE=s3://test.beintoo.com/tmp/calendar.csv
psql -f dwh/sta/dml/truncate-table.sql
psql -f dwh/sta/dml/copy-from-csv.sql
```

Check that the content loaded is ok, for example launch

```
SELECT COUNT(*) FROM sta.calendar;
```

which should return the same number as `wc -l /tmp/calendar.csv`.

Now you can launch the insert into *dim.calendar*.

```
psql -f dwh/dim/dml/insert-calendar.sql
```

Check that *dim.calendar* was populated as expected, for example, launch

```
SELECT year, month, COUNT(yyyymmdd)
FROM dim.calendar
GROUP BY year, month
ORDER BY year,month;
```

## Cleanup

Finally, you can remove the *calendar.csv* file

```
aws s3 rm s3://test.beintoo.com/tmp/calendar.csv
```

and truncate the *sta.calendar*.

```
psql -f dwh/sta/dml/truncate-table.sql
```

CREATE TABLE dim.calendar (
	yyyymmdd INTEGER,
	year SMALLINT,
	month SMALLINT,
	day_of_year SMALLINT,
	day_of_month SMALLINT,
	day_of_week SMALLINT,
	week_of_year SMALLINT,
	quarter SMALLINT,
	PRIMARY KEY (yyyymmdd)
);
CREATE TABLE sta.calendar (
	yyyymmdd INTEGER,
	year SMALLINT,
	month SMALLINT,
	day_of_year SMALLINT,
	day_of_month SMALLINT,
	day_of_week SMALLINT,
	PRIMARY KEY (yyyymmdd)
);
-- Run this query loading one year at a time into sta.calendar,
-- otherwise the *week_of_year* computation will fail.
INSERT INTO dim.calendar
SELECT
        s.yyyymmdd,
        s.year,
        s.month,
        s.day_of_year,
        s.day_of_month,
        s.day_of_week,
        CASE
		WHEN s.day_of_year < first_sunday_of_year.day THEN 0
		ELSE (((s.day_of_year - first_sunday_of_year.day) - (s.day_of_year - first_sunday_of_year.day) % 7) / 7) + 1
	END AS week_of_year,
	((s.month - (s.month % 4)) / 4) + 1 AS quarter
FROM sta.calendar s,
	(
-- Select first sunday of current year, needed by week_of_year computation.
		SELECT MIN(day_of_year) AS day
		FROM sta.calendar
		WHERE day_of_week = 0 AND day_of_year < 8
	) first_sunday_of_year
-- Do not insert records twice.
WHERE s.yyyymmdd NOT IN (
        SELECT yyyymmdd
        FROM dim.calendar
);
