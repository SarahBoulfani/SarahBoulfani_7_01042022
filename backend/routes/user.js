//Importer express
const express = require('express');
//Créer le router avec la méthode router d'express
const router = express.Router();
//Importer le middleware password

//Importer le controllers
const userCtrl = require('../controllers/user');
//Créer les routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
//exporter les routes 
module.exports = router;