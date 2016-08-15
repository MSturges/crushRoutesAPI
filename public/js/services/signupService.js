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
      $http.post('/auth/signup', userObject)
      .then(function (response) {
        if (response.data.constraint) {
          deferred.reject('User of that name already exists');
        } else if(response.data.token && response.data.user){
          $window.localStorage.setItem('token', response.data.token);
          $window.localStorage.setItem('user', JSON.stringify(response.data.user));
          $state.go('home');
        }
      })
      .catch(function(err){
        deferred.reject(err)
      })
      return deferred.promise
    }

  }

}())
