(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('homeDirective', homeDirective)

  function homeDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/home_template.html',
      controller: 'HomeController'
    }
  }

}())
