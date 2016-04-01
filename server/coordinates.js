var axios = require('axios');

var API_KEY ='AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ';

// address1
// address2
// search term: "gym"
// filter: 100minutes

// take an address and convert it 
function requestHandler(req,res){
  var address1 = req.body.address1;
  var address1 = req.body.address1;
  var category = req.body.category;
  var duration = req.body.duration;
  // getCoordinates();
}

// { lat: 37.4224497, lng: -122.0840329 }

function convertCoordinatesToString(coordinatesObj){
  var lat = coordinatesObj.lat;
  var lng = coordinatesObj.lng;
  return lat + ',' + lng;
}

var dummyAddress = '1600+Amphitheatre+Parkway,+Mountain+View,+CA'

var dummyCoordinates = '-33.8670522,151.1957362';
var dummyCoordinatesObj = { lat: 37.4224497, lng: -122.0840329 };
var dummyRadius = '500'
var dummyType = 'restaurant'
var dummyName = 'cruise'

//FUNCTIONS FOR TESTING

// getCoordinates();
// sample endpoint
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ

getPlaces();

function convertCoordinatesToString(coordinatesObj){
  var lat = coordinatesObj.lat;
  var lng = coordinatesObj.lng;
  return lat + ',' + lng;
}

function getCoordinates(address){

  address = address || dummyAddress;

  axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: API_KEY
      }
    })
    .then(function (response) {
      // response = JSON.parse(response);
      var coordinatesObj = response.data.results[0].geometry.location;
     // console.log('coordinates',coordinatesObj); //{ lat: 37.4224497, lng: -122.0840329 }
     
    })
    .catch(function (response) {
      console.log('error',response);
    });

};


function getPlaces(coordinates,radius,type,name){

  coordinates = coordinates || dummyCoordinates;
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
      console.log(places);
    })
    .catch(function (response) {
      console.log(response);
    });

}

module.exports = {
  getCoordinates: getCoordinates,
  requestHandler: requestHandler,
  getPlaces: getPlaces
};

