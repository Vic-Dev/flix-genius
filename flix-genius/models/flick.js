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
    imdb_id: {
      allowNull: true,
      type: DataTypes.INTEGER,
      unique: true
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
    netflix_genres: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    imdb_genres: {
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
    netflix_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imdb_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imdb_age_restriction: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imdb_runtime: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    },
    trailer_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    box_art: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    netflix_cast: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    imdb_cast: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true     
    },
    netflix_director: {
      type: DataTypes.STRING,
      allowNull: true
    },
    imdb_directors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true    
    },
    imdb_writers: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    imdb_language: {
      type: DataTypes.STRING,
      allowNull: true   
    },
    imdb_countries: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    imdb_votes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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