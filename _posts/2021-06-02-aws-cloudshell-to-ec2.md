---
title: How to connect via SSH from AWS CloudShell to EC2 instance
tags:
  - AWS
description: >
     Just a quick list of actions and tricks to write down how to connect from AWS CloudShell to an EC2 instance
---

I dropped a pint of beer on my Mac. 😢

Suddenly, I realized how slow I am without my personal computer. I need to be able to develop quickly, anywhere. Of course, nothing can replace my favorite environment, but I want to be able to distribute my development tasks.
Recently, I read the [AWS CloudShell announcement](https://aws.amazon.com/it/about-aws/whats-new/2020/12/introducing-aws-cloudshell/).

A few years ago, it was a dream for me to have an SSH shell I could connect to from anywhere, for free! But how can I connect to an EC2 instance?

1. Enter your CloudShell from your browser by clicking on the CloudShell icon in the AWS console navigation bar.
2. Get your CloudShell instance IP: run `curl ifconfig.co`
3. Create or update an inbound rule for your EC2 instance's security group:
  - Type: SSH
  - Source: The output from the command in step 2, e.g., `3.4.5.6/32`.
  - For the description, I add: *My IP on AWS CloudShell (run curl ifconfig.co)*
4. Upload your SSH key to a private S3 bucket, then use `aws s3 cp` to copy it to your CloudShell instance.
5. Follow the instructions you get when you click the "Connect" button in your EC2 instance dashboard. For example, you need to run `chmod 400` on your SSH key (only once), and you also need to know the IP of your EC2 instance.

Good luck!
