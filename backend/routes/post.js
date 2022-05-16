const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
//Importer multer
const multer = require('../middleware/multer');
//Importer les controllers
const postCtrl = require('../controllers/post');
const likeCtrl = require('../controllers/like')

//Créer les routes
router.post('/', auth,multer, postCtrl.createPost); 
router.get('/:id', auth, postCtrl.getOnePost);
router.get('/', auth, postCtrl.getAllPosts)
router.delete('/:id',auth, postCtrl.deletePost); 
//routes pour les likes 
router.post('/:postId/like', likeCtrl.createLike); 
router.delete('/:postId/dislike', likeCtrl.deleteLike);  
router.get('/:postId/likes', likeCtrl.getAllLikesPost);

//exporter les routes 
module.exports = router;