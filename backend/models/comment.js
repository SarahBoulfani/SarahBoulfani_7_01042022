module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        textComment: {
            type: DataTypes.STRING,
            allowNull: false
        },

    });
    //Les associations pour le model comment
    Comment.associate = models => {
        Comment.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
        Comment.belongsTo(models.Post, {
            foreignKey: 'postId',
            onDelete: 'cascade'
        });
    };
    return Comment;
}