var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 8000));

app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log('bae-synchronous is running on port ', app.get('port'));
});
