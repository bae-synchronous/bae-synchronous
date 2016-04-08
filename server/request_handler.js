// this is not in use right now
var coordinates = require('./coordinates');

function requestHandler(req,res){

  coordinates.makeAPICalls(req)
    .then(function(response) {
        console.log('API calls went through!');
        res.send(response);
    });
}

module.exports = requestHandler;
