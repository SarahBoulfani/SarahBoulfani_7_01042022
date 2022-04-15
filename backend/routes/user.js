//Importer express
const express = require('express');
//Créer le router avec la méthode router d'express
const router = express.Router();
const auth = require('../middleware/auth');
//Importer multer
const multer = require('../middleware/multer-config');

//Importer le controllers
const userCtrl = require('../controllers/user');
//Créer les routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', auth, multer, userCtrl.modifyUser); //TO DO ajout auth
router.delete('/:id',auth, multer, userCtrl.deleteUser); //TO DO ajout auth
//exporter les routes 
module.exports = router;