'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      Comment.belongsTo(models.Article, {foreignKey: "articleId",as: "article"});
    }

  }
  Comment.init({

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    articleId: {
    type: DataTypes.INTEGER,
    allowNull: false,

    }     
  },{
    sequelize,
    modelName: 'Comment',
    underscored: true,
    tableName: 'comments'
  });
  return Comment;
};