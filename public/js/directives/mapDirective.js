(function() {
  'use strict';

  angular.module('crushingRoutes')
  .directive('mapDirective', mapDirective)

  function mapDirective () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: '../../templates/map_template.html',
      controller: 'MapController'
    }
  }

}())
