const conf = require("../conf");
var host = conf.host;
 host = host + "/next-app/services/rest";


var express = require('express');
var router = express.Router();
var Model = require('../models/article.js')
var parseString = require('xml2js').parseString;
var parser = require('xml2js');
var Client = require('node-rest-client').Client;

var xml = require('xml');

 const options_auth = { user: "stream_grst", password: "123" };
 const client = new Client(options_auth)



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


var addOrderService = host + "/sal/orders/add";
var reqSaleOrderAdd = client.post("http://77.252.243.23:7070/next-app/services/rest/sal/orders/add", args, function (require, response) {

require = require.toString('ascii');

responseFromWs = parseString(require, function (err, result) {
  //response api pochodzi z głównego wywołani - długo rozminiałem jak posłać id w zwrotce
  responseApi.json(result.OrdersWebServiceAddResponse.idOrder)
//  console.log(responseFromWs)
//console.log(result.OrdersWebServiceAddResponse.idOrder);

});




});

//obsługa wyjątków
reqSaleOrderAdd.on('error', function (err) {
    console.log('request error', err);
});
reqSaleOrderAdd.on('requestTimeout', function (request) {
    console.log('request has expired');
    request.abort();
});
 
reqSaleOrderAdd.on('responseTimeout', function (response) {
    console.log('response has expired');
 
});




});



router.get('/sendOrderItems', function (require, response) {

 // console.log(require);
args = {
 data: { "orderItemAddData": {
    "idOrder": 118400,
    "articleId": {
      "idArticle": 115200
    },
    "quantity": "5",
    "priceBeforeAllowance": "5"
   }
 },
   headers: { "Content-Type": "application/json" }
    }
client.post("http://77.252.243.23:7070/next-app/services/rest/sal/ordersItems/add", args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});
})
module.exports = router;