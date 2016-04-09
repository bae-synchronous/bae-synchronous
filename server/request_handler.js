// this is not in use right now
var coordinates = require('./coordinates');

function requestHandler(req,res){

  coordinates.makeAPICalls(req)
    .then(function(response) {
        console.log('All API calls were successful. Sending response to client!');
        res.send(response);
    });
}

module.exports = requestHandler;
