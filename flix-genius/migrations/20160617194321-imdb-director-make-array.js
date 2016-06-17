'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
    queryInterface.removeColumn('flicks', 'imdb_director'),
    queryInterface.removeColumn('flicks', 'imdb_writer'),
    queryInterface.addColumn(
      'flicks',
      'imdb_directors',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      }
    ),
    queryInterface.addColumn(
      'flicks',
      'imdb_writers',
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      }
    )
    ]
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
