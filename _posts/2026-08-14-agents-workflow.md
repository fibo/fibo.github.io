---
title: AI Agents workflow
tags:
  - Node
  - Web
description: >
     How I manage AI Agents to achieve coding tasks, using git worktrees
---

At the time of this writing I am using _Claude_. The Company I am working for, [ready2order](https://ready2order.com/) provided me a subscription and I am gradually entering into agentic AI.

## TL;DR

I have [my global CLAUDE.md and settings](https://github.com/fibo/home/tree/main/Claude) that are aware of my [`/git-worktree` skill](https://github.com/fibo/home/tree/main/Agents/git-worktree/SKILL.md) to achieve tasks using git worktrees in _auto mode_. There is also my [`project-manager` sub-agent](https://github.com/fibo/home/blob/main/Agents/project-manager.md) that plans and manages tasks.

## Principles

### Modularity

Claude models work pretty well right now, however I do not want to tie up myself to Anthropic. This is a general principle of mine

> Be modular. Whenever possible, a "thing" should be like a lego block that you can remove and replace with another that is equivalent.

This "Modularity principle" can be found in many other situations, for example every sailor must know how to use a sextant. Even if nowadays cruises are highly automated, if you sail you __must be able__ to figure out your position in the middle of the sea, using analog equipment.

So, I use a CLAUDE.md file, but I __do not commit it__. Instead I prefer to use a general AGENTS.md file.
Same for skills, I put them in general `~/.agents/skills/` folder, then link them to `~/claude/skills/` folder.

So _modularity_ requires somehow _interchangeability_. It should be possible to replace a "lego block" with another one with no breaking change, or at least hopefully, very few changes.

### Human and AI roles

It is good to clarify and distinguish the two main characters here: _Human_ and _AI_.

> AI should be always used by a _human_ that supervises the final result.

Be also aware of the _AI watermark_ issue, you know if AI generates your content you are not the owner of the content anymore.

Anyway, a _Human_ should always be at the last step, reviewing, approving and eventually modifying what AI generated.

There are also AI hallucinations, poor prompt requirements and other situations that in my opinion lead to this conclusion: a _Human_ must always have the __final say__. That is why in my `git-worktree` skill the AI cannot commit code or handle git conflicts.

## Working folder

Another shift in my current git workflow is using worktrees. Usually I had a single folder with a repository.
Instead now for bigger projects I prefer to have a root folder that can contain for example

- a .git file pointing to a git bare repo
- the git bare repo
- a _.envrc_ file with Environment variables, handled by [direnv](https://direnv.net)
- a folder for every git worktree
- a CLAUDE.md file, if needed with specific instructions for that folder
- a _tasks folder_, more about [tasks below](#tasks).

Still I see many articles on the Internet that are not using git bare repositories.

To clone the repo use the `--bare` flag and create a _.git_ file, for instance

```sh
git clone git@github.com:user/repo.git --bare .bare.git
echo 'gitdir: ./.bare.git' > .git
```

Then I have [my global CLAUDE.md and settings](https://github.com/fibo/home/tree/main/Claude) that are aware of my [git-worktree skill](https://github.com/fibo/home/tree/main/Agents/git-worktree/SKILL.md) to achieve tasks using git worktrees in _auto mode_.

So to start a task, in a `claude` session:

```sh
/git-worktree task-name
```

or

```sh
/git-worktree task goal description bla bla
```

### Git issues

Notice that there can be some git issues, related to git bare repositories.

When you clone a repository with the `--bare` option, Git disables features to optimize space, for example:

- remote-tracking branches (refs/remotes/origin/*)
- git reflogs

If you do a git commit amend and run `git push --force-with-lease` you can get rejected if remote-tracking branches are disabled.

Another issue coming with git bare repositories is that by default they do not track reflogs, so if something happens after a rebase you are not able to restore an orphaned commit.

One solution is to run these commands after you clone the repo.

```sh
main_branch=$(git symbolic-ref --short HEAD)
cd $main_branch
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git config core.logallrefupdates true
```

The solutions above are already included in my `/git-worktree` skill.

Notice that it is actually good that git bare repositories apply those optimizations, however most of the time you will not need them. It is worth to consider to apply exceptions for extra-ordinary projects with particular performance requirements on the git side (i.e. "huge git repos").

## Tasks

The _tasks folder_ is a hidden `.tasks/` folder and it contains a sort of local _Getting Things Done_ board.
Every task is a subfolder, for instance `task-name/`, with a README.md that contains instructions. The folder can contain other files, like images or other assets. The instructions can link to other tasks that can even be in some other _tasks folder_ in another project.
Yes the _tasks folder_ is not necessarily associated to a git repository, for example you could have a macro project with multiple git repositories

    macro_project/
    ├── .envrc
    └── .tasks/
    |   ├── README.md
    |   └── task-name/
    |       └── README.md
    ├── repo1/
    |   ├── .bare.git/
    |   ├── .git
    |   └── .tasks/
    |       └── another-task-name/
    |           └── README.md
    └── repo2/
        ├── .bare.git/
        ├── .envrc
        └── .git

An optional `.tasks/README.md` can contain additional information about how to manage tasks.

A task README.md (i.e. `.tasks/task-name/README.md`) can link another task, for example if it is a requirement or a blocker, or the task itself is an epic that lists multiple tasks.

The task can be assigned to an AI session, and the `task-name` will be used to create a new git worktree, via the `/git-worktree` skill, where the task README.md will be used as the _goal_ of the task, basically the AI prompt.

There is a `.tasks/.DONE/` folder. Once a task is completed, the task folder is moved there.

This workflow works if it is powered by a tool that can check for markdown links: [rumdl](https://rumdl.dev) to the rescue!
Every time that an AI or a human updates a markdown file, check if there are broken links

```sh
rumdl check .tasks/
```

### Reuse tasks

Another advantage of using local tasks folder workflow is that it is flexible. For example I may plan a task, for instance to migrate from `prettier` to `oxfmt`. Once the `project-manager` sub-agent or who/what ever creates the task folder, it can be reused as a task in another project.

Just copying the `.tasks/port-prettier-to-oxfmt/` folder into the other project, for example

```sh
cp -r path/to/.tasks/port-prettier-to-oxfmt/ path/to/another/project/.tasks/
```

Or even piping it into `claude`, even if there is no `.tasks/` folder there (which is the common case for an ordinary git repository).

```sh
cd path/to/current/project/
cat path/to/another/project/.tasks/port-prettier-to-oxfmt/README.md | claude
```

### Synced tasks

This is an __optional information__ about the workflow and must be reported in the `.tasks/README.md`.

The tasks tend to be _volatile_: just simple folders to temporarily hold and organize tasks.

There could be however cases when you need to persist the tasks or imagine different agents instances working on the same project maybe on different computers.

The methodology described above works even if the _tasks_ folder is synced remotely, for example using `rsync` to update it on a remote server. Or another way to sync the `.tasks/` folder is using a git repo.

Imagine you could work on your computer, and at the same time have a remote server you can connect for example using ssh and run AI agent sessions, for example with `screen`.

To sync among processes, use good old IPC: that is create _semaphore files_.
For example, once an AI session or even a human starts working on a task, a file is created in the task folder:

```sh
echo IN_PROGRESS > .tasks/task-name/.status
```

It could be empty or for example contain the Claude session ID.

Another way to sync tasks could be using a remote service like GitHub issues or Jira. AI clients like _Claude Code_ probably already provide official plugins to connect to those services.

But also, not every task folder needs to be synced remotely. For example I can start working on a Jira story and split it into sub tasks only locally.

It is important here to keep flexible and adapt the workflow as much as possible to the constantly changing needs.
For example a solution I found useful for me is to create an "orchestrator" sub-agent, that operates in my `~/Documents/AI_tasks/` folder which is synced to iCloud so I can access it on both my MacBook and MacMini, and it also syncs with an Apple Reminder list named "AI tasks", with simple naming conventions file files and folder in order to connect the task list I can control from my macOS computer, iPad, or iPhone to the agents that are working on different project tasks. The idea is similar to the _tasks folder_ described above but it aggregates several projects I am working on.

## Conclusion

Remember always that the AI is yet another tool, so yet another lego brick that you should be able to swap anytime, maybe with a human, maybe with another AI agent.

And above all, AI is an __amplifier__: if you are bad at coding you will produce even worse code and a watermaked AI slop. If you seek simplicity and the "Right Thing" probably AI will boost your productivity.

The downside is that we'll all have to become more productive, and therefore we'll have to work more.
