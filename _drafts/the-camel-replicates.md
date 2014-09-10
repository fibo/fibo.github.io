---
title: The camel replicates!
tags:
  - Perl
---

On conquering hosts

<!--more-->

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

