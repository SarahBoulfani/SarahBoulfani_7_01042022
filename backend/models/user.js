module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", { 
        firstname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        image: {
          type: DataTypes.STRING,
          defaultValue: 'https://i.ibb.co/W0wMBNk/profil.jpg'
        },
        isAdmin: {
          type: DataTypes.BOOLEAN
        },
       
    
});
User.associate = models => {
  User.hasMany(models.Post,{
       foreignKey : 'userId',
       onDelete: 'cascade'
    });
    User.hasMany(models.Comment,{
      foreignKey: 'userId',
      onDelete:'cascade'
    });
    User.hasMany(models.Like, {
      foreignKey: 'userId',
      onDelete: 'cascade'
    });
};
return User;
};
