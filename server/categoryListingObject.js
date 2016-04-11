//  Stretch goals: modify newCategoryListingObject to add fields for stretch features
var getRadius = require('./thirdPoint').getRadius;

function newCategoryListingObject() {
    var newObj = {};

    newObj.name = '';
    newObj.address = '';
    newObj.coordinates = { lat: null, lng: null };  // numbers
    newObj.timeFromAddress1 = null;                 // number = time in minutes
    newObj.timeFromAddress2 = null;                 // number = time in minutes
    newObj.place_id = '';
    newObj.rating = null;

    return newObj;
}

function initializeResultsObject(address1, address2, category, maxTime){
  //console.log('initializing our response/results object');
  var resultsObject = {
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
    radius: 0,
    maxTime: maxTime,
    categoryListings: []      // this stores an array of newCategoryListingObject()'s: see above
  };
return resultsObject;
}

module.exports = {
    newCategoryListingObject: newCategoryListingObject,
    initializeResultsObject: initializeResultsObject
};
