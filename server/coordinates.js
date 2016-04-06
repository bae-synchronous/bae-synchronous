var axios = require('axios');
var dummy = require('./dummyData');
var getThirdPoint = require('./thirdPoint').getThirdPoint;
var helper = require('./helper');

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
      console.log(coordinatesObj);
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

    axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
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
      console.log(places);
      // places.forEach(function(place){ console.log (place.geometry.location)});
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
        thirdPoint = helper.stringifyCoordinates(thirdPoint);
        return thirdPoint;
      }));
};

//TODO write catch for promises
function getPlacesForAddresses(address1, address2, radius, type) {
  return new Promise(function(resolve, reject) {
    getCoordinatesForEachAddress(address1, address2).then(function(thirdPoint) {
      getPlaces(thirdPoint, radius, type)
        .then(function(places) {
          resolve(places);
        });
    });
  });
}

// forTesting
// getPlaces({ lat: -33.868981950000006, lng: 151.1958316 },dummyRadius,dummyType,dummyName)
//

module.exports = {
  getCoordinates: getCoordinates,
  getCoordinatesForEachAddress: getCoordinatesForEachAddress,
  getPlaces: getPlaces,
  getPlacesForAddresses: getPlacesForAddresses
};