'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'flicks',
      'anger',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(6, 5)
      }
    ),
    queryInterface.addColumn(
      'flicks',
      'disgust',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(6, 5)
      }
    ),
    queryInterface.addColumn(
      'flicks',
      'fear',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(6, 5)
      }
    ),
    queryInterface.addColumn(
      'flicks',
      'joy',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(6, 5)
      }
    ),
    queryInterface.addColumn(
      'flicks',
      'sadness',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(6, 5)
      }
    )
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
