var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var requestHandler = require('./requst_handler.js');
var sheryl = require('./sheryl.js');

app.use(bodyParser.json());

app.post('/', function(req, res) {
    requestHandler(req,res);
    sheryl.requestHandler(req,res);
    res.send('but we has no data!!!');
});
