
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

module.exports = {
  replaceEmptySpaces: replaceEmptySpaces,
  stringifyCoordinates: stringifyCoordinates
};