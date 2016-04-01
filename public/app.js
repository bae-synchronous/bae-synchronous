//takes control of the div directly underneath the body
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
      url: '/',
      data: {address1: address1, address2: address2, category: category,  duration: duration}
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

.controller('MainController', function ($scope, Map) {
    $scope.display = 'Test';
    //function to be called on the form being submitted 
    $scope.postData = function() {
      //pass in the model data into the Map factory
      Map.postData($scope.homeAddress, $scope.workAddress, $scope.selectedPlace, $scope.time)
      .then(function(error, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('your good', data);
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