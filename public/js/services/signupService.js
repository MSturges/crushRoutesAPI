(function() {
  'use strict';

  angular.module('crushingRoutes')
  .service('SignupService', SignupService)

  SignupService.$inject = [
    '$log',
    '$q',
    '$http',
    '$state'
  ];

  function SignupService ($log, $q, $http, $state) {

    this.createUser = function(userObject) {
      var deferred = $q.defer();
      $http.post('/signup', userObject)
      .then(function (response) {
        // $window.localStorage.setItem('token', response.data.token);
        $state.go('home');
      })
      .catch(function(err){
        deferred.reject(err)
      })
      return deferred.promise
    }

  }

}())
