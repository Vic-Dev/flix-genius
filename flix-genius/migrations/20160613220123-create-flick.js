'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('flicks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      netflix_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      title: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      year: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      availability: {
        type: Sequelize.DATE,
        validate: {
          notEmpty: true
        }
      },
      netflix_genre: {
        allowNull: true,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      age_restriction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      runtime: {
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      trailer_link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      box_art: {
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      cast: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      director: {
        type: Sequelize.STRING,
        allowNull: true
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Flicks');
  }
};