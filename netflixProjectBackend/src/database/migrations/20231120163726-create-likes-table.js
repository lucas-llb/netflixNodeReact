'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      user_id: {
        allowNull: false,
				primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      serie_id: {
        allowNull: false,
				primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
        references: { model: 'series', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('likes')
  }
};
