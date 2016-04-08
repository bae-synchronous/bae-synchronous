
// coordinates need to be converted to a string for Google API 'GET' request
function stringifyCoordinates(coordinatesObj){
  var lat = coordinatesObj.lat;
  var lng = coordinatesObj.lng;
  return lat + ',' + lng;
}

// addresses appended to URL for API call needs to replace its empty spaces with a plus '+'
function replaceEmptySpaces(address){
  return address.replace(/ /g, '+');
}

function createOriginsString(address1,address2){
  return helper.stringifyCoordinates(address1) + '|' + helper.stringifyCoordinates(address2);
}

function createDestinationsString(places){
  return places.map(function(place){
    return helper.stringifyCoordinates(place.geometry.location);
  }).join('|'); 
}

module.exports = {
  replaceEmptySpaces: replaceEmptySpaces,
  stringifyCoordinates: stringifyCoordinates,
  createOriginsString: createOriginsString,
  createDestinationsString: createDestinationsString
};
