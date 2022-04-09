//Importer package dotenv pour utiliser les variables d'environnement
require('dotenv').config();
//console.log(process.env); // remove this after you've confirmed it working
const sequelize = require('sequelize');
//Importer path qui donne accés au chemin de notre systeme de fichiers
const path = require('path');
//Importer express
const express = require('express');
//Créer notre application express
const app = express();
//Utiliser express.json 
app.use(express.json());

//middleware used only for parsing request body of content-type x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));
//Importer le router user
const userRoutes = require('./routes/user');

//Import config
const config = require('./config/config.json')
//Import db
const db = require('./models');




//Test api
app.get('/', (req, res) => res.send('Bonjour API !'));


//db
db.sequelize.sync()
.then((console.log("connexion à BDD reussie !")))
.catch(error => console.log(error));
 



//Ajout des headers pour accéder à notre API depuis n'importe quelle origine et avec les méthodes mentionnées. Le middleware ne prend pas d'adresse afin de s'appliquer à toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Enregister le router user
app.use('/api/user', userRoutes);


//Exporter cette constante pour pouvoir y accéder depuis les autres fichiers notamment notre serveur node 
module.exports = app;