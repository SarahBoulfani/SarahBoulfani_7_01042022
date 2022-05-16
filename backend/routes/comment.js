const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
//Importer le controllers
const commentCtrl = require('../controllers/comment');

//Créer les routes
router.post('/',commentCtrl.createComment); 
router.get('/:postId', auth, commentCtrl.getAllCommentsOfOnePost);
router.get('/', auth, commentCtrl.getAllComments) 
router.delete('/:id', auth, commentCtrl.deleteComment);

//exporter les routes 
module.exports = router;