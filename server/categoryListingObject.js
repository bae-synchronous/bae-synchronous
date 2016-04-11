// this is an example of data I will get (from Stephen)
// a list of category locations (based on a 3rd point, which he calculated)
// I will use this as a starting set of data for
//  determining the list of valid category addresses
// This arruves in the format of the data that will be returned to the client
//  properties that have not yet been determined will have the value "null"
//  timeFromAddress1 and timeFromAddress2 (currently null) will be populated by me
//  I will also be removing all categoryListings that do not meet our
//    maxTime (commute) criteria
//  Stretch goals: this object can also be passed on for additional features


// all should be initialized with a falsey value,
// Can all be initialized as null
// or strings initialized as ''
// numbers possibly could be initialized at 0, if certain that 0 would never be
    // a valid value for these number fields.

// var categoryListingObject =
//         {
//             name: '',
//             address: '',
//             coordinates: { lat: null, lng: null },  // numbers
//             timeFromAddress1: null,                 // number: time in minutes
//             timeFromAddress2: null,                 // number: time in minutes
//             place_id: '',
//             rating: null                            // number: 1-5 or 1-10
//         };

function newCategoryListingObject() {
    var newObj = {};

    newObj.name = '';
    newObj.address = '';
    newObj.coordinates = { lat: null, lng: null };  // numbers
    newObj.timeFromAddress1 = null;                 // number = time in minutes
    newObj.timeFromAddress2 = null;                 // number = time in minutes
    newObj.place_id = '';
    newObj.rating = null;
    // testing only: remove next line
    // newObj.rating = 5                            // number: 1-5 or 1-10

    return newObj;
}

module.exports = {
    newCategoryListingObject: newCategoryListingObject
};
