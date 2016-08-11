(function() {
  'use strict';

  angular.module('crushingRoutes')
  .service('MapService', MapService)

  MapService.$inject = [
    '$log',
    '$q',
    '$http',
    'PermissionService',
    '$window'
  ];

  function MapService ($log, $q, $http, PermissionService, $window) {




    this.getMarkers = function() {
      console.log('getMarkers');
      var deferred = $q.defer();
      $http.get('/allmarkers')
      .then(function(markers){
        deferred.resolve(markers.data);
      })
      .catch(function(err){
        deferred.reject(err);
      })
      return deferred.promise;
    },

    this.addMarker = function(markerObj){
      var deferred = $q.defer();
      PermissionService.checkTokenValidity()
      .then(function(result){
        if (result) {
          $http.post('/addMarker', {
            markerObj: markerObj,
            user_id: JSON.parse($window.localStorage.getItem('user')).id
          })
          .then(function(success){
            deferred.resolve(success)
          })
        }
      })
      .catch(function(err) {
        deferred.reject(err);
      })
      return deferred.promise;
    }





  }
}())
