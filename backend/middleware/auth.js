//Importer le package jsonwebtoken pour verifier le token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); //Utiliser la fonction verify pour décoder notre token
    const userId = decodedToken.userId;//Puis nous extrayons l'ID utilisateur 
    req.auth = { userId: userId };
    if (req.body.userId && req.body.userId !== userId) {// vérifier que le userId de la requête correspond à celui du token
      throw 'User ID non valable';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée!' });
  }
};


