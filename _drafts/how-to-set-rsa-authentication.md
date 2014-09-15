---
title: How to set SSH RSA authentication
tags:
  -
fileID: 0B1Q-qpUyEAecVEhtazFrNm54RVk
---

```
ssh-keygen -t rsa -C "casati_gianluca@yahoo.it"
```

tutti creano manualmente authorized?keys, ma c'è un modo più semplice e sicuro
 
```bash
ssh-copy-id unica@server01.icare.it
unica@server01.icare.it's password:
Now try logging into the machine, with "ssh 'unica@server01.icare.it'", and check in:

  .ssh/authorized_keys

to make sure we haven't added extra keys that you weren't expecting.
```


# See also

http://blog.urfix.com/25-ssh-commands-tricks/
http://blog.tjll.net/ssh-kung-fu/


