(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('landingDirective', landingDirective)

  function landingDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/landing_template.html',
      controller: 'LandingController'
    }
  }

}())
