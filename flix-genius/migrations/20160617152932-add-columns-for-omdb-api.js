'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'flicks',
        'imdb_genres',
        {
          allowNull: true,
          type: Sequelize.ARRAY(Sequelize.STRING)
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_director',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_writer',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_cast',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_description',
        {
          type: Sequelize.TEXT,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_language',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_country',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_votes',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      ),
      queryInterface.addColumn(
        'flicks',
        'imdb_id',
        {
          allowNull: true,
          type: Sequelize.INTEGER,
          unique: true
        }
      ),
      queryInterface.renameColumn('flicks', 'description', 'netflix_description'),
      queryInterface.renameColumn('flicks', 'age_restriction', 'imdb_age_restriction'),
      queryInterface.renameColumn('flicks', 'runtime', 'imdb_runtime'),
      queryInterface.renameColumn('flicks', 'cast', 'netflix_cast'),
      queryInterface.renameColumn('flicks', 'director', 'netflix_director')
    ];
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
