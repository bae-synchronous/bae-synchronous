var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestHandler = require('./server/request_handler.js');

app.set('port', (process.env.PORT || 8000));

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  console.log(req.body);
    // coordinates.requestHandler(req,res);
    // sheryl.requestHandler(req,res);
    // res.send('but we has no data!!!');
});

app.post('/places', function(req, res) {
  requestHandler(req, res);
});

app.listen(app.get('port'), function () {
    console.log('bae-synchronous is running on port ', app.get('port'));
});
