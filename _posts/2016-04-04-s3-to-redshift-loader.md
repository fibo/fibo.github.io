---
title: How to use Devel::Cover
tags:
  - S3
  - RedShift
  - Lambda
  - apex
description: >
    Load data from S3 to RedShift using Lambda, powered by apex
---

## Goal

Every time the AWS Elastic load balancer writes a log file, load it into RedShift.

This article is still WIP, I will update it with results. By now the lambda is working and I am so excited I want to write this early draft.

## Table creation

Assume there is a **sta** schema, containing staging tables.
Yes, this is old school Data Warehouse.

Create the staging table that will contain the loaded log files

```
/**
 * See also
 * http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/access-log-collection.html
 *
 * http://blogs.aws.amazon.com/bigdata/post/Tx2Z5UY685A20PL/-Using-Amazon-span-class-matches-Redshift-span-to-Analyze-Your-Elastic-Load-Bala
 */
CREATE TABLE sta.trk_elb (
	request_time DATETIME encode lzo,
	elb VARCHAR(100) encode lzo,
	client_port VARCHAR(22) encode lzo,
	backend_port VARCHAR(22) encode lzo,
	request_processing_time FLOAT encode bytedict,
	backend_processing_time FLOAT encode bytedict,
	response_processing_time FLOAT encode bytedict,
	elb_status_code VARCHAR(3) encode lzo,
	backend_status_code VARCHAR(3) encode lzo,
	recieved_bytes BIGINT encode lzo,
	sent_bytes BIGINT encode lzo,
	request VARCHAR(MAX),
	user_agent VARCHAR(MAX) encode lzo,
	ssl_cipher VARCHAR(100),
	ssl_protocol VARCHAR(100)
)
SORTKEY(request_time)
;
```

## Lambda function

Take a look to [apex](http://apex.run/). It is the latest [TJ Holowaychuk](https://github.com/tj) project: it is
really useful to deal with Lambda functions workflow.

```
var pg = require('pg')
var connectionString = 'postgres://user:pass@dbhost.redshift.amazonaws.com:5439/dbname'

exports.handle = function (ev, ctx) {
  // Get the object from the event and show its content type.
  var bucket = ev.Records[0].s3.bucket.name
  var key = decodeURIComponent(ev.Records[0].s3.object.key.replace(/\+/g, ' '))

  var params = {
    Bucket: bucket,
    Key: key
  }

  var client = new pg.Client(connectionString)
  client.connect()

  var query = client.query('SELECT * FROM trk.incident;')

  query.on('row', function (row, result){ result.addRow(row) })

  query.on('end', function (result){
    params.rows = result.rows

    client.end()

    ctx.succeed(params)
  })
}
```

No need to create a zip and uploading it, you can deploy it by launching

````
apex deploy
```

## Permission

Create a IAM role for your lambda function, something like *lamdba_s3_to_redshift_loader*
with the following policies attached.

![IAM_policies](//{{ site.domain }}/images{{ page.id }}/iam_policies.png)

