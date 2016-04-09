var axios = require('axios');
var dummy = require('./dummyData/data_we_return_to_client');
var getThirdPoint = require('./thirdPoint').getThirdPoint;
var helper = require('./helper');
var log = require('./helper').log;
var _ = require('underscore');
var API_KEY = require('./config');
var dummyPlaces = require('./dummyData').categoryListing;

dummy = JSON.parse(dummy);

var dummyReq = {
    body: {
      address1:'50 Murray Street, Pyrmont',
      address2: '37 Pyrmont Street, Pyrmont',
      category: 'gym',
      duration: 20
    }
};

// console.log('original',dummy.categoryListings);
// console.log(helper.filterByMaxTime(dummy.categoryListings,10));

// addCommuteTimesToListings(dummy.address1,dummy.address2,dummyPlaces);
// makeAPICalls(dummyReq);

// retreives geographic coordinates for an address
function getCoordinates(address){
  address = helper.replaceEmptySpaces(address);

  return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: API_KEY[1]
      }
    })
    .then(function (response) {
      var coordinatesObj = response.data.results[0].geometry.location;
      return coordinatesObj;
    })
    .catch(function (response) {
      console.log('error',response);
      return 'enter a valid address';
    });
}

// this chains getCoordinates promises
function getCoordinatesForEachAddress(address1,address2){

    var promises = [getCoordinates(address1), getCoordinates(address2)];

    return axios.all(promises)
      .then(axios.spread(function (coordinatesObj1, coordinatesObj2) {
        log.coordinatesStatus();
        var thirdPoint = getThirdPoint(coordinatesObj1,coordinatesObj2);
        return {
          thirdPoint: thirdPoint,
          coordinatesObj1: coordinatesObj1,
          coordinatesObj2: coordinatesObj2
        };
      }));
}

// requests a list of "places" using a geographic coodinates, a type ('gym'), and radius
// and a type (e.g. "gym") within a radius (measured in meters)
//TODO fix error error catch, places { [Error: socket hang up] code: 'ECONNRESET' }
function getPlaces(coordinates,radius,type,name){

    coordinates = (typeof coordinates !== 'string')? helper.stringifyCoordinates(coordinates): coordinates;

    return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: coordinates,
        radius: radius,
        type: type,
        // name: name, // filtering results by name is possible via this parameter
        key: API_KEY[1]
      }
    })
    .then(function (response) {
      var places = response.data.results;
      log.placesStatus(places);
      return places;
    })
    .catch(function (response) {
      console.log('error catch, places',response);
    });
}

// origins will be address1 & address2
// destinations will be each "place"
function getCommuteDuration(origins,destinations){

    return axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        units: 'imperial',
        origins: origins,
        destinations: destinations,
        key: API_KEY[2]
      }
    })
    .then(function (response) {
      var commutes = response.data;
      return commutes;
    })
    .catch(function (response) {
      console.log('error',response);
    });
}

function addCommuteTimesToListings(address1,address2,places){
  var destinations = helper.createDestinationsString(places);
  var origins = helper.createOriginsString(address1.coordinates, address2.coordinates);

  return getCommuteDuration(origins,destinations).then(function(commutes){
    log.commutesStatus();
    helper.addCommuteTimesToEachListing(places,commutes);
    return places;
  });
}

//TODO write catch for promises
function makeAPICalls(request) {

  var response = helper.constructResponseObj(request);

  return new Promise(function(resolve, reject) {
    var address1 = response.address1.address, address2 = response.address2.address;
    getCoordinatesForEachAddress(address1, address2).then(function(resp) {

      response.address1.coordinates = resp.coordinatesObj1;
      response.address2.coordinates = resp.coordinatesObj2;
      response.thirdPoint.coordinates = thirdPoint = resp.thirdPoint;

      getPlaces(thirdPoint, response.radius, response.category).then(function(places) {
          addCommuteTimesToListings(response.address1,response.address2,places)
          .then(function(places){
            response.categoryListings = helper.filterByMaxTime(places, +request.body.maxTime);
            response = helper.formatResponse(response);
            resolve(response);

          }).catch(function(error){
            console.log('error',error);
          });
      });
    });
  });
}

module.exports = {
  getCoordinates: getCoordinates,
  getCoordinatesForEachAddress: getCoordinatesForEachAddress,
  getPlaces: getPlaces,
  makeAPICalls: makeAPICalls
};
