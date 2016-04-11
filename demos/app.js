//takes control of the div directly underneath the body
//TODO check for atom white spaces; to check for indentation being correct;


angular.module('bae-synchronous', [])

.factory('Map', function($http, $q) {
  function getData() {
    //returns data from the root directory
    return $http({
      method: '/GET',
      url: $q,
    });
  }
  //address1, 2, category, and duration are passed in through the models from index.html
  function postData(address1, address2, category, duration) {
    return $http({
      //send data to the back end
      method: 'POST',
      url: '/places',
      data: {address1: address1, address2: address2, category: category,  duration: duration}
    })
    //asychnronous call so we need to use a promise in order to make sure we get the data
    .then(function(resp) {
      console.log('\nSH postData resp in app.js\n', resp);
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
    $scope.submitted = false;
    //function to be called on the form being submitted
    $scope.postData = function() {
      //pass in the model data into the Map factory
      $scope.submitted = true;
      Map.postData($scope.homeAddress, $scope.workAddress, $scope.selectedPlace, $scope.time)
      .then(function(error, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('your good', data);
        }
      });
    };
});
