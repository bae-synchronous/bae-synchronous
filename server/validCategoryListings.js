// FOR LINTING CHECK ONLY
var require = function(){};
var _ = {};

var axios  = require('axios');
var config = require('config');

var inputData =          require('dummyData/categoryListings_from_Steve');
var googleCommuteTimes = require('dummyData/googleCommuteTimeData');

// GoogleMapsDistanceMatrixAPI_base uri
var base_url = "https://maps.googleapis.com/maps/api/distancematrix/json";
// var API_KEY  = config.shAPIkey_googleDistanceMatrixAPI;
var API_KEY_Server = config.shServerKey1;

getCategoryDurations(inputData);

//--------------------------------------

function getCategoryDurations(inputData){

  axios.get(base_url, {
    params: {
      units:        'imperial',
      origins:      getOriginsString(inputData),
      destinations: getDestinationsString(inputData),
      key:          API_KEY_Server
    }
  })
  .then(function (response) {
    var googleCommuteData = response;
    console.log('Yea', googleCommuteTimes);
    return googleCommuteData;
  }).then(function (response){
    populateCommuteTimes(googleCommuteData, inputData);
    removeListingsWithLongCommutes(inputData);
  })
  .catch(function (response) {
    console.log('error catch, commute times',response);
  });
}

  // populate our inputData with the commute times we received back from this query
function populateCommuteTimes(googleCommuteData, inputData){
  _.each(inputData.categoryListings, function(categoryListing, listIndex){
    // this is value in seconds, must divide by 60 to get minutes
    var commuteTime1 = googleCommuteData.rows[0].elements[listIndex].duration.value;
    var commuteTime2 = googleCommuteData.rows[1].elements[listIndex].duration.value;

    categoryListing.timeFromAddress1 = Math.round(commuteTime1/60);
    categoryListing.timeFromAddress2 = Math.round(commuteTime2/60);
  });
}

function removeListingsWithLongCommutes(inputData){
  return _.filter(inputData.categoryListings,
                  areBothCommuteTimesLessUnderMaxTime);
}

function areBothCommuteTimesLessUnderMaxTime(categoryListing){
  var maxTime = inputData.maxTime;
  var time1 = categoryListing.timeFromAddress1;
  var time2 = categoryListing.timeFromAddress2;
  return !!((time1 <= maxTime) && (time2 <= maxTime));
}

//--------------------------------------

function getOriginsString(inputData){

  return inputData.address1.coordinates.lat + ',' +
         inputData.address1.coordinates.lng + '|' +
         inputData.address2.coordinates.lat + ',' +
         inputData.address2.coordinates.lng;

        // could pass in a flag to tell this func to create a Origins String using:
          // - both address1 and address2
          // - only address1
          // - only address2
        // create string for 2 origin addresses
}

function getDestinationsString(inputData){
   var destinations = '';

  // use these values for a Server Query
  var space = ' ';          // for browser query, use space = '%2C';
  var pipe  = '|';          // for browser query, use pipe  = '%7C';

  _.each(inputData.categoryListings, function(categoryListing){
    destinations += categoryListing.coordinates.lat + space +
                    categoryListing.coordinates.lng + pipe;
  });
  // remove pipe from last destination
  destinations = destinations.slice(0, -1);

  return destinations;
}

// for testing
// function getBrowserQueryString(){
//   var space = '%2C';
//   var pipe  = '%7C';

//   // query string for a single  origin address
//   // var queryString_1addr = '' + '?' + 'units=imperial' +
//   //                         '&' + 'origins=' + inputData.address1.coordinates.lat +
//   //                               ','        + inputData.address1.coordinates.lng +
//   //                         '&' + 'destinations=' + destinations +
//   //                         '&' + 'key=' + API_KEY;

//   // var google_req1 = base_url + queryString_1addr;

//   // query string with both source addresses
//   var queryString_2addr = '' + '?' + 'units=imperial' +
//                           '&' + 'origins=' + inputData.address1.coordinates.lat +
//                                 ','        + inputData.address1.coordinates.lng +
//                                  pipe      + inputData.address2.coordinates.lat +
//                                 ','        + inputData.address2.coordinates.lng +
//                           '&' + 'destinations=' + destinations +
//                           '&' + 'key=' + API_KEY;

//   //var google_req2 = base_url + queryString_2addr;
//   //var google_commute_times_from_2_origin_addresses = base_url + queryString_2addr;
//   //console.log(google_req2);

//   return queryString_2addr;
// }
