(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('loginDirective', loginDirective)

  function loginDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/login_template.html',
      controller: 'LoginController'
    }
  }

}())
