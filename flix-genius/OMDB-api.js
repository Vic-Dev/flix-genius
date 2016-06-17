var models = require('./models');
var request = require('request');

// TODO: Add logic to add imdb link and rating for each entry in db

var updateFlick = function(flick, description) {
  flick.update({
    description: givenDescription
  }).then(function() { console.log(flick.description); })
}

var getIMDBInfo = function(title, year) {
  var options = {
    url: 'http://www.omdbapi.com/?t=' + title + '&y=' + year + '&plot=short&r=json'
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      console.log(body);
    }
  })
}

getIMDBInfo('Atelier', 2015);