---
title: The camel replicates!
tags:
  - Perl
description: >
    Install and use CPAN packages on an host without Internet access. On conquering hosts with a camel.
---


It is a common pattern: customers let me develop on hosts that cannot access Internet directly. Open connectivities takes always a lot of time and simetimes it is again policies.

In this article *host.customer.com* is that kind of host, and of course it is needed a *myhost.example.org* that can connect to Internet.

I assume both hosts has same OS and Perl version for simplicity.

Start on *myhost.example.org* and configure [A CPAN client that works like a charm]({{ post_url 2014-03-26-a-cpan-client-that-works-like-charm }}). You need a working *cpan* client that had at least a [first run](http://g14n.info/2014/03/a-cpan-client-that-works-like-charm/#first-run), other steps are optional.

The trick is to realize that *~/.cpan/sources* is a mini CPAN mirror with all dependencies needed.

So install everything you need with *cpan*, then launch

```bash
$ tar czf /tmp/cpanSources.tar.gz /home/skyde/.cpan/sources
```

Now, transfer *cpanSources.tar.gz* to *host.customer.com* somehow. I usually need to connect opening some VPN, so I do not assume there is a connection between the hosts.

On *host.customer.com* make sure you have a working *cpan* client too, then

mkdir -p /home/unica/.cpan/sources



tutto ok ma me li scompatta in

home/skyde/.cpan/sources/authors/id/B/BI/BINGOS/CHECKSUMS

TODO raffina il comando tar, fai
cd /home/unica/.cpan/sources/
e poi
$ tar czf /tmp/cpanSources.tar.gz authors/ modules/

[unica@s-ng-cmunica-dev sources]$ cp -r authors/ /home/unica/.cpan/sources/
[unica@s-ng-cmunica-dev sources]$ cp -r modules/ /home/unica/.cpan/sources/



Cita anche Pinto, ma, questa soluzione è più minimal e funziona bene.

-----------------------------------------------------------------


Stessa storia, dal cliente non posso installare moduli Perl usando internet

Parti da http://blog.g14n.info/2014/06/the-camel-survives.html

poi ho fatto

cpanm CPAN

ho installato tutto quello che mi serviva con cpan, partendo da una `$HOME/.cpan` pulita
la $HOME/.cpan contiene tutti i pacchetti e posso fare

```
cpanm -l $PERL_BASE Foo --mirror $HOME/cpan/sources --mirror-only
```



cpan CPAN
cpan CPAN::Mirror::Server::HTTP
cpan App::cpanminus

mi serve anche la local::lib ma la dovrei forzare

il trick è che .cpan/sources è un mirror CPAN contenente tutte le dipendenze che mi servono

posso fare cpanmirrorhttpd $HOME/.cpan/sources
andare su un altro host, fare wget del tar di cpanm, installarlo seguendo lo stesso procedimento e avere così un altro host conquistato

in realtà il trick sarebbe usare cpan per creare il mirror con le deps
e cpanm per installare


la storia sarebbe fare quindi

cpanm CPAN
cpan App::cpanminus
e farli puntare a due locallib diverse. cpan serve per riempire il mirror, cpanm serve per installare il moduli da testare

mi servirà anche Module::CoreList

ho sviluppato su 5.10, se vado su 5.8 poi mi dice che manca ExtUtils::ParseXS che infatti sarà diventato core nel passaggio da 5.8 a 5.10
quindi devo mettere in cpandeps/ anche tutti i core modules?

