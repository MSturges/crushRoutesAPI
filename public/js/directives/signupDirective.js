(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('signupDirective', signupDirective)

  function signupDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/signup_template.html',
      controller: 'SignupController'
    }
  }

}())
