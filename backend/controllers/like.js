//Importer models
const db = require("../models");

//Les likes
exports.createLike = (req, res, next) => {
    const likeObject = { ...req.body };
    const like = req.body.like;
    //console.log(likeObject, like)
    //Ajouter un like
    if (like == true) {
        db.Like.create({ ...likeObject })
            .then(() => res.status(200).json({ message: 'Like ajouté!' }))
            .catch(error => res.status(400).json({ error }));
    //Disliker
    } else if (like == false) {
        db.Post.findOne({ where: { id: req.params.postId } })
            .then(() => {
                db.Like.destroy({ where: { postId: req.body.postId, userId: req.body.userId } })
                    .then(() => res.status(200).json({ message: 'Like supprimé !' }))
                    .catch(error => res.status(400).json({ error }));

            }).catch(error => res.status(500).json({ error }));
    }
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



/*  exports.deleteLike = (req, res, next) => {
    //Récupérer le likes de la base de données
    console.log(req.params.userId)
    db.Post.findOne({ where: { id: req.params.postId} })
        .then(() => {
            db.Like.destroy({ where: { postId: req.params.postId}   })
               .then(() => res.status(200).json({ message: 'Like supprimé !' }))
               .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));
}; */
