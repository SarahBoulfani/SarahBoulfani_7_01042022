## Groupomania ##
This is the front end and back end server for Project 7 of the Web Developer path.

## Prerequisites ###
You will need to have the last version of Node, `npm` and Vue/cli installed locally on your machine.

## Back end Installation ##
After cloning the project, from the "backend" folder of the project, run `npm install`. You 
can then run the server with `nodemon server`. 
The server should run on `localhost` with default port `3000`. If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:3000 .

## DATA BASE ##
The data base is provided by Mysql.
To access to the data base, go to the "backend" folder then you need to rename the "config_sample" folder to "config". Next, please create your database and in the "config.json" file change in the development object your username, your password, the name of your database, your host and dialect in the following parts:
- "username": "your database username"
- "password": "your database password"
- "database": "database name"
- "host": "root of your server"
- "dialect": "mysql"

## Images ##
You need to create from the "backend" folder a "images" folder.

## Front end Installation ##
From the "frontend" folder of the project, run `npm install`.
You can then run the server with `npm run serve`.
If your browser fails to launch, or shows a 404 error, navigate your browser to http://localhost:8080.







