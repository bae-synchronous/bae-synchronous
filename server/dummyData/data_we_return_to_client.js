// temp data, and format of contract

//TODO display address1, and address 2 on map, also display everything in category listings
var data_we_return_to_client = {
    address1: {
        address: '50 Murray Street, Pyrmont',
        coordinates: { lat: -33.870353, lng: 151.197892 }
    },
    address2: {
        address: '37 Pyrmont Street, Pyrmont',
        coordinates: { lat: -33.8676109, lng: 151.1937712 }
    },
    thirdPoint: {
        address: '',
        coordinates: { lat: -33.868981950000006, lng: 151.1958316 }
    },
    category: 'gym',
    radius: 500,
    maxTime: 30,
    categoryListings: [
        {
            name: 'ibis Sydney Darling Harbour',
            address: '70 Murray Street, Pyrmont',
            coordinates: { lat: -33.8712116, lng: 151.1979837 },
            timeFromAddress1: 5,
            timeFromAddress2: 12,
            place_id: 'ChIJFfyzTTeuEmsRuMxvFyNRfbk',
            rating: 3,
        },
        {
            name: 'Novotel Sydney on Darling Harbour',
            address: '100 Murray Street, Pyrmont',
            coordinates: { lat: -33.87229689999999, lng: 151.1979047 },
            timeFromAddress1: 22,
            timeFromAddress2: 2,
            place_id: 'ChIJzzIKkzCuEmsRivBgx7QS8t0',
            rating: 3.2,
        },
        {
            name: 'The Little Snail Restaurant',
            address: '50 Murray Street, Pyrmont',
            coordinates: { lat: -33.870353, lng: 151.197892 },
            timeFromAddress1: 5,
            timeFromAddress2: 3,
            place_id: 'ChIJtwapWjeuEmsRcxV5JARHpSk',
            rating: 4.1,
        },
        {
            name: 'Blue Eye Dragon',
            address: '37 Pyrmont Street, Pyrmont',
            coordinates: { lat: -33.8676109, lng: 151.1937712 },
            timeFromAddress1: 2,
            timeFromAddress2: 5,
            place_id: 'ChIJuZqIiTauEmsRJF_TK9Vpfmw',
            rating: 4.3,
        },
        {
            name: 'The Star',
            address: '80 Pyrmont Street, Pyrmont',
            coordinates: { lat: -33.8680013, lng: 151.195248 },
            timeFromAddress1: 5,
            timeFromAddress2: 2,
            place_id: 'ChIJq6qq6jauEmsRJAf7FjrKnXI',
            rating: 3.8,
        }
    ]
};

module.exports = data_we_return_to_client;
