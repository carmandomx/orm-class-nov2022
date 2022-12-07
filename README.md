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
DB.

```
\c testdb test2
```

Save your credentials to later add them to an .env in your project.

```
PORT=3000
DB_NAME=#DBname  
DB_PASS=#password 
DB_HOSTNAME=localhost
DB_USER=#Username
DB_CONNSTR=uri
```

Test:
![image](https://user-images.githubusercontent.com/113385187/205352095-3a7cf421-b72c-4efb-b7b5-09d9f0a30133.png)
