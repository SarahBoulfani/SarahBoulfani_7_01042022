module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", { 
        content: {
          type: DataTypes.STRING,
          allowNull: false
        },
        imageUrl: {
          type: DataTypes.STRING
        },   
});

Post.associate = models =>{
Post.belongsTo(models.User, {
  foreignKey : 'userId',
  onDelete: "CASCADE"
})
}; 
return Post;
}