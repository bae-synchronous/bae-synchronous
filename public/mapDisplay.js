

var map;
var markers = [];
var contents = [];
//dummy object used to test to see if the for loop worked.
var data_we_return_to_client = {
    address1: {
        address: '50 Murray Street, Pyrmont',
        coordinates: { lat: -33.870353, lng: 151.197892 }
    },
    address2: {
        address: '37 Pyrmont Street, Pyrmont',
        coordinates: { lat: -33.8976109, lng: 151.1937712 }
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

var map;
function initMap() {
  var myLatLng1 = {lat: -34.397, lng: 150.644};
  var myLatLng2 = {lat: -34.597, lng: 150.644};
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
  var marker1 = new google.maps.Marker({
    position: myLatLng1,
    map: map,
    title: 'Hello World!'
  });
  var marker2 = new google.maps.Marker({
    position: myLatLng2,
    map: map,
    title: 'Hello World!'
  });
  var marker3 = new google.maps.Marker({
    position: data_we_return_to_client.address1.coordinates,
    map: map
  });
  var marker4 = new google.maps.Marker({
    position: data_we_return_to_client.address2.coordinates,
    map: map
  });
var categories = data_we_return_to_client.categoryListings;
for (var i = 0; i < categories.length; i++) {
  console.log('categories in mapDisplay.js', categories);
  markers[i] = new google.maps.Marker({
    position: categories[i].coordinates,
    map: map
  });
  console.log('markers[i]', markers[i]);
  var content = '<div>' + name + categories[i].name + categories[i].timeFromAddress1 + '</div>' ;

  markers[i].infowindow = new google.maps.InfoWindow({
      content: content
  });


  // var infowindow = new google.maps.InfoWindow({
  //   content: 'Crunch Gym'
  // });

  markers[i].addListener('click', function() {
    this.infowindow.open(map, this);
  });
}

  marker3.addListener('click', function() {
    infowindow.open(map, marker3);
  });
}
