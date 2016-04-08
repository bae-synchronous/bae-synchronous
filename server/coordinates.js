var axios = require('axios');
var dummy = require('./dummyData/data_we_return_to_client');
var getThirdPoint = require('./thirdPoint').getThirdPoint;
var helper = require('./helper');
var _ = require('underscore');

var API_KEY ='AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ';

// retreives geographic coordinates for an address
function getCoordinates(address){
  address = helper.replaceEmptySpaces(address);

  return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: API_KEY
      }
    })
    .then(function (response) {
      var coordinatesObj = response.data.results[0].geometry.location;
      // console.log(coordinatesObj);
      return coordinatesObj;
    })
    .catch(function (response) {
      console.log('error',response);
      return 'enter a valid address';
    });
}

// requests a list of "places" based on coordinates (in this case, the "third point")
// and a type (e.g. "gym") within a radius (measured in meters)
function getPlaces(coordinates,radius,type,name){

    coordinates = (typeof coordinates !== 'string')? helper.stringifyCoordinates(coordinates): coordinates;

    return axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: coordinates,
        radius: radius,
        type: type,
        // name: name, // filtering results by name is possible via this parameter
        key: 'AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ'
      }
    })
    .then(function (response) {
      var places = response.data.results;
      // console.log(places)
      return places;
    })
    .catch(function (response) {

      //TODO fix error error catch, places { [Error: socket hang up] code: 'ECONNRESET' }
      console.log('error catch, places',response);
    });
}

// this chains all of the functions below
var getCoordinatesForEachAddress = function (address1,address2){

    var promises = [getCoordinates(address1), getCoordinates(address2)];

    return axios.all(promises)
      .then(axios.spread(function (coordinatesObj1, coordinatesObj2) {
        var thirdPoint = getThirdPoint(coordinatesObj1,coordinatesObj2);
        return {
          thirdPoint: thirdPoint,
          coordinatesObj1: coordinatesObj1,
          coordinatesObj2: coordinatesObj2
        };
      }));
};

//TODO write catch for promises
function getPlacesFromThirdPoint(address1, address2, category,duration) {
  var radius = 500;
  var response = {
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

  return new Promise(function(resolve, reject) {
    getCoordinatesForEachAddress(address1, address2).then(function(resp) {

      response.address1.coordinates = resp.coordinatesObj1;
      response.address2.coordinates = resp.coordinatesObj2;
      response.thirdPoint.coordinates = thirdPoint = resp.thirdPoint;

      // console.log('thirdPoint:',thirdPoint);

      getPlaces(thirdPoint, radius, category).then(function(places) {
        console.log('getPlaces worked... number of places = ', places.length);
          addCommuteTimes(places).then(function(places){
            console.log('addCommuteTimes worked');
            response.categoryListings = places;
            resolve(response);

          }).catch(function(error){
            console.log('error',error)
          })          
      });
    });
  });
}

function getCommuteTime(origins,destinations){
    // origins will be address1 & address2
    // destinations will be each "place"
    origins = origins || "-33.870353,151.197892|-33.8676109,151.1937712"; // this is address1
    destinations = destinations ||"-33.8676109,151.1937712|-33.87229689999999,151.1979047"; // this is address2

    return axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        units: 'imperial',
        origins: origins,
        destinations: destinations,
        key: 'AIzaSyD-vG8sAwH0fpsObvWxWoSou2LJe-ZbV1s'
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


function extendPlacesObject(places){
  var origins = helper.createOriginsString(dummy.address1.coordinates, dummy.address2.coordinates);      
  var destinations = helper.createDestinationsString(places);
  
  return getCommuteTime(origins,destinations).then(function(commutes){
    addCommuteTimesToListing(places,commutes);
    return places;
  });
}


function addCommuteTimesToListing(places,commutes){

  _.each(places,function(place,idx){
    var commuteProps = {
      fromAddress1: commutes.rows[0].elements[idx].duration.text,
      fromAddress2: commutes.rows[1].elements[idx].duration.text
    };
    _.extend(place,commuteProps);
  });

  return places;
}

function addCommuteTimes(places){
  var destinations = helper.createDestinationsString(places);
  var origins = helper.createOriginsString(dummy.address1.coordinates, dummy.address2.coordinates);      
  
  return getCommuteTime(origins,destinations).then(function(commutes){
    addCommuteTimesToListing(places,commutes);
    return places; 
  }); 
}

module.exports = {
  getCoordinates: getCoordinates,
  getCoordinatesForEachAddress: getCoordinatesForEachAddress,
  getPlaces: getPlaces,
  getPlacesFromThirdPoint: getPlacesFromThirdPoint
};
