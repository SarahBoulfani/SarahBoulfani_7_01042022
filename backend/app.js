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

//Importer le router user
const userRoutes = require('./routes/user');
//Importer le router user
const postRoutes = require('./routes/post');
//Importer le router user
const commentRoutes = require('./routes/comment');

//Import config
const config = require('./config/config.json')
//Import db
const db = require('./models');




//Synchronisation de la db
db.sequelize.sync()//{force: true}
.then((console.log("connexion à BDD reussie !")))
.catch(error => console.log(error));
 

var cors = require('cors');

app.use(cors());

//Ajout des headers pour accéder à notre API depuis n'importe quelle origine et avec les méthodes mentionnées. Le middleware ne prend pas d'adresse afin de s'appliquer à toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utiliser express.json 
app.use(express.json());

//middleware used only for parsing request body of content-type x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));

//Gérer la route vers le dossier images et traiter les requêtes vers la route /image. express.static gère de manière statique la ressource images à chaque requête vers la route images.
app.use('/images', express.static(path.join(__dirname, 'images')));
//Enregister le router user
app.use('/api/user', userRoutes);
//Enregister le router user
app.use('/api/post', postRoutes);
//Enregister le router user
app.use('/api/comment', commentRoutes);


//Exporter cette constante pour pouvoir y accéder depuis les autres fichiers notamment notre serveur node 
module.exports = app;