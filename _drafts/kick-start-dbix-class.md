---
title: Kick start DBIx::Class
tags:
  - Perl
description: >
    Boost your Perl package with DBIx::Class ORM
---


ORM https://en.wikipedia.org/wiki/Object-relational_mapping

sto facendo un package per Unica, devo collegarmi al DB, ho convinto il mio capo

farò le query con [DBIx::Class][1], devo mappare lo schema e usarlo successivamente

# Prerequisites

Perl e CPAN, link ad articoli su Perl e CPAN

almeno per poter fare

```bash
$ cpan DBI
$ cpan DBIx::Class
```

eventuali moduli per collegarsi al database in question, nel mio caso Oracle ... if you need Oracle too, it is worth you read also [How to install DBD::Oracle][2].

```bash
$ cpan DBIx::Class::Schema::Loader
```

See

```bash
$ perldoc DBIx::Class::Schema::Loader
```

in particular, note that

> DBIx::Class::Schema::Loader currently supports only the DBI storage type. It has explicit support for DBD::Pg, DBD::mysql, DBD::DB2, DBD::Firebird, DBD::InterBase, DBD::Informix, DBD::SQLAnywhere, DBD::SQLite, DBD::Sybase (for Sybase ASE and MSSSQL), DBD::ODBC (for MSSQL, MSAccess, Firebird and SQL Anywhere) DBD::ADO (for MSSQL and MSAccess) and DBD::Oracle. 

Just in case, I used it to reverse engineering an Oracle database, and I got some warnings I solved installing

```bash
$ cpan Math::Base36
$ cpan Math::BigInt
```

# Dump schema

Sono nella cartella dove sto sviluppando il mio pacchetto Sisal-pm, voglio fare il reverse engineering dello schema Oracle Campaign, sotto il namespace omonimo

Lancio una volta

```bash
dbicdump -o dump_directory=./lib Unica::Campaign::Schema dbi:Oracle:XE user pass
```

e mi crea tutte le classi sotto result

Posso anche farlo a runtime, come avevo fatto per ComScore, ma, non è consigliato .. comunque riportalo

vedi

http://www.slideshare.net/ranguard/dbixclass-beginners-presentation

per fare la sysdate vedi DateTime::Format::Oracle


  [1]: http://www.dbix-class.org/ "DBIx::Class"
  [2]: {% 2013-07-02-how-to-install-dbdoracle %} "How to install DBD::Oracle"

