(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('SignupController', SignupController)

  SignupController.$inject = [
    '$log',
    '$scope',
    'SignupService',
    '$state',
    'LoginService'
  ]

  function SignupController ($log, $scope, SignupService, $state, LoginService) {

    $scope.createUser = function () {
      $log.info('user: ', $scope.user)
      SignupService.createUser($scope.user)
      .then(function(){
        $state.go('home');
      })
      .catch(function(err){
        $scope.signupError = err;
      })
    }

    $scope.checkValidity = function(validity) {
      return validity ? 'Please Complete Form' : 'Sign Up';
    }



  }

}())
