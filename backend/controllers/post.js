//Imports
const fs = require('fs');
//models
const db = require("../models");

//Ajouter un post
exports.createPost = (req, res, next) => {
   //Opérateur terniaire pour vérifier s'il existe un fichier image ou non
  const postObject = req.file ?
  {//si il y a un fichier on récupère le fichier
    ...req.body,
    //on modifie l'image sinon on prend simplement les information req.body
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body }; //req.body si le fichier n'existe pas 
db.Post.create({ ...postObject})
  .then(() => res.status(200).json({ message: 'Post crée!' }))
  .catch(error => res.status(400).json({ error }));
      
};

//Récupérer un post
exports.getOnePost = (req, res, next) => {
  db.Post.findOne({ where: {id: req.params.id} })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({ error }));
};

//récupérer tous les posts
exports.getAllPosts = (req, res, next) => {
  db.Post.findAll({
     order: [
         ['createdAt', 'DESC']
     ],
     include: [
       { model: db.User }
     ]  
  })
   .then((post) => res.status(200).json({ post}))
   .catch((error) => res.status(400).json({ error }));
}; 

