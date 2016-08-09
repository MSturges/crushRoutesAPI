(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('LoginController', LoginController)

  LoginController.$inject = [
    '$log',
    '$scope',
    'LoginService',
    '$state'
  ]

  function LoginController ($log, $scope, LoginService, $state) {

    $scope.userLogin = function () {
      $log.info('user: ', $scope.login)
      LoginService.userLogin($scope.login)
      .then(function(res){
        $scope.login = {};
        $state.go('home');
      })
      .catch(function(err){
        $log.error(err);
      })
    }



  }
}())
