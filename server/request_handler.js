var coordinates = require('./coordinates');
var validCategoryListings = require('./validCategoryListings.js');

/////// TODO: move testing code to a test file
// uncomment below, and run this file to see the back end in action
// without requiring a request from the client
//////for testing..
 //  var req = { body: {}};
//   req.body.address1 = '50 Murray Street, Pyrmont';
//   req.body.address2 = '37 Pyrmont Street, Pyrmont';
//   req.body.category = 'gym';
//   req.body.maxTime = 2;

// var response = getListingResults(sampleRequest);
// console.log('response: ', response);
/////
//// end end for testing..

function getListingResults(req){

  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var category = req.body.category;
  var maxTime  = req.body.maxTime;

  return coordinates.getPlacesFromThirdPoint(address1, address2, category, maxTime)
    .then(function(results){

      // console.log(results.categoryListings.length, '\n\n calling validCategoryListings with results from getPlacesFromThirdPoint \n');
      console.log('\n\n', results.categoryListings.length, ' possible categoryListings, from getPlacesFromThirdPoint\n');
      return validCategoryListings.getValidCategoryListings(results);
    })
    .then(function(results){
      console.log('\n\n', results.categoryListings.length, ' validCategoryListings: ' +
                  ' -- Returning To Client! --\n\n');//, results);
      // return Promise.resolve(results);
      return results;
    })
    .catch(function(caught){
      console.log('\ncatch getListingResults in request_handler.js', caught);
    });

}

function requestHandler(req,res){
  // response = getListingResults(address1, adress2, category, maxTime);
  getListingResults(req)
    .then(function(listingData){
      console.log('\n\n---requestHandler, sending getListingResults data back to client:---\n', listingData);
      res.send(listingData);
    });
}

module.exports = requestHandler;


