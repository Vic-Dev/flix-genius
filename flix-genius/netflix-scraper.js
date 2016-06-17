var models = require('./models');
var request = require('request');
var cheerio = require('cheerio');

var offset = 0;

// Using Netflix
var getDescription = function(flick_instance) {
  var options = {
    url: 'https://www.netflix.com/title/' + flick_instance.netflix_id 
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var description = $('.synopsis span:nth-child(2)').text()
      if (description != '') {
        flick_instance.update({
          description: description
        }).then(function(){ console.log(flick_instance.description); })
      }
    }
  })
}

// Using AllFlicks
var getDescriptionAllFlicks = function(flick_instance) {
  var options = {
    url: 'https://www.allflicks.net/movies-canada/' + flick_instance.netflix_id
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      var description = $('.borderless').contents()[3].data; 
      if (description != '') {
        flick_instance.update({
          description: description
        }).then(function(){ console.log(flick_instance.description); })
      }
    }
  })
}

// getDescription();

var getAllFlicks = function(callback) {
  models.flick.findAll({ 
    where: { 
      // $or: [{description: null}, {description: ''}]
      id: 1
    },
    order: [['id', 'ASC']] 
  }).then(function(flicks) {
    flicks.forEach(function(flick_instance) {
      setTimeout( function() {
        console.log(flick_instance.id);
        callback(flick_instance);
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