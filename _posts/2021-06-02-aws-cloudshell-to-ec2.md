---
title: How to connect via SSH from AWS CloudShell to EC2 installce
tags:
  - AWS
description: >
     Just a quick list of actions and tricks to write down how to connect from AWS CloudShell to an EC2 instance
---

I dropped a pint of beer on my Mac. 😢

Suddenly I realized how slow I am without my personal computer, I need to develop fast, anywhere. Of course nothing can replace my favourite environment but I want to be able to distribute my development tasks.
Recently I read the [AWS CloudShell announcement](https://aws.amazon.com/it/about-aws/whats-new/2020/12/introducing-aws-cloudshell/).

Few years ago, it was a dream for me to have an SSH shell I could connect from everywhere, for free!
My [fibo/home](https://github.com/fibo/home) project, fits perfectly for this porpouse.

But how can I connect to an EC2 instance?

0. Enter your CloudShell from your browser, just click on the CloudShell icon in the AWS console navigation bar.
1. Get your Cloudshell instance IP: launch `curl ifconfig.co`
2. Create or update an Inbound rule for your EC2 instance security group that looks like
    - Type: SSH
    - Origin: The output from the command at point 1. Something like `3.4.5.6/32`.
    - As a description I am adding the following: *My IP on AWS Cloud Shell (launch curl ifconfig.co)*
3. Put your SSH key to some private bucket, then use `aws s3 cp` to copy it to your CloudShell instance.
4. Follow the instructions you get when you click on the "Connect" button in your EC2 instance dashboard. For instance you need to run (only once) a `chmod 400` on you SSH key, and you also need to know th IP of your EC2 instance.

Good luck!
