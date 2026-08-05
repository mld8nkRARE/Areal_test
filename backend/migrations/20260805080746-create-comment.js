'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      article_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model: "articles", key:"id"},
        onDelete: "CASCADE"
      },
      content: {
        allowNull:false,
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addIndex('comments', ['article_id']);
    await queryInterface.addIndex('comments', ['created_at']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('comments');
  }
};