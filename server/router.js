var express = require('express');
var bodyParser = require('body-parser');
var requestHandler = require('./requst_handler.js');

var app = express();
var sheryl = require('./validCategoryLisings.js');
// Updated router.js to call request handler from different file and
// export request handler function from request_handler.js
app.set('port', (process.env.PORT || 8000));

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
    requestHandler(req,res);
    sheryl.requestHandler(req,res);
    res.send('but we has no data!!!');
});

app.listen(app.get('port'), function () {
    console.log('bae-synchronous is running on port ', app.get('port'));
});
