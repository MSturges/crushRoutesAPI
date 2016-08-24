(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('profileDirective', profileDirective)

  function profileDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/profile_template.html',
      controller: 'ProfileController'
    }
  }
}())
