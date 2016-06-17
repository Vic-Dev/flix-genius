'use strict';
module.exports = function(sequelize, DataTypes) {
  var Flick = sequelize.define('flick', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    netflix_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    availability: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    },
    netflix_genre: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    netflix_rating: {
      allowNull: true,
      type: DataTypes.DECIMAL(3, 1)
    },
    imdb_rating: {
      allowNull: true,
      type: DataTypes.DECIMAL(3, 1)
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    age_restriction: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    runtime: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    trailer_link: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    box_art: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    cast: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    imdb_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    netflix_link: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
return Flick;
};