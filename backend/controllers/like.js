//Importer models
const db = require("../models");

//Ajouter un like
exports.createLike = (req, res, next) => {
    const likeObject = { ...req.body };
    db.Like.create({ ...likeObject })
        .then(() => res.status(200).json({ message: 'Like ajouté!' }))
        .catch(error => res.status(400).json({ error }));

};

//Récupérer tous les likes d'un post
exports.getAllLikesPost = (req, res, next) => {
    db.Like.findAll({
        where: { postId: req.params.postId },
        include: [
            { model: db.User }
        ]
    })
        .then(like => res.status(200).json(like))
        .catch(error => res.status(404).json({ error }));
};


//Supprimer un like
 exports.deleteLike = (req, res, next) => {
    //Récupérer le likes de la base de données
    console.log(req.params.userId)
    db.Post.findOne({ where: { id: req.params.postId} })
        .then(() => {
            db.Like.destroy({ where: { postId: req.params.postId}   })
               .then(() => res.status(200).json({ message: 'Like supprimé !' }))
               .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
};  
