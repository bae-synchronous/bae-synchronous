// this is not in use right now
var coordinates = require('./coordinates');

function requestHandler(req,res){
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var category = req.body.category;
  var duration = req.body.duration;

  coordinates.getPlacesForAddresses(address1, address2, duration, category)
    .then(function(places) {
      res.send(places);
    });
}

module.exports = requestHandler;
}