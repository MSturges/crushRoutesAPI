(function() {
  'use strict';

  angular.module('crushingRoutes')
  .service('AuthService', AuthService)

  AuthService.$inject = [
    '$log',
    '$q',
    '$http',
    '$localStorage'
  ];

  function AuthService ($log, $q, $http, $localStorage) {

    this.signup = function(signupObj) {
      // var deferred = $q.defer();
      //
      // $http.post('/signup', signupObj).then(function(res){
      //   deferred.resolve(res);
      // })
      // .catch(function(err){
      //   deferred.reject(err);
      // })
      //
      // return deferred.promise
    }

  }

}())
