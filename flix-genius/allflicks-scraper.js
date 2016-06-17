var models = require('./models');
var request = require('request');

var cookie;
var limit;

var optionsCookie = {
  url: 'https://www.allflicks.net/canada',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'
  }  
}

var getCookie = function() {request(optionsCookie, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cookie = response.headers['set-cookie'].join(';');
      console.log(cookie);
      getData(0, cookie);
    }
  })
}

var getData = function(start, cookie) {
    var options_data = {
    url: 'https://www.allflicks.net/wp-content/themes/responsive/processing/processing_ca.php?draw=1&columns%5B0%5D%5Bdata%5D=box_art&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=title&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=year&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=genre&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=rating&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=available&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=director&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=cast&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=5&order%5B0%5D%5Bdir%5D=desc&start=' + start + '&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&movies=true&shows=true&documentaries=true&rating=imdb&min=1900&max=2016&_=1465774102683',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
      'Cookie': cookie
    }
  }
  request(options_data, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body);
      if (body.data.length > 0) {
        // add to database
        console.log(body.data[0]);
        console.log(start);
        var allData = body.data;
        for (var i = 0; i < allData.length; i++) {
          var currentEntry = allData[i];
         
          // Regex box_art
          var currentArt = parseBoxArt(currentEntry);

          // Regex genres
          var currentGenres = parseGenres(currentEntry);

          // Split cast into array
          var currentCast = parseCast(currentEntry);

          // Rating logic
          var currentRating = parseRating(currentEntry);

          // Director logic
          var currentDirector = parseDirector(currentEntry);
          models.flick.findOrCreate({where: { netflix_id: currentEntry.id }, defaults: {
              title: currentEntry.title,
              year: currentEntry.year,
              availability: currentEntry.available,
              netflix_genres: currentGenres,
              imdb_rating: currentRating,
              box_art: currentArt,
              netflix_cast: currentCast,
              netflix_director: currentDirector,
              active: true
            } 
          })
          .spread(function(user, created) {
            console.log(user.get({
              plain: true
            }));
            console.log(created);
          })
        }
        setTimeout(function(){ 
          getData(start + 100, cookie); 
        }, 2000);
      }
    }
  })
}

var parseBoxArt = function(data) {
  var img = data.box_art;
  var imgRegex = '^<img src="(.*)" width.*$';
  return img.match(imgRegex)[1];
}

var parseGenres = function(data) {
  var genreArray = [ data.genre, data.genre2, data.genre3 ];
  var genreArrayParsed = [];
  var genreRegex = '^<a.*">(.+)<\/a>$';
  for (var j = 0; j < genreArray.length; j++) {
    var regexMatch = genreArray[j].match(genreRegex)
    if (regexMatch != null) {
      genreArrayParsed.push(regexMatch[1]);
    }
  }
  return genreArrayParsed;
}

var parseCast = function(data) {
  var cast = data.cast.split(',');
  if (cast[0].length <= 0) {
    cast = null;
  }
  return cast;
}

var parseRating = function(data) {
  var rating = data.rating;
  if (rating == '-') {
    rating = null;
  }
  return rating;
}

var parseDirector = function(data) {
  var director = data.director;
  if (director.length <= 0) {
    director = null;
  }
  return director;
}

module.exports.getCookie = getCookie;