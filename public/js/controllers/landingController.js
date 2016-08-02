 (function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('LandingController', LandingController)

  LandingController.$inject = [
    '$log',
    '$scope',
    'NgMap'
  ]



  function LandingController ($log, $scope, NgMap) {
    $scope.test = 'testLanding'
    console.log(NgMap);

    NgMap.getMap().then(function(map) {

    });

  }

}())
