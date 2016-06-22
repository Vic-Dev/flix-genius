'use strict';

var models = require('../models');

// Gets a list of Flicks
exports.index = function(req, res) {
  models.flick.findAll()
  .then(function(flicks) {
    res.json(flicks);
  });
};

// // Gets a single Thing from the DB
exports.show = function(req, res) {
  var flickId = req.params.id;
  models.flick.find({
    where: {
      netflix_id: flickId
    }
  })
  .then(function(flickInstance) {
    res.json(flickInstance);
  });
};

// TODO: EITHER change query to fit database search OR update database cols

exports.paginate = function(req, res) {
  var start = req.query.start;
  var limit = req.query.limit;
  var sort = req.query.sort;
  var order = req.query.order;
  var moviesOrTv = req.query.moviesOrTv;
  var genre = req.query.genre;
  var netflix_genres;
  var genreQuery = '';
  var genreAliases = {
    'Action and Adventure': 'Action & Adventure', 
    'Anime': 'Anime', 
    'Canadian': 'Canadian Movies', 
    'Children and Family': 'Children & Family Movies', 
    'Classic': 'Classic Movies', 
    'Comedies': 'Comedies', 
    'Documentaries': 'Documentaries', 
    'Dramas': 'Dramas', 
    'Faith and Spirituality': 'Faith & Spirituality', 
    'Gay and Lesbian': 'Gay & Lesbian Movies', 
    'Horror': 'Horror Movies', 
    'Independent': 'Independent Movies', 
    'International': 'International Movies', 
    'Romantic': 'Romantic Movies', 
    'Sci-Fi and Fantasy': 'Sci-Fi & Fantasy', 
    'Sports': 'Sports Movies', 
    'Sports and Fitness': 'Sports & Fitness', 
    'Thrillers': 'Thrillers', 
    'Music': 'Music', 
    'Musicals': 'Musicals'
  }
  console.log('movie: ' + moviesOrTv);
  console.log('genre: ' + genre);
  console.log('sort: ' + sort);
  console.log('order: ' + order);
  console.log('start: ' + start + ' limit: ' + limit);
  if (moviesOrTv == undefined || moviesOrTv == 'undefined') {
    moviesOrTv = '';
  }
  if (genre == undefined || genre == 'undefined') {
    genre = '';
  }
  console.log(genre);
  if (moviesOrTv === 'TV Shows') {
    netflix_genres = " AND netflix_genres @> ARRAY['TV Shows']::varchar[]" + genreQuery;
  } else if (moviesOrTv === 'Movies') {
    netflix_genres = " AND NOT netflix_genres @> ARRAY['TV Shows']::varchar[]" + genreQuery;
  } else {
    netflix_genres = '';
  }
  if (genre.length > 0) {
    genreQuery = " AND netflix_genres @> ARRAY['" + genreAliases[genre] + "']::varchar[]";
  }
  var where = ["active = ?" + netflix_genres + genreQuery, true]
  models.flick.findAll({ where: where, offset: start, limit: limit, order: sort + ' ' + order + ' NULLS LAST'})
  .then(function(flickInstance) {
    res.json(flickInstance);
  });
};

// // Updates an existing Thing in the DB
// exports.update = function(req, res) {

//   if(req.body.id){
//     delete req.body.id;
//   }
//   Thing.find({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };