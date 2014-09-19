---
title: LDAP primer
tags:
  - Unix
description: >
   Getting started with LDAP: how to install and configure client and server, create entries, do queries ... is not that easy! This is a step by step guide
---

Sono su centos

installa client e server

Installa server e client 

yum install openldap-servers

Provo ad installare un server LDAP, vedi http://www.centos.org/docs/5/html/Deployment_Guide-en-US/s1-ldap-quickstart.html

[root@localhost ~]# slappasswd
New password:                          (ho messo ICare)
Re-enter new password:
{SSHA}epKf086HBhR1Z2CGMOcxWOPRN08wbuhe

mi da la pass da mettere in slapd.conf
dove devo cambiare anche il dominio
metto quello del mio server
dc=localhost,dc=localdomain

abilito il servizio ldap per partire al boot

chkconfig ldap on
service ldap start

## Add first entry

alla fine devo usare il man: read the man

[root@localhost ~]# cat /tmp/newldapentry
dn: cn=Barbara Jensen,dc=example,dc=com
objectClass: person
cn: Barbara Jensen
cn: Babs Jensen
sn: Jensen
title: the world’s most famous mythical manager
mail: bjensen@example.com
uid: bjensen

[root@localhost ~]# ldapadd -vn -x -f /tmp/newldapentry
add objectClass: person
add cn:
        Barbara Jensen
        Babs Jensen
add sn:
        Jensen
add title:
        NOT ASCII (42 bytes)
add mail:
        bjensen@example.com
add uid:
        bjensen
!adding new entry "cn=Barbara Jensen,dc=example,dc=com"

siccome mi da errore metto title: manager ora

[root@localhost ~]# ldapadd -vn -x -f /tmp/newldapentry
add objectClass:
        person
add cn:
        Barbara Jensen
        Babs Jensen
add sn:
        Jensen
add title:
        manager
add mail:
        bjensen@example.com
add uid:
        bjensen
!adding new entry "cn=Barbara Jensen,dc=example,dc=com"

Ora per lo aggiungo veramente, tolgo il flag n ma mi dice

[root@localhost ~]# ldapadd -v -x -f /tmp/newldapentry
ldap_initialize( <DEFAULT> )
add objectClass:
        person
add cn:
        Barbara Jensen
        Babs Jensen
add sn:
        Jensen
add title:
        manager
add mail:
        bjensen@example.com
add uid:
        bjensen
adding new entry "cn=Barbara Jensen,dc=example,dc=com"
modify complete
ldapadd: Server is unwilling to perform (53)
        additional info: no global superior knowledge


vedi http://serverfault.com/questions/469355/no-global-superior-knowledge-while-adding-a-country


questo sembra funzionare

http://www.openldap.org/doc/admin22/dbtools.html

solo che ho messo la password criptata nello slapd.conf

[root@localhost ~]# cat /var/tmp/entries.ldif
# Organization for Example Corporation
dn: dc=localhost,dc=localdomain
objectClass: dcObject
objectClass: organization
dc: localhost
o: Example Corporation
description: The Example Corporation

# Organizational Role for Directory Manager
dn: cn=Manager,dc=localhost,dc=localdomain
objectClass: organizationalRole
cn: Manager
description: Directory Manager

[root@localhost ~]# ldapadd -f /var/tmp/entries.ldif -x -D "cn=Manager,dc=localhost,dc=localdomain" -W
Enter LDAP Password:
adding new entry "dc=localhost,dc=localdomain"

adding new entry "cn=Manager,dc=localhost,dc=localdomain"



Ora mi fa inserire Barbara, erano sbagliati i dc (erano messi ad example.com)

[root@localhost ~]# cat /tmp/newldapentry
dn: cn=Barbara Jensen,dc=localhost,dc=localdomain
objectClass: person
cn: Barbara Jensen
cn: Babs Jensen
sn: Jensen
title: manager
mail: bjensen@example.com
uid: bjensen

inoltre ho dovuto togliere i campi non permessi tipo uid title e mail, sono da configurare nello slapd.conf

[root@localhost ~]# ldapadd -v -x -f /tmp/newldapentry -D "cn=Manager,dc=localhost,dc=localdomain" -W
ldap_initialize( <DEFAULT> )
Enter LDAP Password:
add objectClass:
person
add cn:
Barbara Jensen
Babs Jensen
add sn:
Jensen
adding new entry "cn=Barbara Jensen,dc=localhost,dc=localdomain"
modify complete


Ancora non va bene, devo fare prima

service ldap stop
cp /etc/openldap/DB_CONFIG.example /var/lib/ldap/DB_CONFIG
slaptest -f /etc/openldap/slapd.conf -F /var/lib/ldap/

vedi http://www.server-world.info/en/note?os=CentOS_6&p=ldap&f=1


Occhio che bisogna editare /etc/openldap/ldap.conf per mettere la base corretta altrimenti ldapsearch dice sempre No Such Object

Vedi com'è definito lo schema /etc/openldap/schema/core.ldif, per questo non potevo mettere title a Barbara perchè è una person


ho fatto

ldapadd -x -D "cn=Manager,dc=localhost,dc=localdomain" -f /etc/openldap/schema/core.ldif -W

e ora la query di base funziona

[root@localhost ~]# ldapsearch -x -LLL "(cn=*)" cn
dn: cn=Manager,dc=localhost,dc=localdomain
cn: Manager

dn: cn=Barbara Jensen,dc=localhost,dc=localdomain
cn: Barbara Jensen
cn: Babs Jensen

E finalmente' per tirare fuori tutto

ldapsearch -x -LLL

la sintassi sarebbe 
ldapsearch -x -LLL (filter) attrs



