'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'flicks',
      'anger',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(7, 6)
      }
    ),
    queryInterface.changeColumn(
      'flicks',
      'disgust',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(7, 6)
      }
    ),
    queryInterface.changeColumn(
      'flicks',
      'fear',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(7, 6)
      }
    ),
    queryInterface.changeColumn(
      'flicks',
      'joy',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(7, 6)
      }
    ),
    queryInterface.changeColumn(
      'flicks',
      'sadness',
      {
        allowNull: true,
        type: Sequelize.DECIMAL(7, 6)
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
