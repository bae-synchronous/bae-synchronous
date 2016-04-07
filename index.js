var express = require('express');
var bodyParser = require('body-parser');
var requestHandler = require('./server/request_handler.js');
var dummyData = require('./server/dummyData/data_we_return_to_client');


var app = express();
app.set('port', (process.env.PORT || 8000));
app.use(express.static('public'));
app.use(bodyParser.json());

console.log(dummyData);

app.post('/', function(req, res) {

});

app.post('/places', function(req, res) {
console.log('request made to /places');
requestHandler(req, res);
  // dummyData = JSON.stringify(dummyData)  
  // res.send(dummyData);
});

app.listen(app.get('port'), function () {
    console.log('bae-synchronous is running on port ', app.get('port'));
});

// var test = require('./server/validCategoryListings');
// test.getValidCategoryListings();