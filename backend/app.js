//Importer express
const express = require('express');
//Créer notre application express
const app = express();
//Importer path qui donne accés au chemin de notre systeme de fichiers
const path = require('path');
//Importer helmet
const helmet = require("helmet");

//Importer les routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//Import models pour vérifier la connexion à la db
const db = require('./models');

//Synchronisation de la base de données
db.sequelize.sync()
    .then((console.log("connexion à BDD reussie !")))
    .catch(error => console.log(error));

//Utilisation de 'helmet' sur l'application 'express' 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//Ajout des headers pour accéder à notre API depuis n'importe quelle origine et avec les méthodes mentionnées
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utiliser express.json 
app.use(express.json());

//Middleware qui va parser le contenu de type x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));

//Enregistrer les routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

module.exports = app;