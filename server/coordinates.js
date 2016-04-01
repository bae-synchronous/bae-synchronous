var dummyObject = {
    address1: {
        address: '1600+Amphitheatre+Parkway,+Mountain+View,+CA'
        coordinates: {
            lat: 12312312,
            lng: 12341324
        }
    },
    address2: {
        address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
        coordinates: {
            lat: 12312312,
            lng: 12341324
        }
    },
    thirdPoint: {
        address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
        coordinates: {
            lat: 12312312,
            lng: 12341324
        }
    },
    category: 'gym',
    maxTime: 30,
    categoryListing: [
        {
            address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
            coordinates: {
                lat: 12312312,
                lng: 12341324
            },
            places_id: 1242141,
            timeFromAddress1: 12,
            timeFromAddress2: 42
        }
    ];
}

var axios = require('axios');

var API_KEY ='AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ';

// take an address and convert it 
function requestHandler(req,res){
  var address1 = req.body.address1;
  var address2 = req.body.address2;
  var category = req.body.category;
  var duration = req.body.duration;
}

var dummyAddress = '1600+Amphitheatre+Parkway,+Mountain+View,+CA';
var dummyAddress2 = 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'

var getBothCoordinates = function (address1,address2){

    var promises = [getCoordinates(address1), getCoordinates(address2)]
    
    axios.all(promises)
      .then(axios.spread(function (coordinatesObj1, coordinatesObj2) {      
        console.log('1',coordinatesObj1,'2',coordinatesObj2);
        var thirdPoint = getThirdPoint(coordinatesObj1,coordinatesObj2);
        thirdPoint = convertCoordinatesToString(thirdPoint)
        console.log('midpoint',thirdPoint);
        return getPlaces(thirdPoint)

      })).then(function(places){
        console.log(places);
      })
}

getBothCoordinates(dummyAddress,dummyAddress2)

// { lat: 37.4224497, lng: -122.0840329 }

function convertCoordinatesToString(coordinatesObj){
  var lat = coordinatesObj.lat;
  var lng = coordinatesObj.lng;
  return lat + ',' + lng;
}


var dummyCoordinates = '-33.8670522,151.1957362';
var dummyCoordinatesObj = { lat: 37.4224497, lng: -122.0840329 };
var dummyRadius = '500';
var dummyType = 'restaurant';
var dummyName = 'cruise';

//FUNCTIONS FOR TESTING
getCoordinates();
// sample endpoint
// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ

// getPlaces();

function convertCoordinatesToString(coordinatesObj){
  var lat = coordinatesObj.lat;
  var lng = coordinatesObj.lng;
  return lat + ',' + lng;
}

var dummyCoordinatesObj1 = { lat: 37.4224497, lng: -122.0840329 };
var dummyCoordinatesObj2 = { lat: 25.4224497, lng: -121.0840329 };

// currently returns a middlepoint
function getThirdPoint (coordinatesObj1, coordinatesObj2) {
  coordinatesObj1 = dummyCoordinatesObj1;
  coordinatesObj2 = dummyCoordinatesObj2;

  var thirdPoint = {};
  thirdPoint.lat = ((coordinatesObj1.lat + coordinatesObj2.lat)/2);
  thirdPoint.lng = ((coordinatesObj1.lng + coordinatesObj2.lng)/2);
  // console.log(thirdPoint);
  return thirdPoint;
}

//getThirdPoint(dummyCoordinatesObj1,dummyCoordinatesObj2);

function getCoordinates(address){

  address = address || dummyAddress2;

  return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: API_KEY
      }
    })
    .then(function (response) {
      // response = JSON.parse(response);
      var coordinatesObj = response.data.results[0].geometry.location;
     // console.log('coordinates',coordinatesObj); //{ lat: 37.4224497, lng: -122.0840329 }
     return coordinatesObj;
    })
    .catch(function (response) {
      console.log('error',response);
    });
}


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
      console.log('places',places);
      return places;
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

