(function() {
  'use strict';

  angular.module('crushingRoutes')
  .service('SignupService', SignupService)

  SignupService.$inject = [
    '$log',
    '$q',
    '$http',
    '$state',
    '$window'
  ];

  function SignupService ($log, $q, $http, $state, $window) {

    this.createUser = function(userObject) {
      var deferred = $q.defer();
      $http.post('/signup', userObject)
      .then(function (response) {
        $window.localStorage.setItem('token', response.data.token);
        $window.localStorage.setItem('user', JSON.stringify(response.data.user));
        $state.go('home');
      })
      .catch(function(err){
        deferred.reject(err)
      })
      return deferred.promise
    }

  }

}())
