//Importer models
const db = require("../models");

//Crée un commentaire
exports.createComment = (req, res, next) => {
    const commentObject = { ...req.body };
    db.Comment.create({ ...commentObject })
        .then(() => res.status(200).json({ message: 'Commentaire crée!' }))
        .catch(error => res.status(400).json({ error }));

};

//Récupérer tous les commentaires d'un post
exports.getAllCommentsOfOnePost = (req, res, next) => {
    db.Comment.findAll({
        where: { postId: req.params.postId }, order: [
            ['createdAt', 'ASC']
        ],
        include: [
            { model: db.User }
        ]
    })
        .then(comment => res.status(200).json(comment))
        .catch(error => res.status(404).json({ error }));
};

//récupérer tt les commentaires
exports.getAllComments = (req, res, next) => {
    db.Comment.findAll({
        order: [
            ['createdAt', 'ASC']
        ],
        include: [
            { model: db.User }
        ]
    })
        .then((comment) => res.status(200).json({ comment }))
        .catch((error) => res.status(400).json({ error }));
};

//Supprimer un commentaire
//Suppression d'un post
exports.deleteComment = (req, res, next) => {
    //Récupérer le commentaire de la base de données
    db.Comment.findOne({ where: { id: req.params.id } })
        .then(() => { 
            db.Comment.destroy({ where: { id: req.params.id } })
                .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));//erreur serveur
};
