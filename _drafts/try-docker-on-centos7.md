


installo Centos7 su macchina virtuale

faccio yum docker install che ora è nei repo extras di default

e seguo il tutorial di docker

The best way to understand Docker is to try it!

https://www.docker.com/tryit/


Welcome to the interactive Docker tutorial
$ docker version
$ docker search tutorial

ok ma sono su centos

yum docker install
service docker start
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


