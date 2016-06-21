var models = require('./models');
var request = require('request');
var cheerio = require('cheerio');

var offset = 0;

var updateFlick = function(flick, body) {
  flick.update({
    sentiment: body
  }).then(function() { console.log('\u0007' + flick.sentiment); })
}

var getAllFlicks = function(callback) {
  models.flick.findAll({ 
    where: { sentiment: null },
    order: [['id', 'ASC']] 
  }).then(function(flicks) {
    // console.log(flicks);
    flicks.forEach(function(flickInstance) {
      setTimeout( function() {
        console.log(flickInstance.id);
        callback(flickInstance);
      }, 1500 + offset);
      offset += 1500;
    })
  })
}

var getWatsonInfo = function(flick) {
  var options = {
    url: 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey=' + key + '&text=' + flick.netflix_description
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      debugger;
      var $ = cheerio.load(body);
      var sentiment = $('score').text();
      // console.log(body.Response);
      if (body.Response != 'False') {
        updateFlick(flick, sentiment);
      }
    }
  })
}

getAllFlicks(getWatsonInfo);