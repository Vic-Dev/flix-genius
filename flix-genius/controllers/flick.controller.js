'use strict';

var models = require('../models');

// Gets a list of Flicks
exports.index = function(req, res) {
  models.flick.findAll()
  .then(function(flicks) {
    res.json(flicks);
  });
};

// // Gets a single Thing from the DB
exports.show = function(req, res) {
  var flickId = req.params.id;
  models.flick.find({
    where: {
      netflix_id: flickId
    }
  })
  .then(function(flickInstance) {
    res.json(flickInstance);
  });
};

exports.paginate = function(req, res) {
  var start = req.param('start');
  var limit = req.param('limit');
  var sort = req.param('sort');
  var order = req.param('order');
  console.log('start: ' + start + ' limit: ' + limit);
  models.flick.findAll({ where: {
    active: true
  }, offset: start, limit: limit, order: sort + ' ' + order + ' NULLS LAST'})
  .then(function(flickInstance) {
    res.json(flickInstance);
  });
};

// // Updates an existing Thing in the DB
// exports.update = function(req, res) {

//   if(req.body.id){
//     delete req.body.id;
//   }
//   Thing.find({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(handleEntityNotFound(res))
//     .then(saveUpdates(req.body))
//     .then(responseWithResult(res))
//     .catch(handleError(res));
// };