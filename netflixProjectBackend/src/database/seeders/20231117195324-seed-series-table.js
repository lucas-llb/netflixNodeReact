'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const [categories] = await queryInterface.sequelize.query('SELECT id FROM categories');

    await queryInterface.bulkInsert('series', [
      { name: 'Prison Break', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Breaking Bad', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'The boys', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Friends', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'How I met your mother', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[0].id, created_at: new Date(), updated_at: new Date() },
      { name: 'The big bang theory', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', featured: true, category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Game of Thrones', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'House of the dragon', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'The last of us', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[1].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Brooklyn nine nine', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Vikings', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[2].id, created_at: new Date(), updated_at: new Date() },
      { name: 'Stranger Things', synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', category_id: categories[3].id, created_at: new Date(), updated_at: new Date() },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('series', null, {});
  }
};
