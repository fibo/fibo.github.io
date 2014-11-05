---
title: The camel survives!
tags:
  - Perl
description: > 
    About installing Perl in hostile environments.
---

## Motivation

Right now I'm working on a Centos 6 Linux box. I have no *cpan* client

```
$ cpan
-bash: cpan: command not found
```

and a deprecated version of Perl :(

```
$ perl -v

This is perl, v5.10.1 ...
```

What is worse is that I will deploy on a host with no Internet access, probably with no root permissions ... but there is a hope

> The camel survives!

## Bootstrap

### Requirements

You need to install [ExtUtils::MakeMaker][1].

If you get errors like 

```
Can't locate ExtUtils/MakeMaker.pm in @INC
```

probabily is not installed. That is a silly choice of some Linux distros, yes I said **silly** cause [ExtUtils::MakeMaker][1] is a core module and it should be provided with any Perl distribution. 

Get root permissions and install it, on Centos just launch

```bash
$ yum install perl-ExtUtils-MakeMaker
```

If you can't do it, go straight and compile your own Perl: see [.software](http://g14n.info/.software). <!--- link ad articolo compila Perl oppure .software -->

### Choose your target

Create a folder that will be your Perl home. To make it easier, I choose [local::lib][2] default

```bash
$ export PERL_BASE=~/perl5
```

### Get cpanm

As documented in [App::cpanminus related section]( https://metacpan.org/pod/App::cpanminus#Downloading-the-standalone-executable), get a standalone *cpanm* executable to bootstrap your Perl. 

```bash
$ mkdir -p $PERL_BASE/bin
$ cd $PERL_BASE/bin
$ curl -LO http://xrl.us/cpanm
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  262k  100  262k    0     0   279k      0 --:--:-- --:--:-- --:--:--  279k
$ chmod +x cpanm
```

### Install local::lib

Now you can install [local::lib][2] locally

```bash
$ ./cpanm -l $PERL_BASE local::lib
```

Load special environment variables. Note that *~/.perl_profile* file will be overwritten.

```bash
$ cd $PERL_BASE/lib/perl5
$ perl -Mlocal::lib=$PERL_BASE > ~/.perl_profile
$ source ~/.perl_profile
```

Make it permanent, edit your profile. For example you can launch

```bash
$ grep 'source ~/.perl_profile' ~/.bash_profile || echo 'source ~/.perl_profile' >> ~/.bash_profile
```

which will add `source ~/.perl_profile` to your *.bash_profile* only once.

### Try it

At this point you have your system Perl with a *cpanm* that can install locally

Give it a try it, install [Perl::Tidy][5]


```
$ cpanm Perl::Tidy
   Working on Perl::Tidy
Fetching http://www.cpan.org/authors/id/S/SH/SHANCOCK/Perl-Tidy-20140328.tar.gz ... OK
Configuring Perl-Tidy-20140328 ... OK
Building and testing Perl-Tidy-20140328 ... OK
Successfully installed Perl-Tidy-20140328
1 distribution installed
$ which perltidy
~/perl5/bin/perltidy
```

### Get CPAN

Now you can choose, to keep *cpanm* or get the official CPAN client

```bash
$ cpanm CPAN
```

Then maybe you want [A CPAN client that works like a charm](http://g14n.info/2014/03/a-cpan-client-that-works-like-charm).

# Upgrade Perl

Use [Perlbrew][6] to install, upgrade and manage your Perl installation.

```bash
$ export PERLBREW_ROOT=$PERL_BASE/perlbrew
$ echo export PERLBREW_ROOT=$PERLBREW_ROOT >> ~/.perl_profile
```

Install it

```
$ cpanm App::perlbrew
```

Then initialize it and add it to your environment with

```bash
$ perlbrew init

perlbrew root (~/perl5/perlbrew) is initialized.

Append the following piece of code to the end of your ~/.bash_profile and start a
new shell, perlbrew should be up and fully functional from there:

    source ~/perl5/perlbrew/etc/bashrc

Simply run `perlbrew` for usage details.

Happy brewing!

$ source ~/perl5/perlbrew/etc/bashrc
$ echo 'source ~/perl5/perlbrew/etc/bashrc' >> ~/.perl_profile
```

Install *patchperl* (only once)

```bash
$ perlbrew install-patchperl
```

Now you can install and upgrade Perl easily, for example

```bash
$ perlbrew install perl-5.16.0
$ perlbrew switch perl-5.16.0
```

## See also

* [A CPAN client that works like a charm](http://g14n.info/2014/03/a-cpan-client-that-works-like-charm)

  [1]: http://search.cpan.org/~bingos/ExtUtils-MakeMaker/lib/ExtUtils/MakeMaker.pm "ExtUtils::MakeMaker"
  [2]: http://search.cpan.org/~haarg/local-lib/lib/local/lib.pm "local::lib"
  [5]: https://metacpan.org/pod/distribution/Perl-Tidy/lib/Perl/Tidy.pod
  [6]: http://perlbrew.pl/

