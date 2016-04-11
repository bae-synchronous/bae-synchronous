// this is not in use right now
var coordinates = require('./coordinates');
var validCategoryListings = require('./validCategoryListings.js');

/////// uncomment below, and run this file to see the back end in action
// without requiring a request from the client
//////for testing..
// var sampleRequest = {
//   address1: '50 Murray Street, Pyrmont',
//   address2: '37 Pyrmont Street, Pyrmont',
//   category: 'gym',
//   maxTime : 2
// }

// var response = getListingResults(sampleRequest);
// console.log('response: ', response);
/////
//// end end for testing..

function getListingResults(req){

  // if (!sampleRequest) {
  // // comment out or use above line if testing
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var category = req.body.category;
  var maxTime  = req.body.maxTime;
  // }  testMode check: if !sampleRequest

  // use this line for TESTING
  // return coordinates.getPlacesFromThirdPoint(req.address1, req.address2, req.category, req.maxTime)
  // Use This Line for LIVE
  return coordinates.getPlacesFromThirdPoint(address1, address2, category, maxTime)
    .then(function(results){

      // console.log('\n\nSH return getLPlacesFromThirdPoint results: \n', results);
      // console.log(results.categoryListings.length, '\n\n calling validCategoryListings with results from getPlacesFromThirdPoint \n');
      console.log('\n\n', results.categoryListings.length, ' possible categoryListings, from getPlacesFromThirdPoint\n');
      return validCategoryListings.getValidCategoryListings(results);
    })
    .then(function(results){
      console.log('\n\n', results.categoryListings.length, ' validCategoryListings: ' +
                  ' -- Returning This To Client! --\n\n', results);

      // return Promise.resolve(results);
      return results;
    })
    .catch(function(caught){
      console.log('\ncatch getListingResults in request_handler.js\n', caught);
      // return 'catch getListingResults in request_handler.js';
    });

}

function requestHandler(req,res){
  // response = getListingResults(address1, adress2, category, maxTime);
  console.log(req.body, res);
  getListingResults(req)
    .then(function(listingData){
      console.log('\n\nin requestHandler, sending getListingResults data back to client: \n', listingData);
      res.send(listingData);
    });

  //console.log('\n\nin requestHandler, getListingResults response: \n', response);
  // var data = require('./dummyData/data_we_return_to_client.js');
  // response = response || data;
}
///

  // var data = require('./dummyData/data_we_return_to_client.js');
  // response = response || data;

  // console.log('\n\n---final response: \n', response);
// }

  // coordinates.getPlacesFromThirdPoint(address1, address2, category,duration)
  //   .then(function(response) {
  //       console.log('final response');
  //       res.send(response);
  //   });


module.exports = requestHandler;


