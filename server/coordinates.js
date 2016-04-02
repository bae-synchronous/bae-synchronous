var axios = require('axios');

var dummyJSON = require('./dummyJSON.js');
var API_KEY ='AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ';

// this is all of the dummy data
var dummyAddress = '1600+Amphitheatre+Parkway,+Mountain+View,+CA';
var dummyAddress2 = 'Mountain+View+High+School,+Truman+Avenue,+Mountain+View,+CA,+United States';
var dummyCoordinates = '-33.8670522,151.1957362';
var dummyCoordinatesObj = { lat: 37.4224497, lng: -122.0840329 };
var dummyRadius = '500';
var dummyType = 'restaurant';
var dummyName = 'cruise';
var dummyCoordinatesObj1 = { lat: 37.4224497, lng: -122.0840329 };
var dummyCoordinatesObj2 = { lat: 25.4224497, lng: -121.0840329 };


// this function will be used to process the request
function requestHandler(req,res){
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var category = req.body.category;
}

// this function will obtain coordinates for two addresses
var getCoordinatesForEachAddress = function (address1,address2){

    var promises = [getCoordinates(address1), getCoordinates(address2)];
    
    axios.all(promises)
      .then(axios.spread(function (coordinatesObj1, coordinatesObj2) {      
      
        var thirdPoint = getThirdPoint(coordinatesObj1,coordinatesObj2);
        thirdPoint = convertCoordinatesToString(thirdPoint);
      
        return getPlaces(thirdPoint);
      
      })).then(function(places){
        console.log('This will return an array of ',places);
      });
};

// coordinates need to be a string in order to append it to a URL
function convertCoordinatesToString(coordinatesObj){
  var lat = coordinatesObj.lat;
  var lng = coordinatesObj.lng;
  return lat + ',' + lng;
}

// uses the midpoing formula to calculate a third point
function getThirdPoint (coordinatesObj1, coordinatesObj2) {
  
  var thirdPoint = {};
  coordinatesObj1 = coordinatesObj1 || dummyCoordinatesObj1;
  coordinatesObj2 = coordinatesObj2 || dummyCoordinatesObj2;
  
  thirdPoint.lat = ((coordinatesObj1.lat + coordinatesObj2.lat)/2);
  thirdPoint.lng = ((coordinatesObj1.lng + coordinatesObj2.lng)/2);
  return thirdPoint;
}

function getCoordinates(address){
  
  address = address || dummyAddress2;
  
  return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: API_KEY
      }
    })
    .then(function (response) {
      var coordinatesObj = response.data.results[0].geometry.location;       
      return coordinatesObj;
    })
    .catch(function (response) {
      console.log('error',response);
    });
}

// requests a list of "places" based on coordinates (in this case, the "third point")
// and a type (e.g. "gym") within a radius (measured in meters)
function getPlaces(coordinates,radius,type,name){

  coordinates = coordinates || dummyCoordinates;
  coordinates = '31.4224497,-121.5840329';
  radius = radius || dummyRadius;
  type = type || dummyType;
  name = name || dummyName;

  axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: coordinates,
        radius: radius,
        type: type,
        // name: name,
        key: API_KEY
      }
    })
    .then(function (response) {
      var places = response.data.results;
      console.log('places',places);
      return places;
    })
    .catch(function (response) {
      console.log('error catch, places',response);
    });
}

module.exports = {
  getCoordinates: getCoordinates,
  requestHandler: requestHandler,
  getPlaces: getPlaces
};

// getCoordinatesForEachAddress(dummyAddress,dummyAddress2)
// getCoordinates();
// getPlaces();
// getThirdPoint(dummyCoordinatesObj1,dummyCoordinatesObj2);

