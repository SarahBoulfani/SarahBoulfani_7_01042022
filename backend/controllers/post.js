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
  db.Post.create({ ...postObject })
    .then(() => res.status(200).json({ message: 'Post crée!' }))
    .catch(error => res.status(400).json({ error }));

};

//Récupérer un post
exports.getOnePost = (req, res, next) => {
  db.Post.findOne({ where: { id: req.params.id } })
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
    .then((post) => res.status(200).json({ post }))
    .catch((error) => res.status(400).json({ error }));
};

//Suppression d'un post
exports.deletePost = (req, res, next) => {
  //Récupérer le post de la base de données
  db.Post.findOne({ where: { id: req.params.id } })
    .then(post => {
      //Extraire le nom de fichier à supprimer
      const filename = post.imageUrl.split('/images/')[1];
      //Avec le nom de fichier et grace à la fonction unlink du package fs on supprimer le fichier
      fs.unlink(`images/${filename}`, () => {
        //Une fois la suppresion du fichier est effectué on supprime l'objet dans la base de données
        db.Post.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ message: 'Post supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));//erreur serveur
};

