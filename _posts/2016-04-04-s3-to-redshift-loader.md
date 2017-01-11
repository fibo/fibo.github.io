---
title: S3 to RedShift loader
tags:
  - S3
  - RedShift
  - Lambda
  - apex
description: >
    Load data from S3 to RedShift using Lambda, powered by apex. Our goal is: every time the AWS Elastic load balancer writes a log file, load it into RedShift.
---

## Table creation

Assume there is a **sta** schema, containing staging tables.
Yes, this is old school Data Warehouse.

Create the staging table that will contain the loaded log files

```sql
/**
 * See also
 * http://docs.aws.amazon.com/ElasticLoadBalancing/latest/DeveloperGuide/access-log-collection.html
 *
 * http://blogs.aws.amazon.com/bigdata/post/Tx2Z5UY685A20PL/-Using-Amazon-span-class-matches-Redshift-span-to-Analyze-Your-Elastic-Load-Bala
 */
CREATE TABLE sta.elb_log (
	request_time DATETIME ENCODE LZO,
	elb VARCHAR(100) ENCODE LZO,
	client_port VARCHAR(22) ENCODE LZO,
	backend_port VARCHAR(22) ENCODE LZO,
	request_processing_time FLOAT ENCODE BYTEDICT,
	backend_processing_time FLOAT ENCODE BYTEDICT,
	response_processing_time FLOAT ENCODE BYTEDICT,
	elb_status_code VARCHAR(3) ENCODE LZO,
	backend_status_code VARCHAR(3) ENCODE LZO,
	recieved_bytes BIGINT ENCODE LZO,
	sent_bytes BIGINT ENCODE LZO,
	request VARCHAR(MAX),
	user_agent VARCHAR(MAX) ENCODE LZO,
	ssl_cipher VARCHAR(100),
	ssl_protocol VARCHAR(100)
)
SORTKEY(request_time)
;
```

## Lambda function

Take a look to [apex]. It is the latest [TJ Holowaychuk](https://github.com/tj) project and it is
really useful to deal with Lambda functions workflow.

Create a project, run

```bash
apex init
```

Create a *functions/loader/index.js* to store your AWS Lambda function code.
Note the `connectionString`, `AWS_SECRET_ACCESS_KEY` and `AWS_ACCESS_KEY_ID` to be filled.

```javascript
var pg = require('pg')
// TODO Set credentials properly --+----+----+----------------------------------+
//                                 ↓    ↓    ↓                                  ↓
var connectionString = 'postgres://user:pass@dbhost.redshift.amazonaws.com:5439/dbname'

exports.handle = function (ev, ctx) {
  console.log('Received event:', JSON.stringify(ev, null, 2))

  // Get the object from the event and show its content type.
  var bucket = ev.Records[0].s3.bucket.name
  var key = decodeURIComponent(ev.Records[0].s3.object.key.replace(/\+/g, ' '))

  // AWS_DEFAULT_REGION=us-west-1
  var AWS_SECRET_ACCESS_KEY = 'TODO *FILLME*'
  var AWS_ACCESS_KEY_ID = 'TODO *FILLME*'

  var s3Path = 's3://' + bucket + '/' + key
  var targetTable = 'sta.elb_log'
  var credentials = 'aws_access_key_id=' + AWS_ACCESS_KEY_ID + ';aws_secret_access_key=' + AWS_SECRET_ACCESS_KEY

  function quote (x) { return "'" + x + "'" }

  var copyStatement = [
    'COPY ' + targetTable,
    'FROM ' + quote(s3Path),
    'CREDENTIALS ' + quote(credentials),
    'COMPUPDATE OFF',
    "DELIMITER ' '",
    "TIMEFORMAT AS 'auto'",
    'ACCEPTINVCHARS',
    'REMOVEQUOTES',
    'FILLRECORD',
    'MAXERROR as 10000'
  ].join('\n')

  var client = new pg.Client(connectionString)
  client.connect()

  var query = client.query(copyStatement)

  // query.on('row', function (row, result){ result.addRow(row) })

  query.on('error', function (error) {
    client.end()
    console.error(error)
    ctx.fail(error)
  })

  query.on('end', function (result) {
    client.end()

    var message = 'Loaded ' + s3Path

    console.log(message)
    ctx.succeed(message)
  })
}
```

Install required deps, for instance

```bash
cd functions/loader
npm init -y
npm install pg --save
cd -
```

No need to create a zip and uploading it, you can deploy it by launching

```bash
apex deploy
```

and you are done!

## Permissions

Create a IAM role for your lambda function, something like *lamdba_s3_to_redshift_loader*
with the following policies attached.

![IAM_policies](/images{{ page.id }}/iam_policies.png)

Put the ARN role in your apex project.json. Note that you must replace
*123456789000* with your AWS account id.

```json
{
  "name": "load_ELB_logs",
  "description": "load ELB logs from S3 to Redshift",
  "memory": 128,
  "timeout": 30,
  "role": "arn:aws:iam::123456789000:role/lamdba_s3_to_redshift_loader",
  "environment": {}
}
```

## Debug

Debugging serverless code can be tricky. I found useful the following fake lambda code, I put in *functions/loader/test.js*

```javascript
var ev = require('./test_event.json')
var ctx = {
  succeed: console.log.bind(console),
  fail: console.error.bind(console)
}

var handle = require('./index').handle

handle(ev, ctx)
```

Where *test_event.json* contains a copy of the test event configured on AWS. Something like

```json
{
  "Records": [
    {
      "eventVersion": "2.0",
      "eventTime": "1970-01-01T00:00:00.000Z",
      "requestParameters": {
        "sourceIPAddress": "127.0.0.1"
      },
      "s3": {
        "configurationId": "testConfigRule",
        "object": {
          "eTag": "0123456789abcdef0123456789abcdef",
          "sequencer": "0A1B2C3D4E5F678901",
          "key": "logs-trk-elb/AWSLogs/880017770521/elasticloadbalancing/eu-west-1/2016/04/04/880017770521_elasticloadbalancing_eu-west-1_trk_20160404T0000Z_52.30.150.180_1ltvx7zo.log",
          "size": 1024
        },
        "bucket": {
          "arn": "arn:aws:s3:::s3.beintoo.net",
          "name": "s3.beintoo.net",
          "ownerIdentity": {
            "principalId": "EXAMPLE"
          }
        },
        "s3SchemaVersion": "1.0"
      },
      "responseElements": {
        "x-amz-id-2": "EXAMPLE123/5678abcdefghijklambdaisawesome/mnopqrstuvwxyzABCDEFGH",
        "x-amz-request-id": "EXAMPLE123456789"
      },
      "awsRegion": "us-east-1",
      "eventName": "ObjectCreated:Put",
      "userIdentity": {
        "principalId": "EXAMPLE"
      },
      "eventSource": "aws:s3"
    }
  ]
}
```

[apex]: http://apex.run/ "apex"
