//Importer express
const express = require('express');
//Créer le router avec la méthode router d'express
const router = express.Router();
const auth = require('../middleware/auth');
//Importer multer
const multer = require('../middleware/multer-config');

//Importer le controllers
const postCtrl = require('../controllers/post');
//Créer les routes
router.post('/', auth,multer, postCtrl.createPost); //TODO ajout auth
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts)
/*router.put('/:id', auth, multer, postCtrl.modifyPost); 
router.delete('/:id',auth, postCtrl.deletePost);  */
//exporter les routes 
module.exports = router;