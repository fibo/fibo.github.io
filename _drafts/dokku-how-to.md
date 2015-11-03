---
title: Dokku how to
tags:
  - Docker
  - PaaS
description: >
    Step by step dokku guide
---

What you get: dokku is a light Heroku like

From

http://progrium.viewdocs.io/dokku/installation/

install a fresh Ubuntu 14, with no docker installed

```
$ su -
# cd /tmp
# wget https://raw.githubusercontent.com/progrium/dokku/v0.4.3/bootstrap.sh
# DOKKU_TAG=v0.4.3 bash bootstrap.sh
```

Then open a browser pointing to the hostname or IP where you installed dokku.


Fai screenshot della pagina, e che opzioni ho messo

cosa devo mettere nel campo Admin public key? Ho messo 123
Prova a mettere la tua chiave pubblica da dove intendi pushare
poi se ne possono aggiungere altre

bisogna aggiungere l'utente ai sudoers per poter lanciare dokku


