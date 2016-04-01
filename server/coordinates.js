var API_KEY ='AIzaSyAvXHQtnUPWtvPzT2M3u2VD1Pxqi7ihyfQ';

// address1
// address2
// search term: "gym"
// filter: 100minutes

var dummyAddress = '1600+Amphitheatre+Parkway,+Mountain+View,+CA'

// take an address and convert it 

function requestHandler(req,res){

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
       return response;
      })
      .catch(function (response) {
        console.log('error',response);
      });

};

//dummy data
var dummyCoordinates = '-33.8670522,151.1957362';
var dummyRadius = 500
var dummyType = 'restaurant'
var dummyName = 'cruise'


function getPlaces(coordinates,radius,type,name){

    coordinates = coordinates || dummyCoordinates;
    radius = radius || dummyCoordinates;
    type = type || dummyCoordinates;
    name = name || dummyCoordinates;


axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
    params: {
      location: coordinates,
      radius: radius,
      type: type,
      name: name,
      key: API_KEY
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (response) {
    console.log(response);
  });

  module.exports = {
    getCoordinates: getCoordinates,
    requestHandler: requestHandler,
    getPlaces: getPlaces
  }