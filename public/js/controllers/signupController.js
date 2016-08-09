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
        $log.error(err);
      })
    }

  }

}())
