var models = require('./models');
var request = require('request');
var cheerio = require('cheerio');

var offset = 0;

var updateDescription = function(flick, description) {
  flick.update({
    description: givenDescription
  }).then(function() { console.log(flick.description); })
}

// Using Netflix
var getDescription = function(flickInstance) {
  var options = {
    url: 'https://www.netflix.com/title/' + flickInstance.netflix_id 
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var description = $('.synopsis span:nth-child(2)').text()
      if (description != '') {
        flickInstance.update({
          description: description
        }).then(function(){ console.log(flickInstance.description); })
      }
    }
  })
}

// Using AllFlicks
var getDescriptionAllFlicks = function(flickInstance) {
  var options = {
    url: 'https://www.allflicks.net/movies-canada/' + flickInstance.netflix_id
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var description = $('.borderless').contents()[3].data; 
      if (description != '') {
        flickInstance.update({
          description: description
        }).then(function(){ console.log(flickInstance.description); })
      }
    }
  })
}

// getDescription();

var getAllFlicks = function(callback) {
  models.flick.findAll({ 
    where: { 
      $or: [{description: null}, {description: ''}]
    },
    order: [['id', 'ASC']] 
  }).then(function(flicks) {
    flicks.forEach(function(flickInstance) {
      setTimeout( function() {
        console.log(flickInstance.id);
        callback(flickInstance);
      }, 1000 + offset);
      offset += 1000;
    })
  })
}

var removeBackslashDesc = function() {
  models.flick.findAll({
    where: {
      description: { $like: '%\\\\%' }
    },
    order: [['id', 'ASC']]
  }).then(function(flicks) {
    flicks.forEach(function(flick) {
      console.log(flick.description);
      flick.update({
        description: null
      }).then(function(){ console.log(flick.description); })
    })
  })
}


getAllFlicks(getDescription);


module.exports.getAllFlicks = getAllFlicks;