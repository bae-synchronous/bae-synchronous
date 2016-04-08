var _ = require('underscore');
// coordinates need to be converted to a string for Google API 'GET' request
function stringifyCoordinates(coordinatesObj){
  var lat = coordinatesObj.lat;
  var lng = coordinatesObj.lng;
  return lat + ',' + lng;
}

// addresses appended to URL for API call needs to replace its empty spaces with a plus '+'
function replaceEmptySpaces(address){
  return address.replace(/ /g, '+');
}

function createOriginsString(address1,address2){
  return stringifyCoordinates(address1) + '|' + stringifyCoordinates(address2);
}

function createDestinationsString(places){
  return places.map(function(place){
    return stringifyCoordinates(place.geometry.location);
  }).join('|'); 
}


function filterByMaxTime(categoryListings,maxTime){
  return _.filter(categoryListings, function(place){
    return place.timeFromAddress1 <= maxTime && place.timeFromAddress2 <= maxTime;
  });
}

function secondsToMinutes(val){
  return val / 60;
}

function addCommuteTimesToEachListing(places,commutes){

  _.each(places,function(place,idx){
    var commuteProps = {
      timeFromAddress1: Math.round(secondsToMinutes(commutes.rows[0].elements[idx].duration.value)),
      timeFromAddress2: Math.round(secondsToMinutes(commutes.rows[1].elements[idx].duration.value))
    };
    _.extend(place,commuteProps);
  });

  return places;
}

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

function formatResponse(response){
  _.each(response.categoryListings,function(place){
    place.address = place.vicinity;
    place.coordinates = place.geometry.location;
  });
  return response;
}

module.exports = {
  replaceEmptySpaces: replaceEmptySpaces,
  stringifyCoordinates: stringifyCoordinates,
  createOriginsString: createOriginsString,
  createDestinationsString: createDestinationsString,
  filterByMaxTime: filterByMaxTime,
  constructResponseObj: constructResponseObj,
  formatResponse: formatResponse,
  addCommuteTimesToEachListing: addCommuteTimesToEachListing,
  log: Log
};
