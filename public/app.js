angular.module('bae-synchronous', [])

.factory('Map', function($http) {
  function getData() {
    return $http({
      method: '/GET',
      url: '/',
    });
  }
  function postData(address1, address2, category, duration) {
    return $http({
      method: 'POST',
      url: '/',
      data: {address1: address1, address2: address2, category: category,  duration: duration}
    })
    .then(function(resp) {
      return resp.data; 
    });
  }
  return {
    getData: getData,
    postData: postData
  };
})

.controller('MainController', function ($scope) {
    $scope.display = 'Test';
});
