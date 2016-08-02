(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('MapController', MapController)

  MapController.$inject = [
    '$log',
    '$scope',
    'NgMap',
    '$rootScope'
  ]

  function MapController ($log, $scope, NgMap, $rootScope) {
    $scope.showMap = false;
    
    $scope.checkRoute = function() {
      if ($rootScope.currentNavItem === 'home') {
        $scope.showMap = true;
      } else {
        $scope.showMap = false;
      }
      return $scope.showMap
    }


    //  $scope.currentNavItem = 'home';
    NgMap.getMap().then(function(map) {
    });

  }

}())
