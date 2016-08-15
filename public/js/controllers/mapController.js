(function() {
  'use strict';

  angular.module('crushingRoutes')
  .controller('MapController', MapController)

  MapController.$inject = [ '$log', '$scope', '$rootScope', 'MapService', '$state', '$http', '$mdDialog']
  function MapController ($log, $scope, $rootScope, MapService, $state, $http, $mdDialog) {

    $scope.defaults = { zoomControl: false };
    $scope.center_boulder = { lat: 40.015, lng: -105.27, zoom: 13 };
    $scope.layers = {
      baselayers: {
        googleHybrid: {
          name: 'Google Hybrid',
          layerType: 'HYBRID',
          type: 'google'
        },
        googleTerrain: {
          name: 'Google Terrain',
          layerType: 'TERRAIN',
          type: 'google'
        },
        googleRoadmap: {
          name: 'Google Streets',
          layerType: 'ROADMAP',
          type: 'google'
        }
      }
    };



    $scope.boulder = {};
    $scope.events = {};
    $scope.rock = {};
    $scope.ice = {};
    $scope.filter = {};
    $scope.markers = [];
    $scope.filteredMarkerArr = [];
    $scope.ip = "";
    $scope.filter.boulder_grade_min = 'v0';
    $scope.filter.boulder_grade_max = 'v16';
    $scope.filter.rock_grade_min = '5.0';
    $scope.filter.rock_grade_max = '5.15d';
    $scope.filter.ice_grade_min = 'WI1';
    $scope.filter.ice_grade_max = 'AI6';
    $scope.boulder.min = ('v0 v1 v2 v3 v4 v5 v6 v7 v8 v9 v10 v11 v12 v13 v14 v15 v16').split(' ').map(function (grade) { return { abbrev: grade }; });
    $scope.boulder.max = ('v0 v1 v2 v3 v4 v5 v6 v7 v8 v9 v10 v11 v12 v13 v14 v15 v16').split(' ').map(function (grade) { return { abbrev: grade }; });
    $scope.rock.min = ('5.0 5.1 5.2 5.3 5.4 5.5 5.6 5.7 5.8 5.9 5.10a 5.10b 5.10c 5.10d 5.11a 5.11b 5.11c 5.11d 5.12a 5.12b 5.12c 5.12d 5.13a 5.13b 5.13c 5.13d 5.14a 5.14b 5.14c 5.14d 5.15a 5.15b 5.15c 5.15d').split(' ').map(function (grade) { return { abbrev: grade }; });
    $scope.rock.max = ('5.0 5.1 5.2 5.3 5.4 5.5 5.6 5.7 5.8 5.9 5.10a 5.10b 5.10c 5.10d 5.11a 5.11b 5.11c 5.11d 5.12a 5.12b 5.12c 5.12d 5.13a 5.13b 5.13c 5.13d 5.14a 5.14b 5.14c 5.14d 5.15a 5.15b 5.15c 5.15d').split(' ').map(function (grade) { return { abbrev: grade }; });
    $scope.ice.min = ('WI1 WI2 WI3 WI4 WI5 WI6 WI7 WI8 AI1 AI2 AI3 AI4 AI5 AI6').split(' ').map(function (grade) { return { abbrev: grade }; });
    $scope.ice.max = ('WI1 WI2 WI3 WI4 WI5 WI6 WI7 WI8 AI1 AI2 AI3 AI4 AI5 AI6').split(' ').map(function (grade) { return { abbrev: grade }; });

    var rockScale = { '5.0': 1, '5.1': 2, '5.2': 3, '5.3': 4, '5.4': 5, '5.5': 6, '5.6': 7, '5.7': 8, '5.8': 9, '5.9': 10, '5.10a': 11,'5.10b': 12, '5.10c': 13, '5.10d': 14, '5.11a': 15, '5.11b': 16, '5.11c': 17, '5.11d': 18, '5.12a': 19, '5.12b': 20, '5.12c': 21, '5.12d': 22, '5.13a': 23, '5.13b': 24, '5.13c': 25, '5.13d': 26, '5.14a' : 27, '5.14b': 28, '5.14c': 29, '5.14d': 30, '5.15a': 31, '5.15b': 32, '5.15c': 33, '5.15d': 34 }
    var boulderScale = { 'v0': 1, 'v1': 2, 'v2': 3, 'v3': 4, 'v4': 5, 'v5': 6, 'v6': 7, 'v7': 8, 'v8': 9, 'v9': 10, 'v10': 11, 'v11': 12, 'v12': 13, 'v13': 14, 'v14': 15, 'v15': 16, 'v16': 17 }
    var iceScale = { 'WI1': 1, 'WI2': 2, 'WI3': 3, 'WI4': 4, 'WI5': 5, 'WI6': 6, 'WI7': 7, 'WI8': 8, 'AI1': 9, 'AI2': 10, 'AI3': 11, 'AI4': 12, 'AI5': 13, 'AI6': 14 }


    $scope.searchIP = function(ip) {
      var url = "https://freegeoip.net/json/" + ip;
      $http.get(url).success(function(res) {
        $scope.center_boulder = { lat: res.latitude, lng: res.longitude, zoom: 12 };
        $scope.ip = res.ip;
      });
    };

    function markerInRange(type, marker, settings) {
      switch (type) {
        case 'Rock':
        var markerValue = rockScale[marker.grade]
        var lowerScale = rockScale[settings.rock_grade_min]
        var upperScale = rockScale[settings.rock_grade_max]
        if (markerValue >= lowerScale && markerValue <= upperScale) {
          return true;
        } else {
          return false;
        }
        break;
        case 'Boulder':
        var markerValue = boulderScale[marker.grade]
        var lowerScale = boulderScale[settings.boulder_grade_min]
        var upperScale = boulderScale[settings.boulder_grade_max]
        if (markerValue >= lowerScale && markerValue <= upperScale) {
          return true;
        } else {
          return false;
        }
        break;
        case 'Ice':
        var markerValue = iceScale[marker.grade]
        var lowerScale = iceScale[settings.ice_grade_min]
        var upperScale = iceScale[settings.ice_grade_max]
        if (markerValue >= lowerScale && markerValue <= upperScale) {
          return true;
        } else {
          return false;
        }
        break;
        default:
        return true;
      }
    }

    // responding to a change in the filter dropdowns
    $scope.$watch(function(){
      return $scope.filter
    }, function(updatedFilterSettings) {
      // when page first loads draw all markers
      if($scope.markers.length === 0) {
        MapService.getMarkers()
        .then(function(markers){
          // hold onto orignal markers
          $scope.markers = markers;
          // because we don't need to filter yet set filteredMarkerArr to all markers
          $scope.filteredMarkerArr = $scope.markers;
        })
      } else {
        // if real filter is applied - run filter on markers
        $scope.filteredMarkerArr = $scope.markers.filter(function(marker) {
          // if this function returns true then the marker is good and in range
          if (markerInRange(marker.type, marker, updatedFilterSettings)) {
            return marker;
          }
        })
      }
      // check for deep equality and makes sure $scope.$watch is ran for every change of $scope.filter
    }, true)

    // Listens to a click envent to add marker
    $scope.$on("leafletDirectiveMap.click", function(event, args){
      var leafEvent = args.leafletEvent;
      $rootScope.$broadcast('populateAndOpenSideNav', leafEvent);
      $scope.filteredMarkerArr.push({
        lat: leafEvent.latlng.lat,
        lng: leafEvent.latlng.lng,
        focus: true,
        message: 'New Route',
        icon:  {
          iconUrl: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Ball-Azure-icon.png',
          iconSize: [55, 55] // size of the icon
        }
      });
    });


    // responding to a submission of a new marker or a close of the sidenav
    // redraw markers on close
    $rootScope.$on('redrawMarkers', function(event, leafEvent) {
      MapService.getMarkers()
      .then(function(markers){
        $scope.markers = markers;
        $scope.filteredMarkerArr = $scope.markers.filter(function(marker) {
          if (markerInRange(marker.type, marker, $scope.filter)) {
            return marker;
          }
        })
      })
      .catch(function(err){
        console.log('markers', err);
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


    setTimeout(function() {
      MapService.gettingShitDone()
      .then(function(res){
        $scope.getShitDone = res.data;
      })
      .catch(function(err){
        console.log(err);
      })
    }, 500);



    $scope.currentModalItem;

    var mdDialogCtrl = function ($scope, currentModalItem) {
      $scope.currentModalItem = currentModalItem
      $scope.isLockedOpen = function() {
        console.log('CALLED OPEN');
      }
    }

    console.log(  'is this really my life?',   $mdDialog);

    $scope.openFromLeft = function(item) {
      var body = document.body;
      var info = document.body.querySelector('.leaflet-control-attribution');
      body.style.overflow = 'hidden';
      info.style.display = 'none';
      $scope.currentModalItem = item;

      MapService.grabRoutes($scope.currentModalItem.climbing_area)
      .then(function(res){
        $scope.currentModalItem.routesForArea = res.data;
      })
      .catch(function(err){
        console.log(err);
      })
      $mdDialog.show(
        $mdDialog.alert({
          controller: mdDialogCtrl,
          templateUrl: '../../templates/modal_templates/routes_template.html',
          locals:{currentModalItem: $scope.currentModalItem}
        })
        .clickOutsideToClose(true)
        .escapeToClose(true)
        // You can specify either sting with query selector
        .openFrom('#left')
        // or an element
        .closeTo(angular.element(document.querySelector('#left')))
      ).finally(function(){
        var body = document.body;
        body.style.overflow = 'scroll';
        info.style.display = 'block';
      });
    };


  }


}())
