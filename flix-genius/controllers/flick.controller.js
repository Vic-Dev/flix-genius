'use strict';

var models = require('../models');
var request = require('request');

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

// Updates an existing Thing in the DB
exports.update = function(req, res) {
  var flickId = req.params.id;
  var imdbId = req.query.imdbId;
  console.log('hit update page');
  console.log(imdbId);
  if (imdbId != undefined) {
    console.log('hit this part');
    models.flick.find({
      where: {
        netflix_id: flickId
      }
    })
    .then(function(flickInstance) {
      getIMDBInfo(res, flickInstance, imdbId);
    });
  } else {
    console.log('hit second part');
    res.send('Error: no imdb id');
  }
};

var parseRuntime = function(data) {
  var runtime = data;
  var runtimeRegex = '(.+) min$';
  runtime = runtime.match(runtimeRegex);
  if (runtime) {
    runtime = runtime[1];
  }
  return runtime;
}

var parseArray = function(data) {
  var array = data.split(',');
  if ( (array[0].length <= 0) || (checkIfNA(array[0])) ) {
    array = null;
  }
  return array;
}

var checkIfNA = function(input) {
  return input == 'N/A'
}

var parseString = function(data) {
  var string = data;
  if (checkIfNA(string)) {
    string = null;
  }
  return string;
}

var parseVotes = function(votes) {
  if (votes) {
    return votes.replace(/,/g,'');
  }
  return votes
}

var updateFlick = function(res, flick, body) {
  var current_runtime = parseRuntime(body.Runtime);
  var current_genres = parseArray(body.Genre);
  var current_directors = parseArray(body.Director);
  var current_writers = parseArray(body.Writer);
  var current_cast = parseArray(body.Actors);
  var current_description = parseString(body.Plot);
  var current_language = parseString(body.Language);
  var current_countries = parseArray(body.Country);
  var current_rating = parseString(body.imdbRating);
  var current_votes = parseVotes(parseString(body.imdbVotes));
  var current_id = parseString(body.imdbID);

  flick.update({
    imdb_age_restriction: current_runtime,
    imdb_runtime: current_runtime,
    imdb_genres: current_genres,
    imdb_directors: current_directors,
    imdb_writers: current_writers,
    imdb_cast: current_cast,
    imdb_description: current_description,
    imdb_language: current_language,
    imdb_countries: current_countries,
    imdb_rating: current_rating,
    imdb_votes: current_votes,
    imdb_id: current_id
  }).then(function() { console.log('\u0007' + flick.imdb_rating); res.json(body.imdbRating) })
}

var getIMDBInfo = function(res, flick, imdbId) {
  var options = {
    url: 'http://www.omdbapi.com/?i=' + imdbId + '&plot=full&r=json'
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log(body);
      console.log(body.Response);
      if (body.Response != 'False') {
        updateFlick(res, flick, body);
      }
    }
  })
}
