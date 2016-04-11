angular.module('bae-synchronous.marker', [])
  .factory('Marker', function(){
    function makeMarker(position, map) {
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });
      return marker;
    }
    function expandBounds(bounds, coords) {
      for (var i = 0; i < coords.length; i++) {
        bounds.north = Math.max(bounds.north, coords[i].lat);
        bounds.south = Math.min(bounds.south, coords[i].lat);
        bounds.east = Math.max(bounds.east, coords[i].lng);
        bounds.west = Math.min(bounds.west, coords[i].lng);
      }
    }

    var places = {
      accounting: 'accounting',
      airport: 'airport',
      amusement_park: 'amusement park',
      aquarium: 'aquarium',
      art_gallery: 'art gallery',
      atm: 'atm',
      bakery: 'bakery',
      bank: 'bank',
      bar: 'bar',
      beauty_salon: 'beauty salon',
      bicycle_store: 'bicycle store',
      book_store: 'book store',
      bowling_alley: 'bowling alley',
      bus_station: 'bus station',
      cafe: 'cafe',
      campground: 'campground',
      car_dealer: 'car dealer',
      car_rental: 'car rental',
      car_repair: 'car repair',
      car_wash: 'car wash',
      casino: 'casino',
      cemetery: 'cemetery',
      church: 'church',
      city_hall: 'city hall',
      clothing_store: 'clothing store',
      convenience_store: 'convenience store',
      courthouse: 'courthouse',
      dentist: 'dentist',
      department_store: 'department store',
      doctor: 'doctor',
      electrician: 'electrician',
      electronics_store: 'electronics store',
      embassy: 'embassy',
      fire_station: 'fire station',
      florist: 'florist',
      funeral_home: 'funeral home',
      furniture_store: 'furniture store',
      gas_station: 'gas station',
      grocery_or_supermarket: 'grocery or supermarket',
      gym: 'gym',
      hair_care: 'hair care',
      hardware_store: 'hardware store',
      hindu_temple: 'hindu temple',
      home_goods_store: 'home goods store',
      hospital: 'hospital',
      insurance_agency: 'insurance agency',
      jewelry_store: 'jewelry store',
      laundry: 'laundry',
      lawyer: 'lawyer',
      library: 'library',
      liquor_store: 'liquor store',
      local_government_office: 'local government office',
      locksmith: 'locksmith',
      lodging: 'lodging',
      meal_delivery: 'meal delivery',
      meal_takeaway: 'meal takeaway',
      mosque: 'mosque',
      movie_rental: 'movie rental',
      movie_theater: 'movie theater',
      moving_company: 'moving company',
      museum: 'museum',
      night_club: 'night club',
      painter: 'painter',
      park: 'park',
      parking: 'parking',
      pet_store: 'pet store',
      pharmacy: 'pharmacy',
      physiotherapist: 'physiotherapist',
      plumber: 'plumber',
      police: 'police',
      post_office: 'post_office',
      real_estate_agency: 'real estate_agency',
      restaurant: 'restaurant',
      roofing_contractor: 'roofing contractor',
      rv_park: 'rv park',
      school: 'school',
      shoe_store: 'shoe store',
      shopping_mall: 'shopping mall',
      spa: 'spa',
      stadium: 'stadium',
      storage: 'storage',
      store: 'store',
      subway_station: 'subway station',
      synagogue: 'synagogue',
      taxi_stand: 'taxi stand',
      train_station: 'train station',
      transit_station: 'transit station',
      travel_agency: 'travel agency',
      university: 'university',
      veterinary_care: 'veterinary care',
      zoo: 'zoo'
    };

    return {
      makeMarker: makeMarker,
      expandBounds: expandBounds,
      places: places
    };
  });
