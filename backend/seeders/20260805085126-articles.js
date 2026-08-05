'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const articles = [];
    const DAY = 1000 * 60 * 60 * 24;
    
    for (let i = 1; i<=10; i++){
      articles.push({
        title: "Статья номер " + i,
        content: ("Текст статьи номер " + i + "\n").repeat(10),
        created_at: new Date(Date.now() - i * DAY),
        updated_at: new Date(Date.now() - i * DAY)
      })
    }
    await queryInterface.bulkInsert("articles",articles, {});    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete("articles", null, {});
  }
};
