---
title: My Zen about the art of Perl
tags:
  - Perl
---

Perl is here to stay

Perl ha moduli sia per Apache che per nginx

un sacco di concorrenti, ma, alla fine mi ci sono pagato il mutuo. Il mio capo arriva, serve sta cosa ... alla fine con Perl in qualche modo l' ho fatta. Si evolve sempre e ti permette di capire meglio anche gli altri linguaggi. E' stabile ed esiste da 25 anni, concetti old school da non dimenticare, CPAN, strumenti come Perl::Tidy e Perl::Critic, community VERAMENTE geek and hacker nostalgia, credere in un mondo libero (foto di larry con mtstout che tirano le pizze al muro e c'è un bambino) sono proprio true.

CPAN testers

ti fanno i test praticamente ovunque, su un sacco di sistemi operativi, vedi una griglia di quelle con le dipendenze (magari metti quella di task..belike..fibo) test report

poi lo testano anche sulle varie versioni
Modules I use

My goal is:

smart install of CPAN modules I need, wherever
No matter if it takes time, I need my Perl habitat.
Spamming the CPAN is not the polite way to do it (stratopan is still under development right now), but by now it works, so I created my Task::BeLike module, here it is

Task::BeLike::FIBO
It is the first stuff I install when I put my fingers on a new Perl installation.

cpan Task::BeLike::FIBO

is the only command I need to type to get the module I need.


use Moose;

MA VAAAA usa Sweet::Base che è un fork di Mojo::Base

articolo su Moose, non perdere tempo in alternative, ho provato Mo, Moo, ecc .. alla fine conviene usare Moose ed eventualmente usare Moo se si vuole ottimizzare un pezzo senza troppo sforzo, ad esempio in Catalyst, metti articolo di Mt stout su shadowcat che spiega tutto ... prima però occorrerebbe ottimizzare, diciamo che è meglio partire con tutta la potenza e la cosa più supportata e diffusa.

cita http://shadow.cat/blog/matt-s-trout/moo-versus-any-moose/

ripesca pure l' articolo Mo Moo Moose

Type constraints

Moose::Util::TypeConstraints e MooseX::Types

## Tidy your code

use Perl::Tidy default

Ma fatti un Foo-pm, sarebbe un Foo-xxx com come Foo-js o Foo-go con default che vanno bene per tutti i linguaggi

poi con http://blog.g14n.info/2013/07/my-vim-configuration.html#perl posso fare <kbd>F2</kbd> per indentare.

# Be a CPAN committer

mio workflow (su Windows usa dmake)

perl Makefile.PL
make
make test
make realclean
make dist

Old school, ever green workflow

dist zilla mi ha rotto le palle dopo il fatto dell utf8

Ho scritto tutto in Task::BeLike::FIBO



