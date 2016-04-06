var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var requestHandler = require('./server/request_handler.js');
var dummyData = require('./server/dummyData/data_we_return_to_client');

app.set('port', (process.env.PORT || 8000));

app.use(express.static('public'));
app.use(bodyParser.json());

console.log(dummyData);

app.post('/', function(req, res) {

});

app.post('/places', function(req, res) {
  // requestHandler(req, res);
  // res.writeHead(200, {'Content-Type': 'application/JSON'});
  dummyData = JSON.stringify(dummyData);
  // console.log(dummyData);
  res.send(dummyData);
});

app.listen(app.get('port'), function () {
    console.log('bae-synchronous is running on port ', app.get('port'));
});
