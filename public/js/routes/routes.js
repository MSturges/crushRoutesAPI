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
    .state('home', {
      url: "/",
      template: "<home-directive></home-directive>"
    })

    .state('about', {
      url: "/about",
      template: "<about-directive></about-directive>"
    })
    .state('profile', {
      url: "/profile",
      template: "<profile-directive></profile-directive>"
    })

    .state('signup', {
      url: "/signup",
      template: "<signup-directive></signup-directive>"
    })

    .state('login', {
      url: "/login",
      template: "<login-directive></login-directive>"
    })

    $locationProvider.html5Mode(true)
    $urlRouterProvider.otherwise("/")

  }

}())
