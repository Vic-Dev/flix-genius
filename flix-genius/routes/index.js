var models  = require('../models');
var express = require('express');
var router = express.Router();
var http = require('http');
var scraper = require('../allflicks-scraper.js');
var net_scraper = require('../netflix-scraper.js');
var flick_controller = require('../controllers/flick.controller.js');

// flick_controller.index();

// flick_controller.show(80063375);

router.get('/', flick_controller.index);

router.get('/:id', flick_controller.show);

router.get('/about', function(req,res,next) {
  var test = testing();
  res.send(test);
});

module.exports = router;

// scraper.getCookie();

// net_scraper.getFlick();

