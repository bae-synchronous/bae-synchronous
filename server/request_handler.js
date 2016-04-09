// this is not in use right now
var coordinates = require('./coordinates');

function requestHandler(req,res){
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var category = req.body.category;
  var duration = req.body.maxTime;

  // coordinates.getPlacesFromThirdPoint(address1, address2, category,duration)
  //   .then(function(response) {
  //       console.log('final response');
  //       res.send(response);
  //   });

  var data = require(./dummyData/data_we_return_to_client.js’);
  response = data;
  res.send(response);
}

module.exports = requestHandler;
