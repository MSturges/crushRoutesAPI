(function() {
  'use strict';

  angular.module('crushingRoutes')
  .config(routes);

  routes.$inject = [
    '$stateProvider',
    '$urlRouterProvider',
    '$locationProvider',
    '$httpProvider'
  ]

  function routes($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider){

    //if you want interceptors for JWT tokens you need to create an interceptor service
    // $httpProvider.interceptors.push("TokenInterceptor");

    $stateProvider
    .state('landing', {
      url: "/",
      template: "<landing-directive></landing-directive>"
    })

    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("/")

  }

}())
