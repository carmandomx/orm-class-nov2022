# orm-class-nov2022

## DB Commands

Open SQL Shell
```
$ CREATE USER #Username WITH PASSWORD '#password'
$ \du
$ CREATE DATABASE #DBname WITH OWNER "#Username"
$ \c #DBname "#Username"
$ >Contraseña para usuario #Username: ******
```
Save your credentials to add and .env in your project

```
PORT=3000
DB_NAME=#DBname  
DB_PASS=#password 
DB_HOSTNAME=localhost
DB_USER=#Username
DB_CONNSTR=uri
```
