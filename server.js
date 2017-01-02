const PORT = 3000 || process.env.PORT;
//const DB = "mongodb://localhost/articles";

const conf = require("./conf");
const DB = conf.localdb;
var host = conf.host;
 host = host + "/next-app/services/rest";

var express = require('express')

var parseString = require('xml2js').parseString;
var path = require('path');
var mongoose = require('mongoose');
var stringfy = require('node-stringify');
var Client = require('node-rest-client').Client;
//var bodyParser = require('body-parser');
var Model = require('./models/article.js')



//engine server
var app = express();
//app.use(morgan('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended : true}));

//routing

var mainRouter = require('./routes/index');
var apiRouter = require('./routes/api');
app.use('/', mainRouter);
app.use('/api', apiRouter)

//db connect
mongoose.connect(DB, function(err){
  if(err){
    return err;
  }else{
    console.log("Successfully connected to "+DB);
  }
});

//view engine
app.set('views', __dirname +'/client');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//set static folder
app.use(express.static(path.join(__dirname,'client')));





//    POBIERAM KARTOTEKI Z WEBSERVICE I WRZUCAM DO LOKALNEJ BAZY,
//    DOCELOWO ODBYWAĆ SIĘ TO MA CYKLICZNIE I USTAWIANE BĘDĄ PARAMETRY
var args = {
    data: {
  "from": "2015-05-03T14:23:01",
  "to": "2017-05-03T14:23:01",
  "warehouseIdList": [
    {
      "idWarehouse": 100000
    }
  ]
    },
    headers: { "Content-Type": "application/json" }
};
var options_auth = { user: "stream_grst", password: "123" };
var client = new Client(options_auth);
var x ={};

var articlesFindModifiedService = host + "/whm/articlesStocks/findModified";



client.post(articlesFindModifiedService, args, function (require, response) {
x = require.toString('ascii');

parseString(x, function (err, result) {


 allAboutArticle = result.ArticlesStocksWebServiceFindModifiedResponse.articleStockDataList;
//console.log(allAboutArticle[0].nonReservedAvaliableStock)

for(var i=0;i<100;i++){
    var article = new Model({
        id :allAboutArticle[i].articleId[0].idArticle[0],
       index :allAboutArticle[i].articleId[0].index[0],
       avaliableStock : Number(allAboutArticle[i].nonReservedAvaliableStock)
  });
   article.save(function(err, resource){
    if(err){
    //  response.send(err).status(501);
      console.log(err);
    }else{
     // response.json(resource).status(201);
    }
  });
}
});
///////////////////////


});



app.listen(PORT, function(){
  console.log('Listening on port: '+ PORT);
});





/*
client.post("http://77.252.243.23:7070/next-app/services/rest/cmm/articles/findModified", args, function (require, response) {

x = JSON.stringify(xml.parseString(require.toString('utf8')),null,' ');
require = JSON.stringify(xml.parseString(require.toString('utf8'),"articleId"),null,' ');
var y = eval ("("+x+")")
x = xml.parseBuffer(require)
x = xml.parseString(require.toString('utf8'))
console.log(x)
console.log(x.childs[2].childs[0].childs[0].childs)
parser = new DOMParser();
x = require.toString('ascii');
xmlDoc = parser.parseFromString(x,"text/xml");
console.log(xmlDoc)

parseString(x, function (err, result) {
    console.dir(result.ArticlesWebServiceFindModifiedResponse.articleDataList);
});

var y = JSON.parse(x);
console.log(x)
});
console.assert(articles);
console.log(data);
console.log(stringify(123));

console.log(articles);

parseString(articles, function (err, result) {
  articles.stringify(articles)
    if(err){
        throw err
    }
    console.log(result);
});*/
