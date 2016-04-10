// please rename cLO !
var cLO = require('./categoryListingObject.js');
var _ = require('underscore');

function constructResponseObj(req){
  var address1 = req.body.address1, address2 = req.body.address2, category = req.body.category, duration = req.body.duration;
    var radius = 500;
    return {
      address1: {
        address: address1
      },
      address2: {
        address: address2
      },
      thirdPoint: {
        address: ''
      },
      category: category,
      radius: radius,
      maxTime: duration,
      categoryListings: []
    };
}

// rename to createCategoryListings() ??
function formatResponse(places){
  // console.log('in formatResponse places[0]: ', places[0]);
  var categoryListings = [];

  _.each(places, function(place){
    // create a new categoryListingObject for our response.categoryListings object
    var categoryListing = cLO.newCategoryListingObject();

    // console.log(ourResponseObj.address, place.vicinity);
    categoryListing.address = place.vicinity;
    categoryListing.coordinates = place.geometry.location;
    categoryListings.rating = place.rating;
    categoryListing.place_id = place.place_id;

    // console.log('\n\nnew categoryListing Ready: \n\n', categoryListing);
    categoryListings.push(categoryListing);
  });

  // console.log('\n\nCATEGORY LISTINGS: \n', categoryListings);
  return categoryListings;
}

var Log = (function(){
  return {
    commutesStatus: function(){
      console.log('Commute times have been added to listings...');
    },
    placesStatus: function(places){
      console.log('Listings generated from Google Places API.', places.length, 'listings match user criteria.');
    },
    coordinatesStatus: function(){
      console.log('Coordinates received for both addresses');
    }
  };
})();
module.exports = {
  constructResponseObj: constructResponseObj,
  formatResponse: formatResponse,
  Log: Log
};
