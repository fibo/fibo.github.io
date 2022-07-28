---
title: Working with git branches
tags:
  - Git
description: >
    Learn how to perform basic tasks with git local and remote branches.
---

<div class="paper info">Launch all the commands in this tutorial, from the first to the last, and you will cover almost all operations on branches.
</div>

<div class="paper warning">
Please notice also that the default branch name is set to <b>main</b>, it may differ according to your settings.</div>

## Clone a repo

First of all, since we are going to talk also about remote branches, you need to clone a repo. For instance, suppose I am cloning a brand new repository I just created on GitHub.

```sh
git clone https://github.com/my-user/myNewRepo.git
```

Then, of course, you need to enter in the repository folder...

```sh
cd myNewRepo
```

...but if you are using GitBash on Windows you can also right click the folder and open a bash shell.

## Default branch

To get the default branch you can launch

```sh
basename $(git symbolic-ref refs/remotes/origin/HEAD)
```

## Show current branch

The first command you need to know in order to use git branches will answer the question

> Which is current branch?

The answer is easy, just launch

```sh
git branch
```

Since this is a new repository you should see only the main branch.

## Create a local branch

Create a new *develop* branch and switch to it

```sh
git checkout -b develop
```

Now you are on *develop* branch, add or edit some file, the README.md for instance, so the below *merge* command will make sense. Use your favourite editor, that is **vim** of course!

Do some modification and commit

```sh
git commit -am 'added repo infos'
```

## Create a remote branch

Just push the local branch to remote *origin*.

```sh
git push origin develop
```

## Show differences

Now that you have a branch other than *main* you may want to add some code or do a revision of code in the branch. It can be handy to compare current branch with *main*, to do so launch

```sh
git diff --name-status main
```

To compare any pair of branches

```sh
git diff --name-status firstbranch..yourBranchName
```

## Fetch updates

If you want to get latest updates

```sh
git fetch
```

## Align with main branch

Get latest updates from main branch into your current working branch

```sh
git rebase main
```

## Change branch

If you want to go back to main branch launch

```sh
git switch main
```

Note that before switching branch, you may need to commit changes, if any.

## Merge two branches

If you want to merge *develop* into main, launch

```sh
git merge develop
```

## Delete a local branch

If you want to delete develop branch locally, launch

```sh
git branch -d develop
```

It must be a merged branch, otherwise use `git branch -D` to force it.

## Show remote branches

Branch *develop* on remote *origin* still exists, see

```sh
git branch -r
```

## Checkout existing remote branch

When you clone a repo by default `git branch` will show only *main* branch. Suppose you want to work on a remote *develop* branch, launch this to check it out

```sh
git checkout -b develop origin/develop
```

Now you have again a local *develop* branch and it is your **current** branch.

## Update local branch from remote

If you want to fetch last version of your remote *develop* branch and merge it to your local *develop* branch, launch

```sh
git pull origin develop
```

Since in this case there is no difference between remote and local *develop* branch, git will answer with an *Already up-to-date* message.

## Delete a remote branch

Suppose you want to delete *develop* remote branch, launch

```sh
git push origin :develop
```

Note that this will not remove your *develop* local branch.

## Cleanup remote branches

Remove local references to remove branches that do not exist anymore.
This is useful in case the remote branch was removed somewhere else.

```sh
git remote prune origin
```

You can also run

```sh
git fetch -p
```

which removes any remote-tracking references that no longer exist on the remote, and then it fetches.

## Cleanup local branches

Show branched that are already merged (be careful, it also shows the main branch)

```sh
git branch --merged
```

Remove local branches (excluding main branch) that are already merged

```sh
git switch `basename $(git symbolic-ref refs/remotes/origin/HEAD)`; git branch --merged | grep -v `basename $(git symbolic-ref refs/remotes/origin/HEAD)` | while read branch; do git branch -d $branch; done
```

The output of `git branch -v` will label as **[gone]** a branch with no remote reference.
So to remove local branches with no remote reference, launch

```sh
git fetch -p && for branch in $(git branch -vv | grep '\[gone\]' | awk '{print $1}'); do git branch -D $branch; done
```
