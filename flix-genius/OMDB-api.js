var models = require('./models');
var request = require('request');

var offset = 0;
// var net_scraper = require('./netflix-scraper.js');

// TODO: Remove from db runtimes of 'N/A'

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

var updateFlick = function(flick, body) {
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

  // console.log('Runtime: ' + current_runtime);
  // console.log('Genres: ' + current_genres);
  // console.log('Directors: ' + current_directors);
  // console.log('Writers: ' + current_writers);
  // console.log('Cast: ' + current_cast);
  // console.log('Description: ' + current_description);
  // console.log('Language: ' + current_language);
  // console.log('Countries: ' + current_countries);
  // console.log('Rating: ' + current_rating);
  // console.log('Votes: ' + current_votes);
  // console.log('IMDB id: ' + current_id);
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
  }).then(function() { console.log('\u0007' + flick.imdb_rating); })
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
      }, 250 + offset);
      offset += 250;
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