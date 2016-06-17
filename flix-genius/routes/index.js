var models  = require('../models');
var express = require('express');
var router = express.Router();
var http = require('http');
var scraper = require('../allflicks-scraper.js');
var net_scraper = require('../netflix-scraper.js');

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

// scraper.getCookie();

// net_scraper.getFlick();

// // models.flick.findOne({where: {netflix_id: 80097490} }).then(function(thing) {
// //   console.log(thing);
// // });

