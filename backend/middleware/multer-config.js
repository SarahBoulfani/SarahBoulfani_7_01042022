//Importer multer
const multer = require('multer');
//Dictionnaire d'extentions MIME_TYPES 
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp'
};
//Utiliser la fonction diskStorage de multer qui a besoin de 2 éléments distination et filename 
const storage = multer.diskStorage({
  //distination: une fonction qui va expliquer à multer dans quel dossier enregister les fichiers 
  destination: (req, file, callback) => {
    callback(null, 'images'); 
  },
  //filename: pour dire à multer quel nom de fichier utilisé
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');//Genérer le nouveau nom
    const fileName = name.split('.');
    const extension = MIME_TYPES[file.mimetype]; //Utiliser les mime-types pour générer l'extention des images
    callback(null, fileName[0] + Date.now() + '.' + extension);//Appeler le callback pour crée le nom au complet 
  }
});

module.exports = multer({ storage: storage }).single('image');