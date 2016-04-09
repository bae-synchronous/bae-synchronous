//takes control of the div directly underneath the body
//TODO check for atom white spaces; to check for indentation being correct;
var testGlobal;

angular.module('bae-synchronous', [])

.factory('Map', function($http) {
  function getData() {
    //returns data from the root directory
    return $http({
      method: '/GET',
      url: '/',
    });
  }
  //address1, 2, category, and duration are passed in through the models from index.html
  function postData(address1, address2, category, duration) {
    return $http({
      //send data to the back end
      method: 'POST',
      url: '/places',
      data: {address1: address1, address2: address2, category: category,  maxTime: duration}
    })
    //asychnronous call so we need to use a promise in order to make sure we get the data
    .then(function(resp) {
      return resp.data;
    });
  }
  //we need to return the functions to the front end in order to access the functions
  return {
    getData: getData,
    postData: postData
  };
})

// .factory('DisplayMap', function() {
//   var map;
//   function initMap() {
//       var myLatLng1 = {lat: -34.397, lng: 150.644};
//       var myLatLng2 = {lat: -34.597, lng: 150.644};
//       map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: -34.397, lng: 150.644},
//         zoom: 8
//       });
//    }
//    return {
//      map: map,
//      initMap: initMap
//    };
// })

.controller('MainController', function ($scope, Map) {
    $scope.submitted = false;
    $scope.listings = {};
    $scope.categoryListings = {};
    $scope.markers = [];
    // $scope.map = DisplayMap.map;
    // $scope.initMap = DisplayMap.initMap();
    //function to be called on the form being submitted
    $scope.postData = function() {
      //pass in the model data into the Map factory
      $scope.submitted = true;
      Map.postData($scope.homeAddress, $scope.workAddress, $scope.selectedPlace, $scope.time)
      .then(function(data, err) {
        if (err) {
          console.log('error message',err);
        } else {
          console.log("Recieved data from server", data);
          $scope.listings = data;
          $scope.categoryListings = data.categoryListings;
          console.log('category', data.categoryListings);
          var marker3 = new google.maps.Marker({
            position: $scope.listings.address1.coordinates,
            map: map
          });
          var marker4 = new google.maps.Marker({
            position: $scope.listings.address2.coordinates,
            map: map
          });
          console.log('b4 loop', $scope.categoryListings);
          for (var i = 0; i < data.categoryListings.length; i) {
          console.log('in loop', data.categoryListings, $scope.markers, i);
          $scope.markers[i] = new google.maps.Marker({
            position: data.categoryListings[i].coordinates,
            map: map
          });
          console.log('markers[i]', $scope.markers[i]);
          var content = '<div>' + name + $scope.categoryListings[i].name + $scope.categoryListings[i].timeFromAddress1 + '</div>';


          var firstCoords = $scope.categoryListings[0].coordinates;
          var bounds = {
            north: firstCoords.lat,
            south: firstCoords.lat,
            east: firstCoords.lng,
            west: firstCoords.lng
          };
          var addressCords = [$scope.listings.address1.coordinates, $scope.listings.address2.coordinates];
          var categoryCoords = $scope.categoryListings.map(function(listing) {
            return listing.coordinates;
          });

          function expandBounds(bounds, coords) {
            for (var i = 0; i < coords.length; i) {
              bounds.north = Math.max(bounds.north, coords[i].lat);
              bounds.south = Math.min(bounds.south, coords[i].lat);
              bounds.east = Math.max(bounds.east, coords[i].lng);
              bounds.west = Math.min(bounds.west, coords[i].lng);
            }
          }
          expandBounds(bounds, addressCords.concat(categoryCoords));
          map.fitBounds(bounds);
          $scope.markers[i].infowindow = new google.maps.InfoWindow({
              content: content
          });

          $scope.markers[i].addListener('click', function() {
            this.infowindow.open(map, this);
          });
        }
      }
    });
  };

    //there must be a more efficent way of doing this......
    $scope.places = {
      accounting: 'accounting',
      airport: 'airport',
      amusement_park: 'amusement_park',
      aquarium: 'aquarium',
      art_gallery: 'art_gallery',
      atm: 'atm',
      bakery: 'bakery',
      bank: 'bank',
      bar: 'bar',
      beauty_salon: 'beauty_salon',
      bicycle_store: 'bicycle_store',
      book_store: 'book_store',
      bowling_alley: 'bowling_alley',
      bus_station: 'bus_station',
      cafe: 'cafe',
      campground: 'campground',
      car_dealer: 'car_dealer',
      car_rental: 'car_rental',
      car_repair: 'car_repair',
      car_wash: 'car_wash',
      casino: 'casino',
      cemetery: 'cemetery',
      church: 'church',
      city_hall: 'city_hall',
      clothing_store: 'clothing_store',
      convenience_store: 'convenience_store',
      courthouse: 'courthouse',
      dentist: 'dentist',
      department_store: 'department_store',
      doctor: 'doctor',
      electrician: 'electrician',
      electronics_store: 'electronics_store',
      embassy: 'embassy',
      fire_station: 'fire_station',
      florist: 'florist',
      funeral_home: 'funeral_home',
      furniture_store: 'furniture_store',
      gas_station: 'gas_station',
      grocery_or_supermarket: 'grocery_or_supermarket',
      gym: 'gym',
      hair_care: 'hair_care',
      hardware_store: 'hardware_store',
      hindu_temple: 'hindu_temple',
      home_goods_store: 'home_goods_store',
      hospital: 'hospital',
      insurance_agency: 'insurance_agency',
      jewelry_store: 'jewelry_store',
      laundry: 'laundry',
      lawyer: 'lawyer',
      library: 'library',
      liquor_store: 'liquor_store',
      local_government_office: 'local_government_office',
      locksmith: 'locksmith',
      lodging: 'lodging',
      meal_delivery: 'meal_delivery',
      meal_takeaway: 'meal_takeaway',
      mosque: 'mosque',
      movie_rental: 'movie_rental',
      movie_theater: 'movie_theater',
      moving_company: 'moving_company',
      museum: 'museum',
      night_club: 'night_club',
      painter: 'painter',
      park: 'park',
      parking: 'parking',
      pet_store: 'pet_store',
      pharmacy: 'pharmacy',
      physiotherapist: 'physiotherapist',
      plumber: 'plumber',
      police: 'police',
      post_office: 'post_office',
      real_estate_agency: 'real_estate_agency',
      restaurant: 'restaurant',
      roofing_contractor: 'roofing_contractor',
      rv_park: 'rv_park',
      school: 'school',
      shoe_store: 'shoe_store',
      shopping_mall: 'shopping_mall',
      spa: 'spa',
      stadium: 'stadium',
      storage: 'storage',
      store: 'store',
      subway_station: 'subway_station',
      synagogue: 'synagogue',
      taxi_stand: 'taxi_stand',
      train_station: 'train_station',
      transit_station: 'transit_station',
      travel_agency: 'travel_agency',
      university: 'university',
      veterinary_care: 'veterinary_care',
      zoo: 'zoo'
    };

});
