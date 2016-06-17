var models = require('./models');
var request = require('request');

var offset = 0;
// var net_scraper = require('./netflix-scraper.js');

// TODO: Add logic to add imdb link and rating for each entry in db

var parseRuntime = function(data) {
  var runtime = data.Runtime;
  var runtimeRegex = '(.+) min$';
  runtime = runtime.match(runtimeRegex);
  if (runtime) {
    runtime = runtime[1];
  }
  return runtime;
}

var parseArray = function(data, attribute) {
  var array = data[attribute].split(',');
  if ( (array[0].length <= 0) || (checkIfNA(array[0])) ) {
    array = null;
  }
  return array;
}

var checkIfNA = function(input) {
  return input == 'N/A'
}

var parseString = function(data, attribute) {
  var string = data[attribute];
  if (checkIfNA(string)) {
    string = null;
  }
  return string;
}

var updateFlick = function(flick, body) {
  var current_runtime = parseRuntime(body);

  var current_genres = parseArray(body, 'Genre');

  var current_directors = parseArray(body, 'Director');

  var current_writers = parseArray(body, 'Writer');

  var current_cast = parseArray(body, 'Actors');

  var current_description = parseString(body, 'Plot');

  var current_language = parseString(body, 'Language');

  var current_countries = parseArray(body, 'Country');

  var current_rating = parseString(body, 'imdbRating');

  console.log(current_rating);
  // flick.update({
  //   imdb_age_restriction: body.Rated,
  //   imdb_runtime: current_runtime,
  //   imdb_genres: current_genres,
  //   imdb_directors: current_directors,
  //   imdb_writers: current_writers,
  //   imdb_cast: current_cast,
  //   imdb_description: current_description,
  //   imdb_language: current_language,
  //   imdb_countries: current_countries,
  //   imdb_rating: current_rating,
  //   imdb_votes:
  //   imdb_id:
  // }).then(function() { console.log(flick.rating); })
}

var getAllFlicks = function(callback) {
  models.flick.findAll({ 
    order: [['id', 'ASC']] 
  }).then(function(flicks) {
    // console.log(flicks);
    flicks.forEach(function(flickInstance) {
      setTimeout( function() {
        console.log(flickInstance.id);
        callback(flickInstance);
      }, 1000 + offset);
      offset += 1000;
    })
  })
}

var getIMDBInfo = function(flick) {
  var options = {
    url: 'http://www.omdbapi.com/?t=' + flick.title + '&y=' + flick.year + '&plot=full&r=json'
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log(body);
      console.log(body.Response);
      if (body.Response != 'False') {
        updateFlick(flick, body);
      }
    }
  })
}

getAllFlicks(getIMDBInfo);

// getIMDBInfo('Atelier', 2015);

// net_scraper.getAllFlicks(getIMDBInfo);