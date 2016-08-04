(function() {
  'use strict';

  angular.module('crushingRoutes')
  .service('MapService', MapService)

  MapService.$inject = [
    '$log',
    '$q',
    '$http'
  ];

  function MapService ($log, $q, $http) {

    this.getMarkers = function() {
      console.log('getMarkers');
      var deferred = $q.defer();
      $http.get('/allmarkers')
      .then(function(pirates){
        console.log('pirates in service!', pirates);
        deferred.resolve(pirates.data);
      })
      .catch(function(err){
        deferred.reject(err);
      })
      return deferred.promise;
    },

    this.addMarker = function(markerObj){
      var deferred = $q.defer();
      $http.post('/addMarker', markerObj)
      .then(function(success){
        deferred.resolve(success)
      })
      .catch(function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }





  }
}())
