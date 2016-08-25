(function (){
  'use strict';

  angular.module('crushingRoutes')
  .service('ProfileService', ProfileService)

  ProfileService.$inject = [
    '$log',
    '$q',
    '$http',
    '$window',
    'PermissionService'
  ];

  function ProfileService ($log, $q, $http, $window, PermissionService) {
    this.getUserProfile = function() {
      var deferred = $q.defer();
      PermissionService.checkTokenValidity()
      .then(function(result){
        if (result) {
          $http.post('profile/grabUserProfile', {
            user_name: JSON.parse($window.localStorage.getItem('user')).username
          })
          .then(function (response){
            if (response.data.error) {
              deferred.reject(response.data.error);
            } else {
              deferred.resolve(response);
            }
          })
        }
      })
      .catch(function(err){
        deferred.reject(err)
      })
      return deferred.promise
    }



  }

}())
