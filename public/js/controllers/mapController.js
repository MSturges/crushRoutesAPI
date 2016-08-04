(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('MapController', MapController)

  MapController.$inject = [
    '$log',
    '$scope',
    '$rootScope',
    'MapService',
    '$state'
  ]

  function MapController ($log, $scope, $rootScope, MapService, $state) {
    angular.extend($scope, {
      defaults: {
        zoomControl: false
      },
      boulder: {
        lat: 40.015,
        lng: -105.27,
        zoom: 13
      },
    });


    MapService.getMarkers()
    .then(function(markers){
      $log.info('routes!!!!!', markers);
      $scope.markers = markers;
    })
    .catch(function(err){
      $log.error('no pirates :(', err);
    })

    








    $scope.showMap = false;
    $scope.checkRoute = function() {
      if ($rootScope.currentNavItem === 'home') {
        $scope.showMap = true;
      } else {
        $scope.showMap = false;
      }
      return $scope.showMap
    }



  }
}())
