---
title: The camel replicates!
tags:
  - Perl
description: >
    Install and use CPAN packages on an host without Internet access. On conquering hosts with a camel.
---

## Introduction

It is a common pattern: customers let me develop on hosts that **cannot access Internet** directly. Opening connectivities takes always **a lot of time** and sometimes it is against policies, but there is a hope...

> The camel replicates!

In this article *host.customer.com* is that kind of host, and of course it is needed a *myhost.example.org* that can connect to Internet or at least to a CPAN mirror.

<div class="alert info">If you want a full featured tool, consider using <a href="https://metacpan.org/pod/Pinto">Pinto</a> or <a href="https://metacpan.org/pod/Carton">Carton</a>: this article describes just a very simple trick I found to deal with this network limitation.</div>

## Requirements

<div class="alert warning">I assume both hosts has same OS and Perl version for simplicity. In particular, different versions of Perl can lead to issues when resolving dependencies on core modules.</div>

Start on *myhost.example.org*: you need a working *cpan* client that had at least a [first run]({% post_url 2014-03-26-a-cpan-client-that-works-like-charm %}#first-run).
It is nice to have [A CPAN client that works like a charm][1].

## Implementation

<div class="alert info">The trick is to realize that <em>~/.cpan/sources</em> is a mini CPAN mirror with all dependencies needed.</div>

So install everything you need with your *cpan* client on *myhost.example.org*. I usually have a *Makefile.PL* that includes all dependencies information, it is a good idea.

If everything looks ok, I mean **stable**, then launch

```bash
$ cd ~/.cpan/sources
$ tar czf /tmp/cpanSources.tar.gz modules/ authors/
```

Now, transfer *cpanSources.tar.gz* to *host.customer.com* somehow. I usually need to connect opening some VPN, so I do not assume there is a connection between the hosts.

On *host.customer.com* make sure you have a working *cpan* client too, then

```bash
$ mkdir -p /home/unica/.cpan/sources
$ cd ~/.cpan/sources
$ tar xzf /path/to/cpanSources.tar.gz
```

and you are done! Your *cpan* client on *host.customer.com* will not fetch sources from CPAN mirrors. In fact, by default, *cpan* uses the *~/.cpan/sources* for caching the sources tarballs, and if the distro is already there it will not try to download it. Hence you can install all dependencies needed by your package even in those hosts that are isolated from Internet, those hosts where probably you work to pay your rent :)

<!-- TODO add CPAN mirror http if hosts can connect -->

  [1]: {% post_url 2014-03-26-a-cpan-client-that-works-like-charm %} "A CPAN client that works like a charm"
  [2]: {% post_url 2014-06-18-the-camel-survives %} "The camel survives!"

