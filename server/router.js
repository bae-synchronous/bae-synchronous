var express = require('express');
var bodyParser = require('body-parser');
<<<<<<< 6c31c5896c27188eaec8c7ec68298baf14b6afb5
var app = express();
var requestHandler = require('./requst_handler.js');
var sheryl = require('./sheryl.js');
=======
// var requestHandler = require('./requst_handler.js');

var results = require('./dummyData/data_we_return_to_client');


var app = express();
//var sheryl = require('./validCategoryLisings.js');
// Updated router.js to call request handler from different file and
// export request handler function from request_handler.js
>>>>>>> update server router to return dummyData to client. remove file references

app.use(bodyParser.json());

app.post('/', function(req, res) {
    //requestHandler(req,res);
    //sheryl.requestHandler(req,res);
    //res.send('but we has no data!!!');
    res.results = results;
});
