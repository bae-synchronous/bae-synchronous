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
      // would like to store radius here, as it's used in conjuction with thirdPoint
    },
    category: category,
    // could make sense to store radius along with thirdPoint's oordinates, as they are related
    radius: radius,
    maxTime: duration,
    categoryListings: []
  };
}

// rename to createCategoryListings() ??
function formatResponse(places){
  // console.log('in formatResponse places[0]: ', places[0]);
  var categoryListings = [];
  // console.log('-------places-----\n', places);
  // console.log('\n-------places in helper2.js formatResponse() end -----\n');

  _.each(places, function(place){
    // create a new categoryListingObject for our response.categoryListings object
    var categoryListing = cLO.newCategoryListingObject();

    // console.log(ourResponseObj.address, place.vicinity);
    console.log('\nhelper2.js formatResponse, place: ', place, '\n\n');
    categoryListing.coordinates = place.geometry.location;
    categoryListing.place_id = place.place_id;
    categoryListing.address = place.vicinity;
    categoryListings.rating = place.rating;
    categoryListings.name = place.name;
    console.log('---name', place.name);

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
