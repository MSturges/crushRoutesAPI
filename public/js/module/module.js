(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'ngMaterial',
    'ngAria',
    'ngAnimate',
    'material.svgAssetsCache',
    'leaflet-directive'
  ]

  angular.module('crushingRoutes', dependencies)

  .run(['$rootScope', function($rootScope) {
    $rootScope.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {
      $rootScope.currentNavItem = toState.name;
    });
  }])


}())
