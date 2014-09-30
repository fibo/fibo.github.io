

From CentOS project [site](http://www.centos.org/)

> The CentOS Project is pleased to [announce](http://lists.centos.org/pipermail/centos-announce/2014-July/020393.html) the immediate availability of CentOS 7 for x86_64, including images for [docker](https://registry.hub.docker.com/_/centos/) , and various cloud providers.

installo Centos7 su macchina virtuale

yum docker install
service docker start
chkconfig docker on
docker pull centos
docker images centos

voglio installare Unica, usando un container centos6 e poter fare varie prove
il vantaggio è che posso avere i vari layer separati

oracle
java
weblogic
optimizer
campaign
cognos

procedo quindi

dunque, parto dalla centos6

[root@molo ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
[root@molo ~]# docker run centos:centos6 cat /etc/centos-release
CentOS release 6.5 (Final)
[root@molo ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

mmh, come faccio a far partire il container con la centos6 ?
Inoltre voglio partire installando Oracle express


Ok, ho la centos6
come faccio a copiare dei file per installare Oracle? Ho gli rpm da eseguire e anche i file da modificare


