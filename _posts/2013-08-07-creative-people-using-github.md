---
title: Creative people using GitHub
tags:
  - Git
  - Windows
description: >
    This is a step by step set of instructions on how to use github to contribute to your favourite creative coding project (that is [vvvv](http://vvvv.org) of course) so you can help, improve it, and maybe add features you need for your own projects.
---

## Why using GitHub is a must?

There was a big migration to this site, during the last years. A lot of developers around the world started using github, you can think about it as a kind of *facebook for coders* :) Yes, git is a really attractive tool for developers and github stroke the target of coders. Consider that Google, Facebook, NASA, among others created a GitHub account ... so you should too, right?

## Why follow this article instructions?

There are many ways to use git, and contribute to creative coding. Most of the people has no time to invest learning the large set of git commands and features. You just need to get it working as soon as possible, right? So trust me and use the following instructions.

## Why not using Dropbox?

Dropbox is ok for file sharing, but it is not ok for development and code versioning. You can use Dropbox or emails or whatever, but if you want to boost your productivity you will need the right tools, and git is the right tool for coding.

## Real world example

Consider this scenario: [mrvux](https://github.com/mrvux) started an interesting project, creating a repo that will let contribute people to the girlpower vvvv folder, for its stunning DirectX11 full implementation. Don't worry if you don't know what is the mythic girlpower folder, it's just an example. Strictly speaking is:

> two users will collaborate to the same creative coding project using GitHub.

First of all, go to [GitHub](https://github.com/) and get your account. My nick on GitHub is [fibo](https://github.com/fibo). So for the rest of this article,

> fibo will contribute to mrvux project.

Please note that in the following example I will refer to an open source project, but you can also use private repositories to work with your collegues to your *topSecretBusinessProject*.

## A simple workflow, how to contribute to a repository

Install the [GitHub for Windows](http://windows.github.com/) client. It will let you use git with a user friendly and fresh gui.

So the project I will consider as an example is [mrvux/dx11-vvvv-girlpower][1].

Create your own copy of the repository, go to the [mrvux/dx11-vvvv-girlpower][1] repo and fork it!

[![](http://3.bp.blogspot.com/-DG1rSEXmDMs/UcbmyxOwQlI/AAAAAAAAA1U/jiYA0aRqXbs/s1600/ForkIt.png)](http://3.bp.blogspot.com/-DG1rSEXmDMs/UcbmyxOwQlI/AAAAAAAAA1U/jiYA0aRqXbs/s1600/ForkIt.png)

This will create a copy of the repo under your user namespace, for instance [fibo/dx11-vvvv-girlpower](https://github.com/fibo/dx11-vvvv-girlpower).

It's time to download your own local copy, use the client and clone your repo.

[![](http://1.bp.blogspot.com/-dbFeQTeum2Y/UcbmyDLmbsI/AAAAAAAAA1M/Ufjuv_nuoRE/s1600/CloneIt.png)](http://1.bp.blogspot.com/-dbFeQTeum2Y/UcbmyDLmbsI/AAAAAAAAA1M/Ufjuv_nuoRE/s1600/CloneIt.png)

Just push the "Clone in Windows" button, and use the GitHub for Windows client.

After you open the repo with the client, you can browse the file easily using the explorer.

[![](http://4.bp.blogspot.com/-yqf70MXdaq4/Ucbmz962RZI/AAAAAAAAA1o/1lYIeMwV0SY/s1600/OpenInExplorer.png)](http://4.bp.blogspot.com/-yqf70MXdaq4/Ucbmz962RZI/AAAAAAAAA1o/1lYIeMwV0SY/s1600/OpenInExplorer.png)

Add your stuff, do some modifications and then commit your work clicking the sync button. Everything will be saved to your own fork.

[![](http://1.bp.blogspot.com/-Isswc3_GHZY/UcbmyoJE1nI/AAAAAAAAA1Q/2I2YqP9eF3Q/s1600/CommitAndSync.png)](http://1.bp.blogspot.com/-Isswc3_GHZY/UcbmyoJE1nI/AAAAAAAAA1Q/2I2YqP9eF3Q/s1600/CommitAndSync.png)

To let vux know about your modifications, you can do a pull request.

[![](http://3.bp.blogspot.com/-L5Y4Cvjkym0/Ucbm1Bd_gYI/AAAAAAAAA10/7dHMNB7itjo/s1600/PullRequest.png)](http://3.bp.blogspot.com/-L5Y4Cvjkym0/Ucbm1Bd_gYI/AAAAAAAAA10/7dHMNB7itjo/s1600/PullRequest.png)

It will arrive a notification to mrvux that will merge your modifications to its master repo.
Let me add some advice, that can seem trivial but could save a lot of time:
*   do small modifications, commit often
*   put some short explicative comment about your commit
*   comunicate with other contributors, you could discuss about your modification before doing it
*   please respect conventions, if any :)

So, suppose your contribution was received and it is now part of the official&nbsp;[mrvux/dx11-vvvv-girlpower](https://github.com/mrvux/dx11-vvvv-girlpower),

> congratulations! You did a contribution using GitHub.

## The tricky part, pulling the upstream

Ok, that was not so difficult, but you know, there is always a tricky part ... otherwise instead of designers and developers, people could hire screaming apes :).

Unfortunately there is no **upstream** button on GitHub for Windows client, I also asked support if they can add this feature, they said

> Hi fibo, Thanks for mailing us - unfortunately, at the moment, we don't support working with upstream forks, you'll have to use the command line. However, this is certainly something we would like to implement directly into GitHub for Windows in the future. Thanks for letting us know you'd like to see it!

Soooo, if the project will go on, soon or later you will need to update your local repo with the last version of the original mrvux repo.

Don' t panic it will be really easy, just follow my indications and open a shell.</div>

<div class="separator" style="clear: both; text-align: center;">[![](http://2.bp.blogspot.com/-eOCDrfeTVa8/Ucbmz5Q0IDI/AAAAAAAAA1s/NrQh_sSKeTs/s1600/OpenShell.png)](http://2.bp.blogspot.com/-eOCDrfeTVa8/Ucbmz5Q0IDI/AAAAAAAAA1s/NrQh_sSKeTs/s1600/OpenShell.png)</div>
<div></div>

Only once, you should set the mrvux/dx11-vvvv-girlpower master repository as the **upstream**. In fact if you do

```bash
$ git remote -v
origin  https://github.com/fibo/dx11-vvvv-girlpower.git (fetch)
origin  https://github.com/fibo/dx11-vvvv-girlpower.git (push)
```

Add the vux repo as your **upstream**, so you will get the modifications of all the users back to your local fork. Well, trust me :)

```bash
$ git remote add upstream https://github.com/mrvux/dx11-vvvv-girlpower.git
```

Remember, this is done only once. Now you have your **upstream** set properly

<div class="separator" style="clear: both; text-align: center;">[![](http://4.bp.blogspot.com/-QX89blr7r7s/UcbmzWNdHfI/AAAAAAAAA1k/FudC_U3viIc/s1600/GitRemote.png)](http://4.bp.blogspot.com/-QX89blr7r7s/UcbmzWNdHfI/AAAAAAAAA1k/FudC_U3viIc/s1600/GitRemote.png)</div>

So, now you can refresh your local repo with the latest goodies from the vux repo (the **upstream**) just typing 

```bash
$ git pull upstream master
```

<span style="font-size: large;">pretty easy, just use [the ghost in the shell](https://www.youtube.com/watch?v=ZGJE82p39jI)</span> <span style="font-size: x-large;">:) </span>

I will look for some git hook or transparent user solution to avoid the upstream step.

## See also

[Syncing a fork](https://help.github.com/articles/syncing-a-fork)

  [1]: https://github.com/mrvux/dx11-vvvv-girlpower "mrvux/dx11-vvvv-girlpower GitHub repo"
