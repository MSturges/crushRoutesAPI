(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('LoginController', LoginController)

  LoginController.$inject = [
    '$log',
    '$scope',
    'LoginService',
    '$state',
    '$rootScope'
  ]

  function LoginController ($log, $scope, LoginService, $state, $rootScope) {

    $scope.userLogin = function () {
      LoginService.userLogin($scope.login)
      .then(function(res){
        $scope.login = {};
        $state.go('home');
      })
      .catch(function(err){
        $scope.loginError = err;
      })
    }

    $scope.checkValidity = function(validity) {
      return validity ? 'Please Complete Form' : 'Login';
    }



  }
}())
