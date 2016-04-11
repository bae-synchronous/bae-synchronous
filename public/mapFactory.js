angular.module('bae-synchronous.Map', [])

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
      // recieve data from the back end
      // console.log('\n----SH app.js postData "/places", resp.data: \n', resp.data);
      return resp.data;
    })
    .catch(function(caught){
      console.log('catch in app.js, postData: ', caught);
    });
  }
  //we need to return the functions to the front end in order to access the functions
  return {
    getData: getData,
    postData: postData
  };
});
