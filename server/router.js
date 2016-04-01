var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var coordinates = require('./coordinates.js');
var sheryl = require('./sheryl.js');

 app.use(bodyParser.json());




app.post('/', function(req, res) {
    coordinates.requestHandler(req,res);
    sheryl.requestHandler(req,res);
    res.send('but we has no data!!!');
});
