---
title: Git extras on Windows
tags:
  - Git
  - Windows
description: >
    I tryed on Windows Git shell the git-extras set of utilities from the prolific visionmedia (a.k.a. TJ Holowaychuk).
---

## Installation

<div class="paper warning">Note that git-extras does <strong>not</strong> support Windows platform. Few commands may not work, see below.</div>

Enter Windows Git shell and launch

```bash
git clone https://github.com/visionmedia/git-extras
cd git-extras
cp bin/* /libexec/git-core/
```

Last command differs from [original installation instructions](https://github.com/tj/git-extras/wiki/Commands#installation). Launching `make install` which will not work even if you install [make for Windows][make].

I just copy bins where are located Windows Git shell ones. It seems tough but it works, and enables autocompletion too.

## Commands

Not all commands will work, for example `git extras` will fail cause `man` is not installed.
The *It works* flag will be added as soon as I will try commands.
Click on the command to read its documentation on [git-extras] *Readme.md*.

| Command                                                                                        | It works |
|------------------------------------------------------------------------------------------------|----------|
|[git-extras](https://github.com/tj/git-extras/wiki/Commands#git-extras-1)                            |✗|
|[git-gh-pages](https://github.com/tj/git-extras/wiki/Commands#git-gh-pages)                          |✓|
|[git-feature](https://github.com/tj/git-extras/wiki/Commands#git-featurerefactorbug-finish-name)     |✓|
|[git-contrib](https://github.com/tj/git-extras/wiki/Commands#git-contrib-author)                     |✓|
|[git-summary](https://github.com/tj/git-extras/wiki/Commands#git-summary)                            |✓|
|[git-effort](https://github.com/tj/git-extras/wiki/Commands#git-effort-file-)                        |✓|
|[git-repl](https://github.com/tj/git-extras/wiki/Commands#git-repl)                                  |✓|
|[git-commit-since](https://github.com/tj/git-extras/wiki/Commands#git-commits-since-date)            |✓|
|[git-count](https://github.com/tj/git-extras/wiki/Commands#git-count)                                |✓|
|[git-release](https://github.com/tj/git-extras/wiki/Commands#git-release)                            |✓|
|[git-alias](https://github.com/tj/git-extras/wiki/Commands#git-alias)                                | |
|[git-ignore](https://github.com/tj/git-extras/wiki/Commands#git-ignore-pattern)                      | |
|[git-info](https://github.com/tj/git-extras/wiki/Commands#git-info)                                  |✓|
|[git-create-branch](https://github.com/tj/git-extras/wiki/Commands#git-create-branch-name)           |✓|
|[git-delete-branch](https://github.com/tj/git-extras/wiki/Commands#git-delete-branch-name)           |✓|
|[git-delete-submodule](https://github.com/tj/git-extras/wiki/Commands#git-delete-submodule-name)     | |
|[git-delete-tag](https://github.com/tj/git-extras/wiki/Commands#git-delete-tag-name)                 |✓|
|[git-fresh-branch](https://github.com/tj/git-extras/wiki/Commands#git-fresh-branch-name)             | |
|[git-graft](https://github.com/tj/git-extras/wiki/Commands#git-graft-src-branch-dest-branch)         | |
|[git-squash](https://github.com/tj/git-extras/wiki/Commands#git-squash-src-branch-msg)               | |
|[git-changelog](https://github.com/tj/git-extras/wiki/Commands#git-changelog)                        |✓|
|[git-undo](https://github.com/tj/git-extras/wiki/Commands#git-undo)                                  | |
|[git-setup](https://github.com/tj/git-extras/wiki/Commands#git-setup-dir)                            | |
|[git-touch](https://github.com/tj/git-extras/wiki/Commands#git-touch-filename)                       |✓|
|[git-obliterate](https://github.com/tj/git-extras/wiki/Commands#git-obliterate-filename)             |✗|
|[git-local-commits](https://github.com/tj/git-extras/wiki/Commands#git-local-commits)                | |
|[git-archive-file](https://github.com/tj/git-extras/wiki/Commands#git-archive-file)                  | |


[git-extras]: https://github.com/tj/git-extras
[make]: http://gnuwin32.sourceforge.net/packages/make.htm

