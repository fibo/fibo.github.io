---
title: How to connect via SSH from AWS CloudShell to EC2 instance
tags:
  - AWS
description: >
     Just a quick list of actions and tricks to write down how to connect from AWS CloudShell to an EC2 instance
---

## TL;DR

These are the steps you need to follow:

1. Enter your CloudShell from your browser by clicking on the CloudShell icon in the AWS console navigation bar.
2. Get your CloudShell instance IP: run `curl checkip.amazonaws.com`
3. Create or update an inbound rule for your EC2 instance's security group:
  - Type: SSH
  - Source: The output from the command in step 2, e.g., `3.4.5.6/32`.
  - For the description, I add: *My IP on AWS CloudShell (run curl ifconfig.co)*
4. Use the SSH key pair you created: see how to [create an SSH key](#create-an-ssh-key).
5. Follow the instructions you get when you click the "Connect" button in your EC2 instance dashboard. For example, you need to run `chmod 400` on your SSH key (only once), and you also need to know the IP of your EC2 instance.

Good luck!

## Why

I dropped a pint of beer on my Mac. 😢

Suddenly, I realized how slow I am without my personal computer. I need to be able to develop quickly, anywhere. Of course, nothing can replace my favorite environment, but I want to be able to distribute my development tasks.
Recently, I read the [AWS CloudShell announcement](https://aws.amazon.com/it/about-aws/whats-new/2020/12/introducing-aws-cloudshell/).

A few years ago, it was a dream for me to have an SSH shell I could connect to from anywhere, for free! Now it is possible.

Fun fact, almost 20 years ago when I started using Linux I had no connection to the Internet (I was living in a kind of squat apartment, in the "vicoli" area at via Gramsci 1, Genoa, Italy) and I spent almost one month learning on my Slackware distro digging the man until I was able to mount the Floppy Disk 💾.

Yes, and afterwards mounting the Compact Disc was a huge win. In the meanwhile somebody was growing ganja in the darkroom... 😂

But nowadays our attention span is muuuuch lower, so I also want connect to an EC2 instance. How can I do it?

## Know your CloudShell IP

I will need to know the IP of my CloudShell instance, that is the trick I want to share in this article. Long story short, run this command in CloudShell:

```shell
curl checkip.amazonaws.com
```

The IP is needed because when you create the EC2 Security Group, you want to make sure that the inbound rule allows SSH connections only from your CloudShell instance IP address.

<div class="paper info">There are many online services that can tell your IP address, like <code>icanhazip.com</code>, <code>ifconfig.me</code> but it makes sense in this context to report the one provided by AWS.</div>

## Create an SSH key

Another tip is to create the SSH key pair in the CloudShell instance itself, so the access is bounded to AWS services. You know,

> Security is a process

You can create the key pair with a command like:

```shell
aws ec2 create-key-pair --key-name MyKeyPair --query 'KeyMaterial' --output text > ~/.ssh/MyKeyPair.pem
chmod 400 ~/.ssh/MyKeyPair.pem
```

Once you create the key pair, it will be available in your AWS account, so you can use it to connect to your EC2 instances.

Notice I used the "MyKeyPair" name, of course you can use your own but most importantly I placed the key in the `~/.ssh` folder. Again, you can use any path you want, but it is a good practice to use the default SSH folder.

The `chmod 400` command is mandatory, every time you create an SSH key otherwise the `ssh` command will silently fail.

<div class="paper info">Your AWS CloudShell instance has 1GB of disk space available and data in your Home directory is preserved for 120 days from your latest access.</div>

## Home sweet home

If you read this far, you already know how to connect from AWS CloudShell to your EC2 instance. Let me share a last opinionated tip. Probably you want to skip it, it is a tip for the future me. Still it is worth to share it, you may like to do something similar. I have a script I run to setup my Unix home directory every time I start a new machine. You probably want to have your own settings but you may find it an interesting approach. Many other users do the same, basically you have a Git repository with your dotfiles and a script to setup everything. This is my own [fibo/home](https://github.com/fibo/home) 🏠.
