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

    $scope.markers = [
      {pos: [40.0150, -105.2705], infoHead: 'i\m a header1', infoContent: 'I\m content1', id:1},
      {pos: [40.0260, -105.2805], infoHead: 'i\m a header2', infoContent: 'I\m content2', id:2},
      {pos: [40.0370, -105.2905], infoHead: 'i\m a header3', infoContent: 'I\m content3', id:3},
      {pos: [40.0483, -105.3005], infoHead: 'i\m a header4', infoContent: 'I\m content4', id:4},
      {pos: [40.0594, -105.3105], infoHead: 'i\m a header5', infoContent: 'I\m content5', id:5}
    ]

    $scope.infoWindow



    //  $scope.currentNavItem = 'home';
    NgMap.getMap().then(function(map) {
    });

  }

}())
