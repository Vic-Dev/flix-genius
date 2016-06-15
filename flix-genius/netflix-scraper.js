var request = require('request');
var cheerio = require('cheerio');

var options = {
  url: 'https://www.netflix.com/title/70213076'  
}

var getDescription = function() {request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      console.log($('.synopsis-text').text());
    }
  })
}

getDescription();