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


var request = require('request');
var cheerio = require('cheerio');
var start_val = 0;

var cookie;
var limit;

var options_cookie = {
  url: 'https://www.allflicks.net/canada',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36'
  }  
}

var options_data = {
  url: 'https://www.allflicks.net/wp-content/themes/responsive/processing/processing_ca.php?draw=1&columns%5B0%5D%5Bdata%5D=box_art&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=title&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=true&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=year&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=true&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=genre&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=true&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=rating&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=true&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=available&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=true&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=director&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=true&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=cast&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=true&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&order%5B0%5D%5Bcolumn%5D=5&order%5B0%5D%5Bdir%5D=desc&start=' + start_val + '&length=100&search%5Bvalue%5D=&search%5Bregex%5D=false&movies=true&shows=true&documentaries=true&rating=imdb&min=1900&max=2016&_=1465774102683',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36',
    'Cookie': cookie
  }
}


var getCookie = function() {request(options_cookie, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      cookie = response.headers['set-cookie'].join(';');
      options_data.headers['Cookie'] = cookie;
      console.log(options_data);
      console.log(cookie);
      // var filePermission = $('tr').find('td:first-child').find('code');
      // for (var i = 0; i < filePermission.length; i++) {
      //   // console.log(filePermission[i].children[0].data);
      // }
      // var $a = $('a')
      // for (var i = 0; i < $a.length; i++) {
      //   console.log($a[i].attribs);
      // }
       // Show the HTML for the Google homepage.
      for (var i = 100; i <= 400; i = i + 100) {
        // console.log(all_data[i]);
        console.log(i);
        getData();
      }
    }
  })
}

getCookie();

// console.log($);

// var getData = function() {request(options_data, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//       body = JSON.parse(body)
//       var all_data = body.data;
//       for (var i = 0; i < all_data.length; i++) {
//         console.log(all_data[i].box_art);
//         var current_entry = all_data[i];
//         var cast_array = current_entry.cast.split(',');
//         if (current_entry.rating == '-') {
//           current_entry.rating = null;
//         }
//         models.flick.findOrCreate({where: { netflix_id: current_entry.id }, defaults: {
//             title: current_entry.title,
//             year: current_entry.year,
//             availability: current_entry.available,
//             netflix_genre: current_entry.genre,
//             imdb_rating: current_entry.rating,
//             box_art: current_entry.box_art,
//             cast: cast_array,
//             director: current_entry.director,
//             active: true
//           } 
//         })
//         .spread(function(user, created) {
//           console.log(user.get({
//             plain: true
//           }))
//           console.log(created)

//     /*
//       {
//         username: 'sdepold',
//         job: 'Technical Lead JavaScript',
//         id: 1,
//         createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
//         updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
//       }
//       created: true
//       */
//     })
//       }
//     }
//   })
// }

// getData();

var getData = function() {request(options_data, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      body = JSON.parse(body)
      var all_data = body.data;
      var pages = Math.ceil(((body.recordsTotal)/100));
      console.log(pages);
      limit = body.recordsTotal - ((body.recordsTotal) % 100)
      console.log(limit);
      return limit;
    }
  })
}

// for (var i = 100; i <= 400; i = i + 100) {
//   // console.log(all_data[i]);
//   console.log(i);
//   getData();
// }