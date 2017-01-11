---
title: S3 bucket public by default
tags:
  - AWS
  - S3
description: >
    How to make an Amazon S3 bucket public by default.
---

## Goal

Make every object in an S3 bucket public by default, so when you upload a file
you do not need to do **Actions > Make public** to make it available on the
internet.
The bucket is called, for instance, *pippo.com* and it will serve static content
under the homonym naked domain, that is ehm *pippo.com*.

## Static web hosting

Configured to serve static content

1. Select it and go to **Properties > Static Web Hosting**.
2. Flag the **Enable Web Hosting**.
3. Set **Index Document** as *index.html* and **Error Document** as *404.html*.
4. Put an *index.html* and *404.html* HTML documents in your bucket.

By now you need to select both files and do **Actions > Make public**.

Configure also a domain for your bucket. Assuming the bucket is on *us-east-1*
zone, just add *pippo.com.s3-website-us-east-1.amazonaws.com* as a CNAME of
*pippo.com* in your DNS provider panel.

## Generate the policy

Use [Amazon Policy Generator](http://awspolicygen.s3.amazonaws.com/policygen.html) to create the policy.

In **Select Type of Policy** combo box, choose *S3 Bucket Policy*.

In the **Principal** text field, enter `*` that means every entity.

In the **Actions** combo box, flag *GetObject*.

In the **Amazon Resource Name (ARN)** text field, if you want to give access to a whole bucket, enter `arn:aws:s3:::pippo.com/*`.

Finally, click on **Add statement** and then **Generate Policy**.
Copy the JSON generated, it will be something like

```
{
  "Id": "Policy1460648957246",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1640468927101",
      "Action": [
        "s3:GetObject"
      ],
      "Effect": "Allow",
      "Resource": "arn:aws:s3:::pippo.com/*",
      "Principal": "*"
    }
  ]
}
```

## Apply the policy

1. Go to your **AWS console > S3**.
2. Select the *pippo* bucket.
3. Open **Properties > Permissions > Add bucket policy**.
4. Paste the JSON configuration and click **Save**.

## See also

* [This post][1] on stackoverflow.
* [Specifying a Principal in a Policy][2]

[1]: http://stackoverflow.com/questions/19176926/how-to-make-all-objects-in-aws-s3-bucket-public-by-default "How to make all Objects in AWS S3 bucket public by default?"
[2]: http://docs.aws.amazon.com/AmazonS3/latest/dev/s3-bucket-user-policy-specifying-principal-intro.html "Specifying a Principal in a Policy"

