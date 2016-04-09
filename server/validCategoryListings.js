// FOR LINTING (inside sublime) CHECK ONLY
// var require = function(){};
// var _ = {};

// input:
  //  an object with structure that the client expects to receive back
  //  it has an array of categoryListings that
  //    - "commuteFromAddress1" and "commuteFromAddress2"
  //      with data I get back from Google Distance Matrix API call
  //    - then remove any categoryListings where either
  //      "commuteFromAddress1" or "commuteFromAddress2"
  //      are greater than maxTime (obtained from client, stored in the object I receive)
  //
  // returns data object ready to return to client:
  // listings of type "category" which are <= maxTime away from both address1, and from address2

var axios  = require('axios');
var config = require('./config');
var _ = require('underscore');

// test data
var startingData = require('./dummyData/categoryListings_from_Steve');
var inputData = startingData.categoryListings_from_Steve;

// GoogleMapsDistanceMatrixAPI_base uri
var base_url = "https://maps.googleapis.com/maps/api/distancematrix/json";
var API_KEY_Server = config.shServerKey1;

// sample call from outside this file
// getValidCategoryListings(inputData, function functionThatNeedsMyData(inputData){
//     console.log('\n\ndata Returning To Client: \n', inputData, '\n');
// });

// function functionThatNeedsMyData(inputData){
//   console.log('--returned data---', inputData);
// }

// function getValidCategoryListings(inputData, functionThatNeedsMyData){
function getValidCategoryListings(inputData){
  // this could/should be changed to return a promise,
  // instead of accepting a callback


  // so can test that filter is working, change steve's supplied maxTime
  inputData.maxTime = 2;
  console.log('\n\ninputStevesData: (after I changed to maxTime = 2)\n\n', inputData, '\n');


  // moved my promises chain TO HERE
  // taking it out of getGoogleCommuteData function

  // var googleCommuteData = getGoogleCommuteData(inputData);
   return getGoogleCommuteData(inputData)
   .then(function (googleCommuteData){
    populateCommuteTimes(googleCommuteData, inputData);
    removeListingsWithCommutesLongerThanMaxTime(inputData);
    // functionThatNeedsMyData(inputData);
    console.log('\n finish \n');
    return Promise.resolve(inputData);
  });

}

//--------------------------------------

// requests googleAPI for commute data
  // between address1 and each of our supplied categoryListings, and
  // between address2 and each of our supplied categoryListings.
function getGoogleCommuteData(inputData){

  return axios.get(base_url, {
    params: {
      units:        'imperial',
      origins:      getOriginsString(inputData),
      destinations: getDestinationsString(inputData),
      key:          API_KEY_Server
    }
  })

  .then(function (response) {
    // sends google API data back to my wrapper function
    // to do work on inputData, using this google response.data

    // console.log('\n\nGoogleDistanceData: \n', response.data, '\n');
    return Promise.resolve(response.data);
  })

  .catch(function (response) {
    // TODO: check on how to properly throw an error
    console.log('error catch in getGoogleCommuteData: ',response);
  });
}

// populate our inputData with the commute times we received back from this query
function populateCommuteTimes(googleCommuteData, inputData){

  _.each(inputData.categoryListings, function(categoryListing, listIndex){

    // this is value in seconds.. divide by 60 to get minutes
    var commuteTime1 = googleCommuteData.rows[0].elements[listIndex].duration.value;
    var commuteTime2 = googleCommuteData.rows[1].elements[listIndex].duration.value;

    categoryListing.timeFromAddress1 = Math.round(commuteTime1/60);
    categoryListing.timeFromAddress2 = Math.round(commuteTime2/60);

  });
}

function removeListingsWithCommutesLongerThanMaxTime(inputData){

  var filtered = _.filter(inputData.categoryListings,
                  areBothCommuteTimesLessThanMaxTime
         );
  inputData.categoryListings = filtered;
  return inputData;  // not necessary - it modifies the input object

  function areBothCommuteTimesLessThanMaxTime(categoryListing){
    var maxTime = inputData.maxTime;
    // // testing
    // maxTime = 2;// testing
    var time1 = categoryListing.timeFromAddress1;
    var time2 = categoryListing.timeFromAddress2;

    return ( (time1 <= maxTime) && (time2 <= maxTime) );
  }
}


//--------------------------------------

// assemble string used for origins parameter of google Distance Matrix API call
function getOriginsString(inputData){

  return inputData.address1.coordinates.lat + ',' +
         inputData.address1.coordinates.lng + '|' +
         inputData.address2.coordinates.lat + ',' +
         inputData.address2.coordinates.lng;

        // if it becomes useful to query using a single address,
          // could pass in a flag to tell this func to create a Origins String using:
          // - both address1 and address2
          // - only address1
          // - only address2
          // create string for 2 origin addresses
}

// assemble string used for destinations parameter of google Distance Matrix API call
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

module.exports = {

  getValidCategoryListings: getValidCategoryListings,

  getGoogleCommuteData: getGoogleCommuteData,
  populateCommuteTimes: populateCommuteTimes,
  removeListingsWithCommutesLongerThanMaxTime: removeListingsWithCommutesLongerThanMaxTime,

  getOriginsString: getOriginsString,
  getDestinationsString: getDestinationsString
};

// for testing Google Query in Browser
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
