//Importer package dotenv pour utiliser les variables d'environnement
require('dotenv').config();
//console.log(process.env); // remove this after you've confirmed it working

//Importer path qui donne accés au chemin de notre systeme de fichiers
const path = require('path');
//Importer express
const express = require('express');

//Base de données
const db = require('./config/database')

//Créer notre application en utilisant la méthode express ce qui permet de créer une application express
const app = express();

//Utiliser express.json pour prendre toutes les requêtes qui ont comme Content-Type application/json et mettre à disposition leur body directement sur l'objet req
app.use(express.json());


//test api
app.get('/', (req, res) => res.send('Bonjour API !'));




//Tester la connection à la base se données
/*  db.authenticate()
    .then(() => console.log('Connexion à mysql réussie !'))
    .catch(err => console.log('Connexion à mysql échouée !:', error));  */



//Ajout des headers pour accéder à notre API depuis n'importe quelle origine et avec les méthodes mentionnées. Le middleware ne prend pas d'adresse afin de s'appliquer à toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




//Exporter cette constante pour pouvoir y accéder depuis les autres fichiers notamment notre serveur node 
module.exports = app;