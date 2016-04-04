// temp data, and format of contract
var data_we_return_to_client = {
    address1: {
        address: '1600+Amphitheatre+Parkway,+Mountain+View,+CA'
        coordinates: {
            lat: 12312312,
            lng: 12341324
        }
    },
    address2: {
        address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
        coordinates: {
            lat: 12312312,
            lng: 12341324
        }
    },
    thirdPoint: {
        address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
        coordinates: {
            lat: 12312312,
            lng: 12341324
        }
    },
    category: 'gym',
    maxTime: 30,                    // time in minutes
    categoryListings: [
        {
            address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
            coordinates: {
                lat: 12312312,
                lng: 12341324
            },
            places_id: 1242141,
            timeFromAddress1: 5,   // time in minutes
            timeFromAddress2: 12
        },
        // array of several items with the above data fields
                {
            address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
            coordinates: {
                lat: 12312312,
                lng: 12341324
            },
            places_id: 1242141,
            timeFromAddress1: 5,   // time in minutes
            timeFromAddress2: 12
        },
        {
            address: 'Mountain+View+High+School,+Truman Avenue,+Mountain+View,+CA,+United States'
            coordinates: {
                lat: 12312312,
                lng: 12341324
            },
            places_id: 1242141,
            timeFromAddress1: 5,   // time in minutes
            timeFromAddress2: 12
        }

    ];
}

module.exports = data_we_return_to_client;
