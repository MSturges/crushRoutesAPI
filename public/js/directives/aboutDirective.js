(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('aboutDirective', landingDirective)

  function landingDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/about_template.html',
      controller: 'AboutController'
    }
  }

}())
