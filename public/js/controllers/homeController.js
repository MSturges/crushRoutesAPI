(function() {
 'use strict';

 angular.module('crushingRoutes')
 .controller('HomeController', HomeController)

 HomeController.$inject = [
   '$log',
   '$scope',
   'NgMap'
 ]

 function HomeController ($log, $scope, NgMap) {



  //  $scope.currentNavItem = 'home';

   NgMap.getMap().then(function(map) {
   });

 }

}())
