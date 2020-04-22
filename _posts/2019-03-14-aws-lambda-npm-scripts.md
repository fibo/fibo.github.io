---
title: AWS Lambda npm scripts
tags:
  - AWS
  - Node
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
* Your *AWS account id* is, ehm, `1234567890`. It is stored in an environment variable: `AWS_ACCOUNT_ID`.
* Your project uses DynamoDB.
* Code is in *src/* folder and package main file is *src/index.js*.
* Lambdas main function is named `handler`.

## `package.json`

Every Lambda needs its own folder containing a *package.json*.
The package name will be used as the function name, usually I prefix it with current project name. Package name should be lowercase, you know.
Also the *description* will appear on your AWS Console.
Probably you want to make it private.
Something like the following

```json
{
  "name": "myproject-foo",
  "description": "myproject foo bla bla",
  "private": true,
  "main": "src/index.js",
  "scripts": {

  }
}
```

## Permissions

Create a IAM role, for instance *lambda_dynamo_myproject*, that has permissions on all table prefixed by *MyProject* and can write logs.

I created a *iam/* folder with the following files

> lambda-policy.json

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

> lambda-role.json

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": [
          "lambda.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Create role:

```bash
aws iam create-role --role-name MyProject --assume-role-policy-document file://iam/lambda-role.json --profile myproject
```

Create policy:

```bash
aws iam create-policy --policy-name lambda_dynamo_myproject --policy-document file://iam/lambda-policy.json --profile myproject
```

Attach policy:

```bash
aws iam attach-role-policy --policy-arn arn:aws:iam::$AWS_ACCOUNT_ID:policy/lambda_dynamo_myproject --role-name MyProject --profile myproject,
```

## Config

I usually create a *config* attribute like this

```json
  "config": {
    "log_retention": 7,
    "memory_size": 128,
    "runtime": "nodejs12.x",
    "profile": "myproject",
    "region": "us-east-1",
    "role": "lambda_dynamo_myproject",
    "timeout": 10
  }
```

<div paper="paper info">
Node.js runtime <code>nodejs12.x</code> may be outdated and not yet avaialable, you are going to use the currently supported version.
</div>

## Environment

This was a tricky one. The correct syntax was not documented. Luckily I could find a [solution askying on GitHub](https://github.com/aws/aws-cli/issues/2638#issuecomment-352901978).

Suppose you need the following environment variables

* `ENVIRONMENT_VARIABLE`
* `ANOTHER_ENVIRONMENT_VARIABLE`

Add the following npm script

```bash
"set_environment": "aws lambda update-function-configuration --region $npm_package_config_region --profile $npm_package_config_profile --function-name $npm_package_name --environment \"Variables={ENVIRONMENT_VARIABLE=$ENVIRONMENT_VARIABLE,ANOTHER_ENVIRONMENT_VARIABLE=$ANOTHER_ENVIRONMENT_VARIABLE}\"",
```

## Create and deploy

Add the following scripts to your *package.json*

```json
    "copy": "cp -r src/* build/; cp -r node_modules/ build/node_modules",
    "create": "aws lambda create-function --region $npm_package_config_region --profile $npm_package_config_profile --function-name $npm_package_name --description \"$npm_package_description\" --runtime $npm_package_config_runtime --handler index.handler --role arn:aws:iam::$AWS_ACCOUNT_ID:role/$npm_package_config_role --zip-file fileb://build.zip",

    "create_log_group": "aws logs create-log-group --log-group-name /aws/lambda/$npm_package_name",
    "deploy": "aws lambda update-function-code --region $npm_package_config_region --profile $npm_package_config_profile --function-name $npm_package_name --zip-file fileb://build.zip",
    "postcreate_log_group": "npm run set_log_retention",
    "postcreate": "npm run create_log_group; npm run set_timeout; npm run set_memory_size; rm -rf build/",
    "postdeploy": "rm -rf build/; rm build.zip",
    "precopy": "rm -rf node_modules/; npm install --production; rm -rf build; mkdir build",
    "predeploy": "npm run zip",
    "precreate": "npm run zip",
    "prezip": "rm -rf build.zip; npm run copy",
    "set_log_retention": "aws logs put-retention-policy --region $npm_package_config_region --profile $npm_package_config_profile --log-group-name /aws/lambda/$npm_package_name --retention-in-days $npm_package_config_log_retention",
    "set_memory_size": "aws lambda update-function-configuration --region ${npm_package_config_region} --profile ${npm_package_config_profile} --function-name $npm_package_name --memory-size $npm_package_config_memory_size",
    "set_runtime": "aws lambda update-function-configuration --region $npm_package_config_region --profile $npm_package_config_profile --function-name $npm_package_name --runtime $npm_package_config_runtime",
    "set_timeout": "aws lambda update-function-configuration --region $npm_package_config_region --profile $npm_package_config_profile --function-name $npm_package_name --timeout $npm_package_config_timeout",
    "zip": "cd build; zip -X -r ../build.zip * > /dev/null; cd ..",
```

Only once, create the lambda with

```bash
npm run create
```

In my case I also need to set [Environment variables](#environment) and then launch

```bash
npm run set_environment
```

After that, you can deploy later updates launching just

```bash
npm run deploy
```

You can update *log retention*, *memory size*, *runtime* (i.e. Node.js version) and *timeout* by editing *config* content in your *package.json* and run

```bash
npm run set_log_retention
npm run set_memory_size
npm run set_runtime
npm run set_timeout
```

## Dependencies

Add your dependencies using npm as usual.  Consider there is a size limit on the zip file uploaded.

<div paper="paper info">
You do not need to install <em>aws-sdk</em> package since <b>it is already provided</b> on cloud instances.
</div>

## Deletion

Complete your script with the possibility to delete the lambda, add the following

```json
    "_delete": "aws lambda delete-function --region $npm_package_config_region --profile $npm_package_config_profile --function-name $npm_package_name",
    "_delete_log_group": "aws logs delete-log-group --log-group-name /aws/lambda/$npm_package_name",
    "post_delete": "npm run delete_log_group",
```

So you can delete your function launching

```bash
npm run _delete
```

<div class="paper warning">
Notice that the *_delete* string has an underscore prefix otherwise it is error prone, due to bash completion on npm scripts, in particular when you launch *npm run deploy*.
</div>

