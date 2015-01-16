
NOTA: Potrebbe chiamarsi secure your linux server, oppure do not login as root

ho fatto una macchina su softlayer

dopo poco ho visto che hanno provato ad entrare 2000 volte come root

```
Using username "root".
Last failed login: Fri Jan 16 07:09:14 CST 2015 from 183.136.216.4 on ssh:notty
There were 20011 failed login attempts since the last successful login.
Last login: Tue Jan 13 09:56:30 2015 from host16-249-static.143-193-b.business.telecomitalia.it
```

è incredibile, ogni volta che mi loggo vedo un elevato numero e un host diverso

Last failed login: Fri Jan 16 09:38:50 CST 2015 from ds6722.dedicated.turbodns.co.uk on ssh:notty

Ok, I know, this is normal: there is a lot of people and processes out there trying to enter as root or other common user.


I found a lot of

grep failed /var/log/secure |more

http://serverfault.com/questions/260706/possible-break-in-attempt-in-var-log-secure-what-does-this-mean

I did an OS reload on SoftLayer and as soon as I got access I disabled root login


prima cosa
creo utente

poi in /etc/ssh/sshd_config

PermitRootLogin no
MaxAuthTries 2

So root user cannot login and any other user is disconnected if password is wrong

sudo systemctl restart sshd


Già con questo non vedo più gli attempt login failed

ancora di più

molti cambiano la porta 22 di default, ma, la sostanza non cambia: io devo ricordarmi che la porta è cambiata e chiunque può fare uno scan con npam e trovare quella giusta.


usa le chiavi, vedi come fare per generarle su Windows
testa le chiavi
disabilita autenticazione tramite password

ancora di più

port knocking (più complicato), come ha detto Gianca, la porta è chiusa, ma, se bussi in un certo modo si apre.


-------


Ho chiesto

When I login as root I see a message like



Using username "root".
Last failed login: Fri Jan 16 07:09:14 CST 2015 from 183.136.216.4 on ssh:notty
There were 20011 failed login attempts since the last successful login.
Last login: Tue Jan 13 09:56:30 2015 from host16-249-static.143-193-b.business.telecomitalia.it



Can you check why there are so many failed login attempts?



Thank you in advance,

Gianluca.

-----------------


e mi hanno risposto

Hello Gianluca,



Yes, we do offer our Cisco Guard and TMS for large attacks. These are typically triggered when a large scale attack is occurring. Please note that this is no way a replacement for having security measures implemented on your server. This being said, it appears that that IP address was doing a dictionary attack against ssh looking to gain access if a weak password is being used. To help protect against this type of attack, you may contemplate moving ssh to a different port other than using the default port of 22. To change your ssh port, you will do the following:



1) ssh to the server

2) edit the sshd_config file - /etc/ssh/sshd_config

3) look for where it says port. remove the # and update the port number for something other than port 22. you will want to make sure that the port is not being used for any other process.

4) save your changes and then restart ssh.



I would also recommend, if you are not already, setting up and configuring a firewall on your server to help secure it. For more information please refer to the following:



https://www.digitalocean.com/community/tutorials/additional-recommended-steps-for-new-centos-7-servers



https://access.redhat.com/documentation/en-US/Red_Hat_Enterprise_Linux/7/html/Security_Guide/sec-Using_Firewalls.html



Another thing you may want to do is contact the provider of that IP address and inform them that someone is trying to gain access to your server as well as provide logs. I have found the following information about the IP address of 183.136.216.4:



lniquette@planetshell ~ $ whois 183.136.216.4


https://www.reddit.com/r/linuxquestions/comments/2filzd/there_were_1576_failed_login_attempts_since_the/

https://www.linode.com/docs/security/securing-your-server

