// please rename cLO !
var cLO = require('./categoryListingObject.js');
var _ = require('underscore');

// move to categoryListingsObject.js ?
function constructResponseObj(req){
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var category = req.body.category;
  var duration = req.body.duration;

  // this should be set via it's own function
  // or perhaps within getThirdPoint
  // radius could be dependant on maxTime, address1, address2
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
      // TODO: would like to store radius here, as it's used in conjuction with thirdPoint
    },
    category: category,
    // TODO: could make sense to move radius into thirdPoint's object, as they are used together
    radius: radius,
    maxTime: duration,
    categoryListings: []
  };
}

// TODO: ok rename to createCategoryListings() or getCategoryListings() ??
function formatResponse(places){
  var categoryListings = [];

  _.each(places, function(place){

    // create a new categoryListingObject for our response.categoryListings object
    var categoryListing = cLO.newCategoryListingObject();

    categoryListing.coordinates = place.geometry.location;
    categoryListing.place_id = place.place_id;
    categoryListing.address = place.vicinity;
    categoryListing.rating = place.rating;
    categoryListing.name = place.name;

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
