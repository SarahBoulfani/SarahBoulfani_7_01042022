//Importer path qui donne accés au chemin de notre systeme de fichiers
const path = require('path');
//Importer helmet
const helmet = require("helmet");
//Importer express
const express = require('express');
//Créer notre application express
const app = express();

//Importer le router user
const userRoutes = require('./routes/user');
//Importer le router post
const postRoutes = require('./routes/post');
//Importer le router comment
const commentRoutes = require('./routes/comment');
//Import db
const db = require('./models');

//Synchronisation de la base de données
db.sequelize.sync()//{force: true}
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

//middleware used only for parsing request body of content-type x-www-form-urlencoded 
app.use(express.urlencoded({ extended: true }));

//Gérer la route vers le dossier images 
app.use('/images', express.static(path.join(__dirname, 'images')));
//Enregister le router user
app.use('/api/user', userRoutes);
//Enregister le router post
app.use('/api/post', postRoutes);
//Enregister le router comment
app.use('/api/comment', commentRoutes);


//Exporter cette constante pour pouvoir y accéder depuis les autres fichiers notamment notre serveur node 
module.exports = app;