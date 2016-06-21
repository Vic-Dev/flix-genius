var models = require('./models');
var request = require('request');
var cheerio = require('cheerio');

var offset = 0;
var key;

var updateFlick = function(flick, body) {
  var $ = cheerio.load(body);
  var anger = $('anger').text();
  var disgust = $('disgust').text();
  var fear = $('fear').text();
  var joy = $('joy').text();
  var sadness = $('sadness').text();
  flick.update({
    anger: anger,
    disgust: disgust,
    fear: fear,
    joy: joy,
    sadness: sadness
  }).then(function() { console.log('\u0007' + flick.joy); })
}

var getAllFlicks = function(callback) {
  models.flick.findAll({ 
    where: { anger: null },
    order: [['id', 'ASC']] 
  }).then(function(flicks) {
    // console.log(flicks);
    flicks.forEach(function(flickInstance) {
      setTimeout( function() {
        console.log(flickInstance.id);
        callback(flickInstance);
      }, 2000 + offset);
      offset += 2000;
    })
  })
}

var getWatsonSentiment = function(flick) {
  var options = {
    url: 'http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment?apikey=' + key + '&text=' + flick.netflix_description
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var sentiment = $('score').text();
      // console.log(body.Response);
      if (body.Response != 'False') {
        updateFlick(flick, sentiment);
      }
    }
  })
}

var getWatsonEmotion = function(flick) {
  var options = {
    url: 'http://gateway-a.watsonplatform.net/calls/text/TextGetEmotion?apikey=' + key + '&text=' + flick.netflix_description
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // var sentiment = $('score').text();
      console.log(body);
      if (body.Response != 'False') {
        updateFlick(flick, body);
      }
    }
  })
}

// getAllFlicks(getWatsonInfo);

getAllFlicks(getWatsonEmotion);