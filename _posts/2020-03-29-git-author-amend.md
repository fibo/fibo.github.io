---
title: Git author amend
tags:
  - Git
description: >
    How to change the author name and email in Git commit history
---

There can be several use cases when you need to change author *name* and *email* in git commit history.
Before sharing the solution that solved my issue, I would like to share the solution that prevents it.

## How to use multiple git configuration

I am working for a customer that requires git commits are authored with my corporate email, while when I develop my side projects I want to use my GitHub nickname.

Usually I create in my user home folder, a folder named as the domain hosting the code. So for example I have folders:

* github.com
* source.my-customer.com

Now if I want to use a different git config depending on the folder, I edit my *~/.gitconfig* file with something like

```toml
[includeIf "gitdir:github.com/"]
  path = /Users/myuser/github.com/.gitconfig
[includeIf "gitdir:.config/"]
  path = /Users/myuser/github.com/.gitconfig
[includeIf "gitdir:source.my-customer.com/"]
  path = /Users/myuser/source.my-customer.com/.gitconfig
[github]
  user = my-github-nickname
```

Where my */Users/myuser/github.com/.gitconfig* is something like

```toml
[user]
  name = my-github-nickname
  email = my-github-email@example.com
[pull]
	rebase = true
[init]
	defaultBranch = main
```

And the */Users/myuser/source.my-customer.com/.gitconfig* is something similar.

## How to change git history

I found this script [here at stack overflow](https://stackoverflow.com/a/750182/1217468) that uses `git filter-branch`

```sh
#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="your-old-email@example.com"
CORRECT_NAME="Your Correct Name"
CORRECT_EMAIL="your-correct-email@example.com"
if [ "$GIT_COMMITTER_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$OLD_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$CORRECT_NAME"
    export GIT_AUTHOR_EMAIL="$CORRECT_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
```

Just replace the variables `OLD_EMAIL`, `CORRECT_NAME` and `CORRECT_EMAIL` with the correct values, move to the repository folder and launch it. When it is done, probably you need to force the push

```sh
git push --force
```

Notice that if the commits need to be changed are also on a *git tag*, you need to fetch it and modify it locally, delete it remotely and then push it again.
