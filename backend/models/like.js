module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define("Like", {
        like: {
            type: DataTypes.BOOLEAN,
        },

    });
    //Les associations pour le model like
    Like.associate = models => {
        Like.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
        Like.belongsTo(models.Post, {
            foreignKey: 'postId',
            onDelete: 'cascade'
        });
    };
    return Like;
}