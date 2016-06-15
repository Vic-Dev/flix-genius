var models  = require('../models');
var express = require('express');
var router = express.Router();
var http = require('http');

/* GET home page. */
router.get('/', function(req, res, next) {
  models.flick.findAll()
  .then(function(users) {
    res.render('index', {
      title: 'Express',
      users: users
    });
  });
});

router.get('/write-test', function() {
  models.flick.findOrCreate({where: { netflix_id: 1234 }, defaults: {
      title: 'test',
      year: 2016,
      availability: Date.now(),
      netflix_genre: 'Horror',
      netflix_rating: 8.0,
      imdb_rating: 7.2,
      description: 'This is a test entry',
      age_restriction: '14a',
      runtime: 100,
      trailer_link: 'slkjfasldkf',
      box_art: 'slkfjalsdf',
      cast: ['this guy', 'another person'],
      director: 'Someone',
      active: true
    } 
  })
  .spread(function(user, created) {
    console.log(user.get({
      plain: true
    }))
    console.log(created)

    /*
      {
        username: 'sdepold',
        job: 'Technical Lead JavaScript',
        id: 1,
        createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
        updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
      }
      created: true
      */
    })
});

router.get('/about', function(req,res,next) {
  var test = testing();
  res.send(test);
});

// router.post('/add-db', function(req, res) {
//   models.Flicks
//         .build({
//             netflix_id:
//             title:
//             year:
//             availability:
//             description:
//             age_restriction:
//             runtime:
//             trailer_link:
//             box_art:
//             cast:
//             director:
//             title: req.body.taskName,
//             completed: false})
//         .save()
//         .then(function() {
//           models.Tasks.findAll({}).then(function(taskList) {
//                 res.render('index', {tasks: taskList});
//             });
//         });
// });

module.exports = router;




// var request = require('request');
// var cheerio = require('cheerio');
// var start_val = 0;

// var cookie;
// var limit;

// var options_cookie = {
//   url: 'https://www.allflicks.net/canada',
//   headers: {
//     'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'
//   }  
// }

// var getCookie = function() {request(options_cookie, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       cookie = response.headers['set-cookie'].join(';');
//       console.log(cookie);
//       getData(0, cookie);
//     }
//   })
// }

// getCookie();

// var getData = function(start, cookie) {
//     var options_data = {
//     url: 'https://www.allflicks.net/wp-content/themes/responsive/processing/processing_ca.php?draw=1&columns%5B0%5D%5Bdata%5D=box_art&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=title&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=year&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=genre&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=rating&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=available&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=director&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=cast&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=5&order%5B0%5D%5Bdir%5D=desc&start=' + start + '&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&movies=true&shows=true&documentaries=true&rating=imdb&min=1900&max=2016&_=1465774102683',
//     headers: {
//       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
//       'Cookie': cookie
//     }
//   }
//   request(options_data, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       body = JSON.parse(body);
//       if (body.data.length > 0) {
//         // add to database
//         console.log(body.data[0]);
//         console.log(start);
//         var all_data = body.data;
//         for (var i = 0; i < all_data.length; i++) {
//           var current_entry = all_data[i];
         
//           // Regex box_art
//           var current_art = parseBoxArt(current_entry);

//           // Regex genres
//           var current_genres = parseGenres(current_entry);

//           // Split cast into array
//           var current_cast = parseCast(current_entry);

//           // Rating logic
//           var current_rating = parseRating(current_entry);

//           // Director logic
//           var current_director = parseDirector(current_entry);
//           models.flick.findOrCreate({where: { netflix_id: current_entry.id }, defaults: {
//               title: current_entry.title,
//               year: current_entry.year,
//               availability: current_entry.available,
//               netflix_genre: current_genres,
//               imdb_rating: current_rating,
//               box_art: current_art,
//               cast: current_cast,
//               director: current_director,
//               active: true
//             } 
//           })
//           .spread(function(user, created) {
//             console.log(user.get({
//               plain: true
//             }));
//             console.log(created);
//           })
//         }
//         // setTimeout(function(){ 
//         //   getData(start + 100, cookie); 
//         // }, 2000);
//       }
//     }
//   })
// }

// // models.flick.findOne({where: {netflix_id: 80097490} }).then(function(thing) {
// //   console.log(thing);
// // });

// var parseBoxArt = function(data) {
//   var img = data.box_art;
//   var img_regex = '^<img src="(.*)" width.*$';
//   return img.match(img_regex)[1];
// }

// var parseGenres = function(data) {
//   var genre_array = [ data.genre, data.genre2, data.genre3 ];
//   var genre_array_parsed = [];
//   var genre_regex = '^<a.*">(.+)<\/a>$';
//   for (var j = 0; j < genre_array.length; j++) {
//     var regex_match = genre_array[j].match(genre_regex)
//     if (regex_match != null) {
//       genre_array_parsed.push(regex_match[1]);
//     }
//   }
//   return genre_array_parsed;
// }

// var parseCast = function(data) {
//   var cast = data.cast.split(',');
//   if (cast[0].length <= 0) {
//     cast = null;
//   }
//   return cast;
// }

// var parseRating = function(data) {
//   var rating = data.rating;
//   if (rating == '-') {
//     rating = null;
//   }
//   return rating;
// }

// var parseDirector = function(data) {
//   var director = data.director;
//   if (director.length <= 0) {
//     director = null;
//   }
//   return director;
// }
