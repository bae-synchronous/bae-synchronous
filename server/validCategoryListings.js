// will probably rename this to validCategoryList.js
var axios = require('axios');
var dummyJSON = require('dummyJSON');

function requestHandler(req,res){
  module.exports = {
  requestHandler: requestHandler,
  }
}


// want these to be Global, no Window on server, dunno how to explicitly call them out

// GoogleMapsDistanceMatrixAPI_base uri
var base_url = "https://maps.googleapis.com/maps/api/distancematrix/";
// shAPIkey_googleDistanceMatrixAPI
var key = "AIzaSyAY1OTlXsTvjom2o_CQUDH1BLo8JVolp84";

/// AXIOS EXAMPLE for building query
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



// temp data, and format of contract
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


/*
Function: takes in (array of categoryLocations, address). Returns (array of {address, categoryAddress, duration})  where travelTime represents the time from address to that categoryAddress.
*/

// first add fields to categoryObjects:
  // categoryAddress: (use Google API to get addressFromCoordinates)



function
// now add addressField to arrayOfCategories
  // and populate it
// maybe: add property fields, initialized to null
  // address1
  // address2
  // durationAddress1
  // durationAddress2


function getDurations(originAddress, originNumber, categoryObjects){
  // originNumber will be either '1', or '2' - enables DRY function
    // append to "address" and "durationToAddress"
    // so that we can add correct field names to our object.

  // takes a list of objects with the following fields:
    // address(string), latlong,
    // originPropertyName will either be "address1", or "address2"
      // a string representing whether these durations ought to be stored
      //  in info pertaining to the object's addr1 field, or addr2 field

  // loop through each object in categoryAddressesArray
  // pull out the coordinates or address field (either is fine)
      // unclear if address field of categoryObjects will have a value
      // I believe the latlong coordinates fields will be.
      // at some point, ought to add the physical address fields,
        // if it's not already provided.
      // call Google __ API on (originAddress, categoryObjectCoordinates/Address)
      // pull duration field from the returned object
      // add this information (and possibly text address if avail)
        // to the categoryObject, creating "duration" field
        //  on this object.
        // add originAddress to this Object as well
        // (we may want to display )

  var 

  // GoogleDistanceMatrixAPIrequestString
  var google_req = base_url + "json?" + "units=imperial";
  google_req += "origins="

  var durToAddr = "durationToAddress" + originNumber;
  var originLatLong = addressToLatLong(originAddress);
  _.each(categoryObjects, function(categoryObject){

  }){};
https://maps.googleapis.com/maps/api/distancematrix/json?
units=imperial
&origins=40.6655101,-73.89188969999998
&destinations=40.6905615%2C-73.9976592%7C
              40.6905615%2C-73.9976592%7C
              40.6905615%2C-73.9976592%7C
              40.6905615%2C-73.9976592%7C
              40.6905615%2C-73.9976592%7C
              40.6905615%2C-73.9976592%7C
              40.659569%2C-73.933783%7C
              40.729029%2C-73.851524%7C
              40.6860072%2C-73.6334271%7C
              40.598566%2C-73.7527626%7C4
              0.659569%2C-73.933783%7C
              40.729029%2C-73.851524%7C
              40.6860072%2C-73.6334271%7C
              40.598566%2C-73.7527626
&key=YOUR_API_KEY


/* Object returned to Client will ultimately look KINDA like:
  categoryAddress:
  categoryLatLong: {lat: , long: },
  durationToAddress1:
  durationToAddress2:
  // optional:
  locationName (string ie, "24 Hour Fitness")
  yelpRating:
  // if the following items will be needed
    // those fields should be populated in
    // getDurations function
  originAddress1:
  originAddress2:

  // so pins can be displayed on map
  originLatLong1:
  originLatLong2:
*/

