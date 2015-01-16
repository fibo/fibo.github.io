
prendi dall articolo su blogspot

aggiungi i trick di migotto

c/pippo/pluto

r

2
va alla riga 2




SELECT * FROM NLS_DATABASE_PARAMETERS;

formatting

SQL> set lines 200
SQL> col name for a50
SQL> col value for a50
SQL> col display_value for a50
SQL> r
  1  select name,value,display_value from v$parameter where upper(name) like '%NLS%'


