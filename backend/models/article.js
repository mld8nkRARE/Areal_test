'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {

    static associate(models) {
      Article.hasMany(models.Comment, {foreignKey: "articleId", as: "comments" })
    }

  }
  Article.init({

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255]
      }
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    sequelize,
    modelName: 'Article',
    underscored: true,
    tableName: 'articles'
  });
  return Article;
};