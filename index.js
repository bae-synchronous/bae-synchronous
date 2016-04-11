var express = require('express');
var bodyParser = require('body-parser');
var requestHandler = require('./server/request_handler.js');
var dummyData = require('./server/dummyData/data_we_return_to_client');
require('dotenv').config();

var app = express();
app.set('port', (process.env.PORT || 8000));
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  //res.send(dummyData);
    console.log('\nindex.js app.post request made to "/"');//, res.data: \n', res.data);
});

app.post('/places', function(req, res) {
    console.log('index.js request made to /places');
    requestHandler(req, res);
    // console.log('\nSH index.js app.post "/places", res.data: \n', res.data);
      // dummyData = JSON.stringify(dummyData);
      // res.send(dummyData);
});

var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
    console.log('bae-synchronous is running on port ', port);
    console.log(process.env);
});

// // test validCategoryListings.js
//   var startingData = require('./server/dummyData/categoryListings_from_Steve');
//   var inputData    = startingData.categoryListings_from_Steve;

//   var sh =  require('./server/validCategoryListings.js');
//   // var results = sh.getValidCategoryListings(inputData);

//   // test callback version
//     // sh.getValidCategoryListings(inputData, functionThatNeedsMyData);

//     // function functionThatNeedsMyData(results){
//     //   console.log('--returned data---', results);
//   // }

//   // test promise version -- THIS IS NOT CORRECT -NOT SURE HOW TO TEST !!
//     // var results = sh.getValidCategoryListings(inputData);
//     // console.log('--returned data---', results);




module.exports = server;
