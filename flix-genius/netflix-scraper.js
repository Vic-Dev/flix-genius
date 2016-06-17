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
      console.log(response);
      // console.log(description);
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
      console.log(description);
      if (description != '') {
        flick_instance.update({
          description: description
        }).then(function(){ console.log(flick_instance.description); })
      }
    }
  })
}

// getDescriptionAllFlicks(70236875);

// getDescriptionAllFlicks(70219525);

// getDescription();

// getDescription(70139553);

// getDescription(70202593);

var getAllFlicks = function() {
  models.flick.findAll({ 
    where: { 
      $or: [{description: null}, {description: ''}]
    },
    order: [['id', 'ASC']] 
  }).then(function(flicks) {
    flicks.forEach(function(flick_instance) {
      // getDescription(flick_instance);
      setTimeout( function() {
        console.log(flick_instance.id);
        // getDescription(flick_instance);
        getDescriptionAllFlicks(flick_instance);
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


getAllFlicks();


module.exports.getAllFlicks = getAllFlicks;