//Importer le package bcrypte
const bcrypt = require('bcrypt');
//Importer le package jsonwebtoken
const jwt = require('jsonwebtoken');

//models
const db = require("../models");

//une fonction hash de bcrypt qui va hasher le mot de passe 

  
  exports.signup = (req, res, next) => {
    console.log(req.body);
    bcrypt.hash(req.body.password, 10)

      .then(hash => { //On récupére le hash de mot de passe qu'on va enregistrer dans un nouveau user puis l'enregistrer dans la base de données
        db.User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          isAdmin: false,

        })
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))//201 création de ressource
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));//500 erreur serveur */

  };




// (connecter des utilisateurs existants)
exports.login = (req, res, next) => {
  db.User.findOne({ where: { email: req.body.email } }) //Trouver l'utilisateur pour qui le mail dans la base de données correspond à l'adresse mail envoyé dans le body de la reqete 
    .then(user => {
      if (!user) { //si on récupére pas un user on envoie un msg d"erreur
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) //Si on arrive ici c'est qu'on a bien trouvé un user et donc on va utilisé la fonction compare de bcrypt pour comparer le mot de passe entré par l'utilisateur avec le hash enregistré dans la base de données
        .then(valid => {
          if (!valid) { //si on reçois false c'est que l'utilisateur a rentré le mauvais mot de passe on retourne une erreur
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({// comparaison retourne true et donc identifiant valable
            userId: user.id, //identifiant de l'utilisateur dans la base de données
            token: jwt.sign( //on verifier le token à chaque fois avec la fonction sign qui prend 3 arguments ({les données qu'on veut encoder(payload)},{clé secréte pour l'encodage}, {configurer une expiration de notre token})
              { userId: user.id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};


