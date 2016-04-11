var axios = require('axios');

var initializeResultsObject = require('./categoryListingObject').initializeResultsObject;
var getThirdPoint = require('./thirdPoint').getThirdPoint;
var getRadius = require('./thirdPoint').getRadius;
var helper2 = require('./helper2');
var helper = require('./helper');

//  TODO: move testing code into a testing file
/////
// var dummy = require('./dummyData/data_we_return_to_client');
//testing This File Only
// var fromSteve = getPlacesFromThirdPoint('50 Murray Street, Pyrmont',
//                                         '37 Pyrmont Street, Pyrmont',
//                                         'gym',
//                                         30);
// console.log('results from Steve:\n\n', fromSteve);
/////


// retreives geographic coordinates for an address
function getCoordinates(address){
  address = helper.replaceEmptySpaces(address);
  console.log("API key line 26 coordinates.js", "STEVE_KEY", process.env.STEVE_KEY);
  return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.STEVE_KEY
      }
    })
    .then(function (response) {
      var coordinatesObj = response.data.results[0].geometry.location;
      return coordinatesObj;
    })
    .catch(function (response) {
      console.log('catch error in coordinates.js, getGoordinates(): ',response);
      // return 'enter a valid address';
    });
}

// requests a list of "type" (ie gym, etc) places based on
// coordinates of "thirdPoint", that are within a radius (meters) away
function getPlaces(coordinates,radius,type, name){

  coordinates = (typeof coordinates !== 'string')? helper.stringifyCoordinates(coordinates): coordinates;

  return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
    params: {
      location: coordinates,
      radius: radius,
      type: type,
      // name: name, // filtering results by name is possible via this parameter
      key: process.env.STEVE_KEY
    }
  })
  .then(function (response) {
    var places = response.data.results;
    // console.log('places: ', places)
    return places;
  })
  .catch(function (response) {
    //TODO fix error error catch, places { [Error: socket hang up] code: 'ECONNRESET' }
    console.log('error in catch, getPlaces, coordinates.js: ', response);
  });
}

// this chains all of the functions below
function getCoordinatesForEachAddress(address1,address2){

  var promises = [getCoordinates(address1), getCoordinates(address2)];

  return axios.all(promises)
    .then(axios.spread(function (coordinatesObj1, coordinatesObj2) {
      var thirdPoint = getThirdPoint(coordinatesObj1,coordinatesObj2);
      return {
        thirdPoint: thirdPoint,
        coordinatesObj1: coordinatesObj1,
        coordinatesObj2: coordinatesObj2
      };
    }))
    .catch(function(err){
      console.log('error in server/coordingates.js getCoordinatesForEachAddress: ', err, promises);
      // return 'could not get all three sets of coordinates';
    });
}

//TODO write catch for promises
function getPlacesFromThirdPoint(address1, address2, category, maxTime) {

  // TODO: move call to initializeResultsObject outside, before this funciton if possible
  var response = initializeResultsObject(address1, address2, category, maxTime);
  var radius = getRadius(address1, address2, maxTime);
  response.radius = radius;

  return new Promise(function(resolve, reject) {
    // console.log('going to getCoordinatesForEachAddress..');
    getCoordinatesForEachAddress(address1, address2)
    .then(function(resp) {

      response.address1.coordinates = resp.coordinatesObj1;
      response.address2.coordinates = resp.coordinatesObj2;
      response.thirdPoint.coordinates = thirdPoint = resp.thirdPoint;

      // this .then is attached to getPlaces, nested inside the other then
      // TODO: refactor possible, or not ??
      getPlaces(thirdPoint, radius, category)
      .then(function(places) {
          // TODO: perhaps rename formatResponse to createCategoryListings() ??
          response.categoryListings = helper2.formatResponse(places);
          // console.log('created categoryListings !\n\n', response.categoryListings);
          resolve(response);
      });
    })
    .catch(function(caught){
      console.log('could not getPlacesFromThirdPoint in coordinates.js: ', caught);
    });
  });
}

module.exports = {
  getCoordinates: getCoordinates,
  getCoordinatesForEachAddress: getCoordinatesForEachAddress,
  getPlaces: getPlaces,
  getPlacesFromThirdPoint: getPlacesFromThirdPoint
};
