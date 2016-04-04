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

    "destination_addresses" : [
      "100 Murray St, Pyrmont NSW 2009, Australia",
      "117-129 Murray St, Pyrmont NSW 2009, Australia",
      "50 Murray St, Pyrmont NSW 2009, Australia",
      "37 Pyrmont St, Pyrmont NSW 2009, Australia",
      "56 Pirrama Rd, Pyrmont NSW 2009, Australia"
    ],

    "origin_addresses" : [ "50 Murray St, Pyrmont NSW 2009, Australia" ],
    "rows" : [
      {
         "elements" : [
            {
               "distance" : {
                  "text" : "344 ft",
                  "value" : 105
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 28
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.1 mi",
                  "value" : 238
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 45
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 ft",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.4 mi",
                  "value" : 639
               },
               "duration" : {
                  "text" : "3 mins",
                  "value" : 154
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.3 mi",
                  "value" : 468
               },
               "duration" : {
                  "text" : "2 mins",
                  "value" : 107
               },
               "status" : "OK"
            }
         ] // elements
      }
    ],  // rows
    "status" : "OK"
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

    "destination_addresses" : [
      "100 Murray St, Pyrmont NSW 2009, Australia",
      "117-129 Murray St, Pyrmont NSW 2009, Australia",
      "50 Murray St, Pyrmont NSW 2009, Australia",
      "37 Pyrmont St, Pyrmont NSW 2009, Australia",
      "56 Pirrama Rd, Pyrmont NSW 2009, Australia"
    ],
    "origin_addresses" : [
      "50 Murray St, Pyrmont NSW 2009, Australia",
      "37 Pyrmont St, Pyrmont NSW 2009, Australia"
    ],
    "rows" : [
      {
          "elements" : [
            {
               "distance" : {
                  "text" : "344 ft",
                  "value" : 105
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 28
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.1 mi",
                  "value" : 238
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 45
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 ft",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.4 mi",
                  "value" : 639
               },
               "duration" : {
                  "text" : "3 mins",
                  "value" : 154
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.3 mi",
                  "value" : 468
               },
               "duration" : {
                  "text" : "2 mins",
                  "value" : 107
               },
               "status" : "OK"
            }
          ]
      },
      {
          "elements" : [
            {
               "distance" : {
                  "text" : "0.5 mi",
                  "value" : 880
               },
               "duration" : {
                  "text" : "3 mins",
                  "value" : 201
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.4 mi",
                  "value" : 714
               },
               "duration" : {
                  "text" : "3 mins",
                  "value" : 180
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.5 mi",
                  "value" : 775
               },
               "duration" : {
                  "text" : "3 mins",
                  "value" : 173
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "1 ft",
                  "value" : 0
               },
               "duration" : {
                  "text" : "1 min",
                  "value" : 0
               },
               "status" : "OK"
            },
            {
               "distance" : {
                  "text" : "0.4 mi",
                  "value" : 619
               },
               "duration" : {
                  "text" : "2 mins",
                  "value" : 121
               },
               "status" : "OK"
            }
          ]
      }
    ],
    "status" : "OK"
  };

module.exports = {
  googleCommuteTimeData_from_one_originAddress: googleCommuteTimeData_from_one_originAddress,
  googleCommuteTimeData_from_two_originAddresses: googleCommuteTimeData_from_two_originAddresses
}
