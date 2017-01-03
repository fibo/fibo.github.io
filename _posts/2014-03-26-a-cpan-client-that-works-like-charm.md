---
title: A CPAN client that works like a charm
tags:
  - Perl
description: >
    How to use and configure properly a CPAN client.
---

## cpan

The [Comprehensive Perl Archive Network][1]  *CPAN* is a collection of freely available [Perl][2] modules.
Perl comes with a builtin CPAN client, named ehm *cpan*.

Be aware that your configuration is stored in the  *~/.cpan/CPAN/MyConfig.pm* file.


Do not edit that file, use `o conf` instead from the *cpan* interactive shell, see below.

### First run

It is really easy to start, just launch

```bash
$ cpan

CPAN.pm requires configuration, but most of it can be done automatically.
If you answer 'no' below, you will enter an interactive dialog for each
configuration option instead.

Would you like to configure as much as possible automatically? [yes]
```

and hit enter (two times) to accept defaults. It will be enough to let you prompt into an interactive shell so you can start install modules.

Give it a try installing  [Perl::Tidy](http://search.cpan.org/~shancock/Perl-Tidy/lib/Perl/Tidy.pod)

```
cpan[1] install Perl::Tidy
```

If it ends with an **OK** you are done, just type *q* to exit interactive shell.

```
...
  SHANCOCK/Perl-Tidy-20130922.tar.gz
  /home/bi/software/make/current/bin/make install   OK

cpan[2] q
Terminal does not support GetHistory.
Lockfile removed.
```

Continue with [Configuration](#configuration) if *cpan* is working  and you want to configure it to achieve greater user experience

or go to [cpanminus](#cpanminus) if you want a zero config, minimal and efficient *CPAN* client

otherwise read [Troubleshooting](#troubleshooting) if you had problems during installation.

### Troubleshooting

<span class="badge danger">ATTENTION</span>

Two things could not work: network *or* permissions.

The quickest workaround is to check your network configuration and launch commands using sudo.

I really recommend to avoid using *cpan* and *perl* provided by your system. See [Install your own Perl with your own CPAN](http://perl-node-interface.blogspot.it/2012/02/install-your-own-perl-with-your-own.html) or [dotsoftware](//{{ site.domain }}/dotsoftware) to know how to install Perl in some location your user owns.

#### local::lib approach

By the way, *cpan* will realize if you have not write permission and will ask what approach do you want: default is [local::lib](http://search.cpan.org/dist/local-lib/lib/local/lib.pm) that is a good idea if you don't want to build your own Perl.

For example, I use it on [Codio](https://codio.com) and works great: just keep hitting *enter* and *cpan* will install *local::lib* for you.

After installation, you need to modify your environment manually. Just launch

```bash
$ cd ~/perl5/lib/perl5
$ perl -Mlocal::lib >> ~/.bash_profile
$ source ~/.bash_profile # or reconnect
```

### Help

Just type **h** in a *cpan* shell

```
cpan> h
```

### Configuration

You can reconfigure **all** *cpan* client options by launching

```
cpan> o conf init

CPAN.pm requires configuration, but most of it can be done automatically.
If you answer 'no' below, you will enter an interactive dialog for each
configuration option instead.

Would you like to configure as much as possible automatically? [yes] no
```

type **no** and follow instructions.

In particular, if you need *cpan* pick mirrors for you, launch

```
cpan> o conf init urllist
```

#### Get CPAN latest version

<span class="badge danger">STRONGLY RECOMMENDED</span>

First of all, make sure you have *CPAN.pm* module updated to latest version

```
cpan> install CPAN
...
cpan> reload CPAN
```

#### Autocommit

<span class="badge info">OPTIONAL</span>

Always commit changes to config variables to disk.

```
cpan> o conf auto_commit 1
```

<div class="alert warning">For the rest of this article I assume <strong>auto_commit is on</strong>.</div>

<div class="alert danger">
Note that <em>auto_commit</em> is disabled by default, so you should launch <strong>o conf commit</strong> to confirm configuration changes.
</div>

#### Command number in prompt

<span class="badge">PERSONAL</span>

Disable the command number in the prompt.

```
cpan> o conf commandnumber_in_prompt 0
```

#### Enable history

<span class="badge warning">RECOMMENDED</span>

You need to install the following modules

```
cpan> install Term::ReadLine::Perl Term::ReadKey
```

#### YAML

<span class="badge warning">RECOMMENDED</span>

Install [YAML](http://search.cpan.org/~ingy/YAML/) Perl module

```
cpan> install YAML
```

and try to install a faster *YAML* implementation

```
cpan> install YAML::XS
```

It will need a C compiler installed on your system. If installation is successful, tell *cpan* which YAML implementation you prefer.

```
cpan> o conf yaml_module YAML::XS
```

#### LWP

<span class="badge warning">RECOMMENDED</span>

Make sure [LWP](http://search.cpan.org/~gaas/libwww-perl/) is installed and up to date

```bash
$ install LWP
```

so *cpan* will use it to fetch files from Internet.

#### CPAN::SQLite

<span class="badge info">OPTIONAL</span>

*CPAN::SQLite* is a layer between the index files that are downloaded
from the *CPAN* and *CPAN.pm* that speeds up metadata queries and reduces memory consumption of *CPAN.pm* considerably.

To use *CPAN::SQLite* launch

```bash
install CPAN::SQLite
```

```
cpan> o conf use_sqlite yes
```

#### Build prerequisites automatically

<span class="badge warning">RECOMMENDED</span>

The *CPAN.pm* module can detect when a module which you are trying to build depends on prerequisites. If this happens, I prefer it builds the prerequisites automatically instead of asking for confirmation.

I prefer to install prerequisites also when it is only needed for building or testing in order to save time on future installations.

```
cpan> o conf prerequisites_policy follow
cpan> o conf build_requires_install_policy yes
```

#### Enable colors

<span class="badge default">PERSONAL</span>

```
cpan> o conf colorize_output yes
cpan> o conf colorize_print bold white on_black
cpan> o conf colorize_warn bold red on_black
cpan> o conf colorize_debug green on_black
```

or choose your favourite colors

```
cpan> o conf init /colorize/
```

#### Character set

<span class="badge default">PERSONAL</span>

In general, *CPAN* is English speaking territory, so the character set does not matter much but some modules have names that are outside the ASCII range. Since my terminal supports *UTF-8*, I set

```
cpan> o conf term_is_latin no
```

### Upgrade modules

Print modules that can be upgraded.

```
cpan> r
```

and

```
cpan> upgrade
```

Both commands accept a `/regexp/` as argument. See [Help](#help).

## Distroprefs

[Distroprefs][3] is a great feature that let you customize module building.

## cpanminus

[App::cpanminus](http://search.cpan.org/~miyagawa/App-cpanminus/lib/App/cpanminus.pm) is a gift from Perl community angel [Tatsuhiko Miyagawa](http://search.cpan.org/~miyagawa/).

> It's dependency free (can bootstrap itself), requires zero configuration, and stands alone. When running, it requires only 10MB of RAM.

I assuming you already have a working *cpan* client, so to install *cpanminus* just launch

```
$ cpan App::cpanminus
```

and use `cpanm` instead of `cpan` from now on. It is **light, fast and minimal** CPAN client, but, it has many features too: see [cpanm](http://search.cpan.org/~miyagawa/App-cpanminus/bin/cpanm) or `cpanm -h` to see what *cpanminus* can do.

Remember that you should probably pick a mirror and set mirror-only to get consistent results. `PERL_CPANM_OPT` is your friend for such things.

You can use [App::cpanoutdated](http://search.cpan.org/dist/App-cpanoutdated/bin/cpan-outdated) to detect outdated CPAN modules in your environment.

Install it

```bash
$ cpanm App::cpanoutdated
```

then update all modules with

```bash
$ cpan-outdated | cpanm
```

Note that also *cpan* has the [upgrade modules feature](#upgrade-modules) but *cpan-outdated* is faster, uses less memory and is integrated with *cpanm*.

## See also

* [Learn Perl - CPAN and Perl Configuration Howto](http://learnperl.scratchcomputing.com/tutorials/configuration/)
* Matt Trout's [Library deployment](http://shadow.cat/blog/matt-s-trout/mstpan-9/) article.

  [1]: http://www.cpan.org/ "CPAN"
  [2]: http://www.perl.org/ "Perl"
  [3]: https://metacpan.org/pod/CPAN#Configuration-for-individual-distributions-Distroprefs "Distroprefs"

