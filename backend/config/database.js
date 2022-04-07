/* //Importer sequelize
const { Sequelize } = require('sequelize');
//Connexion de l'API à notre base de données 
module.exports = new Sequelize(`${process.env.BD_NAME}`, `${process.env.BD_USERNAME}`, `${process.env.BD_SECRET_KEY}`, {
    host: `${process.env.BD_HOST}`,
    dialect: 'mysql'
}); */
