var express = require('express');
var router = express.Router();
var Model = require('../models/article.js')
var parseString = require('xml2js').parseString;


router.get('/articles', function(require, response){
  Model.find({}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});





module.exports = router;