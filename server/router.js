var express = require('express');
var bodyParser = require('body-parser');


var app = express();
// var sheryl = require('./validCategoryLisings.js');
// Updated router.js to call request handler from different file and
// export request handler function from request_handler.js

app.use(bodyParser.json());

// app.post('/', function(req, res) {
//     requestHandler(req,res);
//     sheryl.requestHandler(req,res);
//     res.send('but we has no data!!!');
// });
