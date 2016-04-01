var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());



//1 route
//post request to root
//req.body
app.route('/')
  .get(function(req, res) {
    res.send('look ma! A mutation!');
  })
  .post(function(req, res) {
    res.send('but we has no data!!!');
  });
app.route('/duration')
  .get(function(req, res) {
    res.send('CHYEAH');
  })
  .post(function(req, res) {
    res.send('but we has no data');
  });
app.route('/category')
  .get(function(req, res) {
    res.send('ANGULAR!!');
  })
  .post(function(req, res) {
    res.send('but we has no data');
  });
