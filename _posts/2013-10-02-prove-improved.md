---
title: prove imProveD
tags:
  - Perl
  - Unix
description: >
    Instructions to get a Perl test suite that checks everything is ok in your home dir.
---

## Overview

Instead of using a bare `prove` command to launch your Perl tests, I think it is really useful using

```bash
prove --state=save
```

that will run your tests, remembering which ones are failing, and

```bash
prove --state=failed,save
```

that will run only those that failed.

You can use this feature when you are writing a Perl module, but, I found another interesting use case.

> When I login, I want to know that everything is ok!

Yes, you should check everything you need to be up and running: database connections, ssh key exchanges, software dependencies, scripts compilation, anything you want to rely on.

Don't worry, at login only failed tests will run so you don't have to wait till all your test suite will finish.

## How to setup

### Requirements

#### App::Prove

You need a Unix account and Perl, of course.

Make sure you have [App::Prove][1] installed, just type this in your prompt

```bash
cpan App::Prove
```

#### Folder structure

I assume that you have the following folders in your home dir

bin/
: contains all your scripts.

log/
: contains .log files, I also use to put here .err files that contains my scripts STDERR redirection.

t/
: contains your .t files, tests that will run every hour and at login time.

### Configuration

#### In your home dir

Create a .proverc file with the following content.

```
## see prove -H for full options list

## Run N test jobs in parallel.
-j4
## Print elapsed time after each test.
--timer
## Trap Ctrl-C and print summary on interrupt.
--trap
```

Add this line at the end of your *.bash_profile*

```
prove --state=failed,save
```

#### In your crontab

Add this line to your crontab

```
00 * * * * prove --state=save 1> /dev/null 2> log/tests.err
```

## Create some tests

Now it's time to fill your *t/* folder with tests, you can start with a simple one: *t/01_compile_scripts.t*. It checks that every Perl script in the *bin/* folder compiles. It has the following content.

```perl
use strict;
use warnings;
use Test::More;
use Test::Compile;

all_pl_files_ok();
```

Of course you should install that required module.

```bash
cpan Test::Compile
```

And, yes you should add also another test: *t/00_deps.t*.

```perl
use strict;
use warnings;
use Test::More;

use_ok($_)
  or BAIL_OUT(" missing dependency $_")
  for qw(
  Test::Compile
);

done_testing;
```

Here we go ... we started writing tests for every feature we add.

<div class="paper danger">Please <strong>don't get addicted</strong> :)</div>

## Conclusion

Every test you will add in your *~/t* folder will run every hour. [App::Prove][1] remembers failed tests, using *~/.prove* file, and after login you will run only failed tests, so you will know which problems are going on.

  [1]: http://search.cpan.org/~ovid/Test-Harness/lib/App/Prove.pm
