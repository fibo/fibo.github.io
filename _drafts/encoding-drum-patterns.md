---
title: Article template
description: >
    Turn a drum pattern into a number
tags:
  - Math
  - Music
---

spazio dei ritmi a 16 beat ahahah 1 beat = 1 bit, ma solo se ho un solo suono

Se ho un solo suono, ho due informazioni: suono e pausa, quindi codifico in base 2.

Per i drum pattern non devo considerare la durata, come per la musica con le note: in quel caso mi servirebbe una informazioni in più.

lo spazio dei ritmi ha cardinalità = (numero beat ) ^ (numero suoni + 1)

se ho due suoni, alto e basso, codifico quindi in base 3

b = basso = 1
a = alto = 2
p = pausa = 0

`b a b p` è il ritmo della capoiera, diventa quindi
 1 2 1 0 
 1 + 2 * 3 + 1 * 3*3 + 0 * 3*3*3 = 16

0 0 0 0 = 0 è il silenzio
b 0 0 0 = 1
b 0 b 0 = 1 + 9
a a a a = 2 + 6 + 18 + 54 = 80

potrei fare che invece del numero ci metto la frequenza in hertz

Con un solo suono

x o o x o o x o o x o x o o x o
1 + 8 + 64 + 512 + 2048 + 16384 = 19017

