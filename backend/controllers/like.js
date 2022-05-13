//Importer models
const db = require("../models");
const jwt = require("jsonwebtoken");

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
/*  const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
    const userId = decodedToken.userId; */
    //Récupérer le likes de la base de données
    db.Post.findOne({ where: { id: req.params.postId} })
        .then(() => {
            db.Like.destroy({ where: { postId: req.params.postId, /* userId:userId */}})
            /*  .then(like => {
                console.log(like-1);
                res.status(200).json(like-1);
             }) */
               .then(() => res.status(200).json({ message: 'Like supprimé !' }))
               .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));//erreur serveur
};
