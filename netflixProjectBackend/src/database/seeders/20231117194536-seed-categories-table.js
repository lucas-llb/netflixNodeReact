'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      { name: 'Suspense', position: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Ação', position: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Documentário', position: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'Comédia', position: 4, created_at: new Date(), updated_at: new Date() },
      { name: 'Aventura', position: 5, created_at: new Date(), updated_at: new Date() },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
