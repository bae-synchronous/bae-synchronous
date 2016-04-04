// will probably rename this to validCategoryList.js
var axios = require('axios');
var config = require('config');
//var dummyJSON = require('dummyJSON');
//var format_of_data_we_return_to_client = require('format_of_data_we_return_to_client');
//var dummyData_in_our_format = require('dummyData_in_our_format');
var inputData = require('categoryListings_from_Steve');
// var dummyData = require('dummyData');

function requestHandler(req,res){
  module.exports = {
  requestHandler: requestHandler,
  }
}


// want these to be Global, no Window on server, dunno how to
//explicitly call them out as global (to this file) vars

// GoogleMapsDistanceMatrixAPI_base uri
var base_url = "https://maps.googleapis.com/maps/api/distancematrix/json";
var API_KEY  = config.shAPIkey_googleDistanceMatrixAPI;

function getDurations(originAddress, originNumber, categoryObjects){
  var addressPropertyName = 'address' + originNumber;
  // ie 'address1', or 'address2'
  // won't need if query both addresses at once.

  // build destination section of query parameter
  var destinations = '';
  var space = '%2C';
  var pipe  = '%7C';

  _.each(inputData, function(categoryListing){
    destination += coordinates.lat + space + coordinates.lng + pipe;
  })

    // AXIOS EXAMPLE for building query
      // axios.get(base_url,
      //           params: {
      //             key = API_KEY,
      //             units = imperial
      //             origins = { address1.coordinates.lat,
      //                         address1.coordinates.lng
      //                       }
      //             destinations = destinations;
      //           })
      //           .then(function (response) {
      //             var places = response.data.results;
      //             console.log('places',places);
      //             return places;
      //           })
      //           .catch(function (response) {
      //             console.log(response);
      //           });

  // can actually pass in both origin addresses. Next round
  var queryString = '' + '?' + 'units=imperial' +
                         // '&' + 'origins=' + address1.coordinates.lat + ',' + address1.coordinates.lng +
                         '&' + 'origins' + inputData[addressPropertyName].coordinates.lat +
                               ','       + inputData[addressPropertyName].coordinates.lng +
                         '&' + 'destinations=' + destinations +
                         '&' + 'key=' + API_KEY;

  var google_req = base_url + queryString;

  // make our query
  // say our data is returned in a 'data' object
  var googleCommuteTimeData_from_single_originAddress = {

  };

  // convenience variable
  var commuteTime_data = googleCommuteTimeData_from_single_originAddress;

  // populate our inputData with the commute times we received back from this query

}


/*
  Function: takes in (array of categoryLocations, address).
  Returns (array of {address, categoryAddress, duration})
  where travelTime represents the time from address to that categoryAddress.
*/

// first add fields to categoryObjects:
  // categoryAddress: (use Google API to get addressFromCoordinates)



// function:
  // now add addressField to arrayOfCategories
    // and populate it
  // maybe: add property fields, initialized to null
    // address1
    // address2
    // durationAddress1
    // durationAddress2


// function getDurations(originAddress, originNumber, categoryObjects){
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
// }


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
