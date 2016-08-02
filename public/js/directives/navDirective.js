(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('navDirective', navDirective)

  function navDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/nav_template.html',
      controller: 'NavController'
    }
  }

}())
