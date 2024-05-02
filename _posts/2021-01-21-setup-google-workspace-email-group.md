---
title: How to setup Google Workspace group to send and receive email
tags:
  - Google
  - Marketing
description: >
    Follow these complete instructions to create a group Google Workspace to send and receive email.
---

## Goal

I have two user emails created on my *Google Workspace*, for example *bob@my-company.com* and *alice@my-company.com*. Both are in the *administration@my-company.com* group. We are going to achieve that they can receive and reply to emails as *administration@my-company.com*

## Instructions

Login to [Admin console](https://admin.google.com). Go to *Groups* and create a group email, for example, *Administration* with email *administration@my-company.com*, then add the users.

In order to be able to receive emails from outside, for example when you register on a website, make sure to check the *External* flag in the **Publish posts** row.

![Extenal can publish posts](/images{{ page.id }}/external-can-publish-posts.png)

Then every member need to configure his/her settings to enable **send mail as** feature.

![Add another email](/images{{ page.id }}/gmail-add-another-email.png)

In the confirmation box (the yellow one) make sure that *Treat as an alias* is **NOT** checked.

Go ahead and complete with email confirmation code as required.

Once completed you will be able with your *user email* not only to receive emails sent to the *group email* but also to reply them. During email composition, just click on the dropdown icon to choose a group email address.

## Bonus tip

This is **hot**! You can add a *domain alias* and manage multiple projects with different domains on a single Google Workspace account. Enter the [admin console](https://admin.google.com), go to the *Domains* section and add an alias domain.

Following the instructions, I added a <code>TXT</code> record on my *Route 53* panel at the *AWS* account that manages my alias domain.

Then configured the `MX` records, this is what *Google* provided me

![MX records on Google](/images{{ page.id }}/mx-records-on-google.png)

and this is how I translated the *priorities* into *AWS* console

![MX records on AWS](/images{{ page.id }}/mx-records-on-aws.png)

When DNS propagated I was able to receive an email to *myuser@my-alias-domain.com* on my *Google Workspace* gmail.

## Credits

[Send & Receive Emails From G Suite Groups](https://www.goldyarora.com/g-suite-groups/)
