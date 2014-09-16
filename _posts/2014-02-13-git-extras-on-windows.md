---
title: Git extras on Windows
tags:
  - Git
  - Windows
description: >
    I tryed on Windows Git shell the <a href="https://github.com/visionmedia/git-extras">git-extras</a> set of utilities from the prolific <a href="https://github.com/visionmedia">visionmedia</a> (a.k.a. TJ Holowaychuk).
---

## Installation

<div class="alert alert-warning">Note that git-extras does <strong>not</strong> support Windows platform. Few commands may not work, see below.</div>

Enter Windows Git shell and launch

```bash
git clone https://github.com/visionmedia/git-extras
cd git-extras
cp bin/* /libexec/git-core/
```

Last command differs from [original installation instructions](https://github.com/visionmedia/git-extras#installation). Launching `make install` which will not work even if you install [make for Windows][4]. 

I just copy bins where are located Windows Git shell ones. It seems tough but it works, and enables autocompletion too.

## Commands

Not all commands will work, for example `git extras` will fail cause `man` is not installed.
The *It works* flag will be added as soon as I will try commands.
Click on the command to read its documentation on [git-extras][3] *Readme.md*.

| Command                                                                                        | It works |
|------------------------------------------------------------------------------------------------|----------|
|[git-extras](https://github.com/visionmedia/git-extras#git-extras-1)                            |✗        |
|[git-gh-pages](https://github.com/visionmedia/git-extras#git-gh-pages)                          |✓        |    
|[git-feature](https://github.com/visionmedia/git-extras#git-featurerefactorbug-finish-name)     |✓        |
|[git-contrib](https://github.com/visionmedia/git-extras#git-contrib-author)                     |✓        |
|[git-summary](https://github.com/visionmedia/git-extras#git-summary)                            |✓        |
|[git-effort](https://github.com/visionmedia/git-extras#git-effort-file-)                        |✓|
|[git-repl](https://github.com/visionmedia/git-extras#git-repl)                                  |✓|
|[git-commit-since](https://github.com/visionmedia/git-extras#git-commits-since-date)            |✓|
|[git-count](https://github.com/visionmedia/git-extras#git-count)                                |✓|
|[git-release](https://github.com/visionmedia/git-extras#git-release)                            |✓|
|[git-alias](https://github.com/visionmedia/git-extras#git-alias)                                |        |
|[git-ignore](https://github.com/visionmedia/git-extras#git-ignore-pattern-)                     |        |
|[git-info](https://github.com/visionmedia/git-extras#git-info)                                  |✓|
|[git-create-branch](https://github.com/visionmedia/git-extras#git-create-branch-name)           |✓|
|[git-delete-branch](https://github.com/visionmedia/git-extras#git-delete-branch-name)           |✓|
|[git-delete-submodule](https://github.com/visionmedia/git-extras#git-delete-submodule-name)| |
|[git-delete-tag](https://github.com/visionmedia/git-extras#git-delete-tag-name)                 |✓|
|[git-fresh-branch](https://github.com/visionmedia/git-extras#git-fresh-branch-name)| |
|[git-graft](https://github.com/visionmedia/git-extras#git-graft-src-branch-dest-branch)| |
|[git-squash](https://github.com/visionmedia/git-extras#git-squash-src-branch-msg)| |
|[git-changelog](https://github.com/visionmedia/git-extras#git-changelog)                        |✓|
|[git-undo](https://github.com/visionmedia/git-extras#git-undo)| |
|[git-setup](https://github.com/visionmedia/git-extras#git-setup-dir)| |
|[git-touch](https://github.com/visionmedia/git-extras#git-touch-filename)                       |✓|
|[git-obliterate](https://github.com/visionmedia/git-extras#git-obliterate-filename)             |✗|
|[git-local-commits](https://github.com/visionmedia/git-extras#git-local-commits)| |
|[git-archive-file](https://github.com/visionmedia/git-extras#git-archive-file)| |


## See also

* [Git Extras - Introduction](http://vimeo.com/45506445) screencast

* [Git shell Windows tips](http://blog.g14n.info/2014/02/git-shell-windows-tips.html)
* [Git for dummies](http://blog.g14n.info/2014/01/git-for-dummies.html)

  [2]: https://github.com/visionmedia
  [3]: https://github.com/visionmedia/git-extras
  [4]: http://gnuwin32.sourceforge.net/packages/make.htm

