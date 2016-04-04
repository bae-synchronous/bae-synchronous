/*
  This is sample data returned from google
  on query for commute times
  from: address1 (or adress2)             // actually query sends in coordinates not addresses
  to  : an array of [category addresses]   // actually query sends in coordinates not addresses

  We get back an array of commute times from address1 to each of the category addresses
    (plus other stuff)
  In the functions I'm writing, I populate our data_we_return_to_client object
    with commute times.
  Ultimately I then filter this object to remove listings with invalid commute times

  This is the data I'll be using to test my function.
*/

// Single Origin Address Data Sample:
  var googleCommuteTimeData_from_one_originAddress = {


  };

/*
  same as above, but two origin addreses are provided
  it should return an array of "rows"
  // where row one is from address1
  // and   row two is from address2
  // .. to each category address
*/
// Dual Origin Address Data Sample:
  var googleCommuteTimeData_from_two_originAddresses = {


  };
