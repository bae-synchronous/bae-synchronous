var axios = require('axios');
var helper = require('./helper');

function getThirdPoint (coordinates1, coordinates2) {
    // implements the midpoint formula to calculate a third point
    return findMidpoint(coordinates1, coordinates2);
}

function findMidpoint(coordinates1,coordinates2){
    // TODO: Optimization ideas
    // Could consider the midpoint as a car travels,
    //  as opposed to the midpoint as the crow flies between the two addresses.
    // Or the midpoint time-wise between two points, as a car travels..

    var thirdPoint = {};
    thirdPoint.lat = ((coordinates1.lat + coordinates2.lat)/2);
    thirdPoint.lng = ((coordinates1.lng + coordinates2.lng)/2);
    return thirdPoint;
}

function getRadius(address1, address2, maxTime){
  //  Current Calculation: ought to return more results than needed
  //    - distance one travel in maxTime at 60mph
  //    - plus half the distance between address1 and address2
  //  Rem: meters - radius must be reported in meters for Google API

  var MIN_TO_HOUR = maxTime / 60.0;
  var MPH_DRIVING = 60;
  var MILES_TO_METERS = 1609.34;
  var radius = 500; // meters  // default value

  getMeters_from_A_to_B(address1, address2) // asynch api call
    .then (function(distance){
      radius = (distance/2.0) + (MPH_DRIVING * MILES_TO_METERS * MIN_TO_HOUR);
      console.log ('\n------- radius ------ : ', radius);
    })

    .catch(function(error){
      console.log('catch in thirdPoint.js getMeters_from_A_to_B(address1, address2)', error);
    });
  return radius;

}

function getMeters_from_A_to_B(address1, address2){

  // GoogleMapsDistanceMatrixAPI_base uri
  var API_KEY = process.env.DISTANCE_MATRIX_API_KEY;
  var base_url = "https://maps.googleapis.com/maps/api/distancematrix/json";

  return axios.get(base_url, {
      params: {
        units:        'imperial', // only used for text values, distances are always in meters
        origins:      helper.replaceEmptySpaces(address1),
        destinations: helper.replaceEmptySpaces(address2),
        key:          API_KEY
      }
    })

  .then(function (response) {
    // grab distance data
    var distance_in_meters = response.data.rows[0].elements[0].distance.value;
    console.log('\ngoogle response from Distance call in getMeters_from_A_to_B()\n\n', response.data.rows[0].elements[0]);
    console.log('\n-------------- ' + distance_in_meters + '-------------- ' + ' @thirdPoint.js, meters_from_A_to_B()\n');
    return distance_in_meters;
  })

  .catch(function (err) {
    // TODO: check on how to properly throw an error
    console.log('error catch in getMeters_from_A_to_B: ', err);
    // return 'error catch in getGoogleCommuteData: ';
  });
}

module.exports = {
    getThirdPoint: getThirdPoint,
    findMidpoint: findMidpoint,
    getRadius: getRadius
};
