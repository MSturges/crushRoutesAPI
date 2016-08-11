(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('NavController', NavController)

  NavController.$inject = [
    '$log',
    '$scope',
    '$rootScope',
    '$state',
    '$timeout',
    '$mdSidenav',
    'MapService',
    '$window'
  ]



  function NavController ($log, $scope, $rootScope, $state, $timeout, $mdSidenav, MapService, $window) {

    $scope.currentNavItem = $rootScope.currentNavItem;
    $scope.types = ('Rock Boulder Ice').split(' ').map(function (type) { return { abbrev: type }; });
    $scope.values = {};
    $scope.grade = '';
    var boulder = 'v0 v1 v2 v3 v4 v5 v6 v7 v8 v9 v10 v11 v12 v13 v14 v15 v16';
    var rock = '5.0 5.1 5.2 5.3 5.4 5.5 5.6 5.7 5.8 5.9 5.10a 5.10b 5.10c 5.10d 5.11a 5.11b 5.11c 5.11d 5.12a 5.12b 5.12c 5.12d 5.13a 5.13b 5.13c 5.13d 5.14a 5.14b 5.14c 5.14d 5.15a 5.15b 5.15c 5.15d';
    var ice = 'WI1 WI2 WI3 WI4 WI5 WI6 WI7 WI8 AI1 AI2 AI3 AI4 AI5 AI6';
    $scope.values.climb_type = 'Rock';

    $scope.updateGrades = function(type) {
      if(type === 'Rock') {
        $scope.grade = rock;
        $scope.values.climb_grade = '5.0';
      } else if(type === 'Boulder') {
        $scope.grade = boulder;
        $scope.values.climb_grade = 'v0';
      } else if (type === 'Ice') {
        $scope.grade = ice;
        $scope.values.climb_grade = 'WI1';
      } else {
        $scope.grade = rock;
        $scope.values.climb_grade = '5.0';
      }
      $scope.grades = ($scope.grade).split(' ').map(function (type) { return { abbrev: type }; });
    }

    $scope.updateGrades('Rock');


    $scope.$watch(function(){
      return $rootScope.currentNavItem;
    }, function(newValue){
      $scope.currentNavItem = newValue;
    }, true);


    $rootScope.$on('populateAndOpenSideNav', function(event, leafEvent) {
      $scope.toggleSideNavBar();
      $scope.values.lat = leafEvent.latlng.lat;
      $scope.values.lng = leafEvent.latlng.lng;
  
    });


    $scope.toggleSideNavBar = function(){
      if ($scope.isOpenLeft()) {
        $scope.close();
      } else {
        $scope.open();
      }
    }
    $scope.isOpenLeft = function(){
      return $mdSidenav('left').isOpen();
    }

    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').close()
      .then(function () {
        $rootScope.$broadcast('redrawMarkers');
      });
    };

    $scope.open = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('left').open()
      .then(function () {
        $log.debug("open LEFT is done");
      });
    };

    $scope.addMarker = function(){
      console.log('these are the values', $scope.values);
      MapService.addMarker($scope.values)
      .then(function(success){
        $scope.values = {};
        $scope.values.climb_type = 'Rock';
        $scope.values.climb_grade = '5.0';
        $scope.updateGrades('Rock');
        $scope.addClimbForm.$setPristine();
        $scope.addClimbForm.$setUntouched();
        $scope.close();
      })
      .catch(function(err){
        alert('You need to log in ' + err);
        console.log('You need to log in', err);
      })
    }

    $scope.checkLogin = function() {
      if ($window.localStorage.getItem('token') && $window.localStorage.getItem('user')) {
        return true;
      } else {
        return false;
      }
    }

    $scope.logout = function() {
      delete window.localStorage['token'];
      delete window.localStorage['user'];
      $state.go('home');
    }

    $scope.checkValidity = function(validity) {
      return validity ? 'Please Finish Form' : 'Submit Route';
    }

    $scope.$on("leafletDirectiveMap.focus", function(event, args){
      $rootScope.$broadcast('redrawMarkers');
    });


  }
}())
