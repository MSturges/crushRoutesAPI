(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('NavController', NavController)

  NavController.$inject = [
    '$log',
    '$scope',
    '$rootScope',
    '$state',
    '$timeout',
    '$mdSidenav',
    'MapService'
  ]

  function NavController ($log, $scope, $rootScope, $state, $timeout, $mdSidenav, MapService) {

    $scope.currentNavItem = $rootScope.currentNavItem;
    $scope.values = {};

    $rootScope.$on('populateAndOpenSideNav', function(event, leafEvent) {
      $scope.toggleSideNavBar();
      $scope.values.lat = leafEvent.latlng.lat;
      $scope.values.lng = leafEvent.latlng.lng;
    });


    $scope.toggleSideNavBar = function(){
      if ($scope.isOpenLeft()) {
        $scope.close();
      } else {
        $scope.open();
      }
    }
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    }

    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
      .then(function () {
        $rootScope.$broadcast('redrawMarkers');
      });
    };

    $scope.open = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').open()
      .then(function () {
        $log.debug("open LEFT is done");
      });
    };

    $scope.addMarker = function(){
      console.log('these are the values', $scope.values);
      MapService.addMarker($scope.values)
      .then(function(success){
        $log.info(success);
        $scope.values = {};
        $scope.close();
      })
      .catch(function(err){
        $log.error(err);
      })
    }

    $scope.$on("leafletDirectiveMap.focus", function(event, args){
      $rootScope.$broadcast('redrawMarkers');
    });


  }
}())
