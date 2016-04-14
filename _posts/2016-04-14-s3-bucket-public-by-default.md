---
title: S3 bucket public by default
tags:
  - AWS
description: >
    How to make an Amazon S3 bucket public by default
---

## How to

Use [Amazon Policy Generator](http://awspolicygen.s3.amazonaws.com/policygen.html) to create the policy.

In **Select Type of Policy** combo box, select *S3 Bucket Policy*.

In the **Principal** text field, enter `*` that means every entity.

In the **Amazon Resource Name (ARN)** text field, if you want to give access to a whole bucket, for instance *pippo*, enter `arn:aws:s3:::pippo/*`.

Finally, click on **Add statement** and then **Generate Policy**; copy the JSON generated and go to your **AWS console > S3**.

Select the *pippo* bucket, open **Properties > Permissions > Add bucket policy** and paste the JSON configuration.

## See also

* [this post][1] on stackoverflow
* [Specifying a Principal in a Policy][2]

[1]: http://stackoverflow.com/questions/19176926/how-to-make-all-objects-in-aws-s3-bucket-public-by-default "How to make all Objects in AWS S3 bucket public by default?"
[2]: http://docs.aws.amazon.com/AmazonS3/latest/dev/s3-bucket-user-policy-specifying-principal-intro.html "Specifying a Principal in a Policy"

