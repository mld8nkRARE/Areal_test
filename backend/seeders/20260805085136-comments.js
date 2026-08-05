'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const articles = await queryInterface.sequelize.query(
      'SELECT id FROM articles ORDER BY id;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const articleIds = articles.map(article => article.id);

    if (!articleIds.length) 
      throw new Error('Статьи не загружены');
    
    const comments = [];
    const DAY = 1000 * 60 * 60 * 24;
    const MINUTE = 1000 * 60;
    for (let i = 1; i<=100; i++){
      comments.push({
        article_id: articleIds[(i - 1) % articleIds.length],
        content: ("Текст комментария номер" + i + "\n").repeat(3),
        created_at: new Date(Date.now() - (i%10) * DAY + (i%10) * MINUTE),
        updated_at: new Date(Date.now() - (i%10) * DAY + (i%12) * MINUTE)
      })
    }
    
    await queryInterface.bulkInsert('comments', comments, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};
