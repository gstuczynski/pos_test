var express = require('express');
var router = express.Router();
var Model = require('../models/article.js')
var parseString = require('xml2js').parseString;
var parser = require('xml2js');
var Client = require('node-rest-client').Client;

var xml = require('xml');


router.get('/articles', function(require, response){
  Model.find({}, function(err, resource){
    if(err){
      response.send(err).status(404);
    }else{
      response.send(resource).status(200);
    }
  });
});
////////////////

router.get('/sendOrder', function(require, responseApi){
let responseFromWs;
 var args = {
    data: {
  "orderAddData": {

    "salePlaceId": {
      "idSalePlace": 100100
    },
    "documentDefinitionId": {
      "idDocumentDefinition": 101700
    },
    "documentDate": "2017-01-02T14:23:01",
    "customerId": {
      "idCustomer": 100000
    }
  }
},
    headers: { "Content-Type": "application/json" }
};
 var options_auth = { user: "stream_grst", password: "123" };
 var client = new Client(options_auth)

client.post("http://77.252.243.23:7070/next-app/services/rest/sal/orders/add", args, function (require, response) {

require = require.toString('ascii');

responseFromWs = parseString(require, function (err, result) {
  //response api pochodzi z głównego wywołani - długo rozminiałem jak posłać id w zwrotce
  responseApi.send(result.OrdersWebServiceAddResponse.idOrder)
//  console.log(responseFromWs)
//console.log(result.OrdersWebServiceAddResponse.idOrder);

});


});



});










module.exports = router;