function requestHandler(req,res){
  }
     module.exports = {
    requestHandler: requestHandler,
  }

/*
Function: takes in (array of categoryLocations, address). Returns (array of {address, categoryAddress, duration})  where travelTime represents the time from address to that categoryAddress.
*/

// first add fields to categoryObjects:
  // categoryAddress: (use Google API to get addressFromCoordinates)
function getAddressFromCoordinates(lat, long){

  return // "String"
}
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


};

/* Object returned to Client will ultimately look like:
  categoryAddress:
  categoryLatLong: {lat: , long: },
  durationToAddress1:
  durationToAddress2:
  // optional:
  locationName (string ie, "24 Hour Fitness")
  yelpRating:

*/
