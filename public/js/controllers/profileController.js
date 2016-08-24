(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('ProfileController', ProfileController)

  ProfileController.$inject = [
    '$log',
    '$scope',
    'ProfileService',
  ]

  function ProfileController ($log, $scope, ProfileService) {


    $scope.userProfile = function () {
      ProfileService.getUserProfile()
      .then(function(res){
        console.log('userInfo in the Controller!!!!!', res.data);
        $scope.userInfo = res.data
      })
      .catch(function(err){
        console.log('userInfo Error in the Controller', err);
        // $scope.loginError = err;
      })
    }

    $scope.userProfile();




  }
}())
