var models = require('./models');
var request = require('request');

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

getIMDBInfo('Black Mirror', 2011);