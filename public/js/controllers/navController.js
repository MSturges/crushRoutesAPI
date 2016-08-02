(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('NavController', NavController)

  NavController.$inject = [
    '$log',
    '$scope',
    'NgMap',
    '$rootScope',
    '$state'

  ]

  function NavController ($log, $scope, NgMap, $rootScope, $state) {
    $scope.currentNavItem = $rootScope.currentNavItem
    console.log(NgMap);
    NgMap.getMap().then(function(map) {

    });

  }

}())
