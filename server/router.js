var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());



app.post('/', function(req, res) {
    coordinates.requestHandler(req,res);
    sheryl.requestHandler(req,res);
    res.send('but we has no data!!!');
});
