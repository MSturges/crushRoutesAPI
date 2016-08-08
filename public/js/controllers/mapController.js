(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('MapController', MapController)

  MapController.$inject = [
    '$log',
    '$scope',
    '$rootScope',
    'MapService',
    '$state'
  ]

  function MapController ($log, $scope, $rootScope, MapService, $state) {
    angular.extend($scope, {
      defaults: {
        zoomControl: false
      },
      boulder: {
        lat: 40.015,
        lng: -105.27,
        zoom: 13
      },
      events: {}
    });

    // Get request to database to populate map
    MapService.getMarkers()
    .then(function(markers){
      $log.info('routes!!!!!', markers);
      $scope.markers = markers;
    })
    .catch(function(err){
      $log.error('no pirates :(', err);
    })

    // Listens to a click envent to add marker
    $scope.$on("leafletDirectiveMap.click", function(event, args){
      var leafEvent = args.leafletEvent;
      $rootScope.$broadcast('populateAndOpenSideNav', leafEvent);

      $scope.markers.push({
        lat: leafEvent.latlng.lat,
        lng: leafEvent.latlng.lng,
      });
    });

    // redraw markers on close
    $rootScope.$on('redrawMarkers', function(event, leafEvent) {
      console.log('REDRAW', $scope.markers);
      MapService.getMarkers()
      .then(function(markers){
        $scope.markers = markers;
        console.log('MARKERS IN THEN', markers);
      })
      .catch(function(err){
        $log.error('no pirates :(', err);
      })
    });

    $scope.mapClass = function(visible){
      return visible ? 'shownMap' : 'hiddenMap';
    }

    // display map if state is 'home'
    $scope.showMap = true;
    $scope.checkRoute = function() {
      if ($rootScope.currentNavItem === 'home') {
        $scope.showMap = true;
      } else {
        $scope.showMap = false;
      }
      return $scope.showMap
    }

  }
}())
