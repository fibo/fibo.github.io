---
title: AWS Lambda npm scripts
tags:
  - AWS
  - Serverless
description: >
     AWS Lambda is great! But even better, there is no need to add any framework on top for management. You can use npm scripts.
---

## Requirements

Ok, you are using Node.js to implement your [AWS Lambdas](https://aws.amazon.com/it/lambda). You will also need also [AWS CLI](https://github.com/aws/aws-cli) installed.

<div class="paper warning">
Npm default shell is bash. All npm scripts here are written assuming you are in Unix environment.
</div>

It is recommended also to create an AWS CLI profile, for instance *myproject*.

Deployment needs **zip** command.

## Assumptions

The npm scripts below assume, just to simplify, that:

* Lambdas run on *us-east-1* region.
* Node.js runtime is `8.10`.
* You created a *myproject* AWS CLI profile and your keys own all required permissions.
* Your *AWS account id* is, ehm, `1234567890`.
* Your project uses DynamoDB.
* Code is in *src/* folder and package main file is *src/index.js*.
* Lambdas main function is named `handler`.

## `package.json`

Every Lambda needs its folder and a *package.json*.
The package name will be used as the function name, usually I prefix it with current project name. Package name should be lowercase, you know.
Also the *description* will appear on your AWS Console.
Probably you want to make it private.

```json
{
  "name": "myproject-foo",
  "description": "myproject foo bla bla",
  "main": "src/index.js",
  "private": true,
  "scripts": {

  }
}
```

## Permissions

Create a IAM role, for instance *lambda_dynamo_myproject*, that has permissions on all table prefixed by *MyProject* and can write logs.

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:DeleteItem",
                "dynamodb:ListTables",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:Query",
                "dynamodb:Scan"
            ],
            "Resource": "arn:aws:dynamodb:us-east-1:1234567890:table/MyProject*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        }
    ]
}
```


## Environment

This was a tricky one. The correct syntax was not documented. Luckily I could find a [solution askying on GitHub](https://github.com/aws/aws-cli/issues/2638#issuecomment-352901978).

In my case I was writing a trading bot using [BitStamp exchange](https://www.bitstamp.net/), so I needed the following environment variables

* `BITSTAMP_APIKEY`
* `BITSTAMP_APISECRET`
* `BITSTAMP_CUSTOMERID`

Add the following npm script

```bash
"set_environment": "aws lambda update-function-configuration --region us-east-1 --profile bitstamp --function-name ${npm_package_name} --environment \"Variables={BITSTAMP_CUSTOMERID=$BITSTAMP_CUSTOMERID,BITSTAMP_APISECRET=$BITSTAMP_APISECRET,BITSTAMP_APIKEY=$BITSTAMP_APIKEY}\"",
```
## Config

I usually create a *config* attribute like this

```json
"config": {
  "log_retention": 7,
  "timeout": 10
}
```

And add the following npm scripts to set them

```json
"set_log_retention": "aws logs put-retention-policy --region us-east-1 --profile myproject --log-group-name /aws/lambda/$npm_package_name --retention-in-days $npm_package_config_log_retention",
"set_timeout": "aws lambda update-function-configuration --region us-east-1 --profile myproject --function-name ${npm_package_name} --timeout ${npm_package_config_timeout}",
```

## Create and deploy

Add the following scripts to your *package.json*

```json
"copy": "cp -r src/* build/; cp -r node_modules/ build/node_modules",
"create": "aws lambda create-function --region us-east-1 --profile myproject --function-name ${npm_package_name} --description \"${npm_package_description}\" --runtime nodejs8.10 --handler index.handler --role arn:aws:iam::1234567890:role/lambda_dynamo_myproject --zip-file fileb://build.zip",
"deploy": "aws lambda update-function-code --region us-east-1 --profile myproject --function-name ${npm_package_name} --zip-file fileb://build.zip",
"precopy": "rm -rf node_modules/; npm install --production; rm -rf build; mkdir build",
"predeploy": "npm run zip",
"precreate": "npm run zip",
"prezip": "rm -rf build.zip; npm run copy",
"zip": "cd build; zip -X -r ../build.zip * > /dev/null; cd ..",
```

Only once, create the lambda with

```bash
npm run create
npm run set_timeout
npm run set_log_retention
```

In my case I also need to set [Environment variables](#environment) and then launch

```bash
npm run set_environment
```

After that, you can deploy later updates launching just

```bash
npm run deploy
```

## Dependencies

Add your dependencies using npm as usual. However you do not need to install *aws-sdk* package since it is already provided on cloud instances.
Consider there is a size limit on the zip file uploaded.
