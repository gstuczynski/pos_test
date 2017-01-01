var express = require('express');
var router = express.Router();


router.get('/', function(request, response) {
    response.render('index.html');
});
router.get('/main', function(request, response) {
    response.render('index.html');
});
router.get('/admin', function(request, response) {
    response.render('index.html');
});


module.exports = router;
