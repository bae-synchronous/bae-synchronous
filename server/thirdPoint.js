var config = require('./config');

function getThirdPoint (coordinates1, coordinates2) {
    // implements the midpoint formula to calculate a third point
    return findMidpoint(coordinates1, coordinates2);
}

function findMidpoint(coordinates1,coordinates2){
    // Could also consider the midpoint as a car travels, as opposed to the midpoint
    //  as the crow flies between the two addresses.
    // Or the midpoint time-wise between two points, as a car travels..
    // This works fine.
    // Better first optimization might be to change the radius.
    // currently it's hard-coded at 500meters.
    var thirdPoint = {};
    thirdPoint.lat = ((coordinates1.lat + coordinates2.lat)/2);
    thirdPoint.lng = ((coordinates1.lng + coordinates2.lng)/2);
    return thirdPoint;
}

function getRadius(coordinates1, coordinates2, maxTime){
  //  conservative estimate:
  //    how far could one travel in maxTime at 60mph?
  //    add this to half the distance between address1 and address2
  //    That should over estimate the radius that all destinations should fall within
  //  Rem: meters - radius must be reported in meters for Google API
  var radius = 500; // meters
  return radius;
}

module.exports = {
    getThirdPoint: getThirdPoint,
    findMidpoint: findMidpoint,
    getRadius: getRadius
};
