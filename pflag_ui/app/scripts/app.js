'use strict';

/**
 * @ngdoc overview
 * @name pflagUiApp
 * @description
 * # pflagUiApp
 *
 * Main module of the application.
 */
angular
  .module('pflagUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/init.html',
        controller: 'InitCtrl',
        controllerAs: 'init'
      })
      .when('/chat', {
        templateUrl: 'views/chat.html',
        controller: 'ChatCtrl',
        controllerAs: 'chat'
      })
      .when('/choose', {
        templateUrl: 'views/choose.html',
        controller: 'ChooseCtrl',
        controllerAs: 'choose'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/message', {
        templateUrl: 'views/message.html',
        controller: 'MessageCtrl',
        controllerAs: 'message'
      })
      .when('/msg', {
        templateUrl: 'views/msg.html',
        controller: 'MsgCtrl',
        controllerAs: 'msg'
      })
      .when('/no_one', {
        templateUrl: 'views/no_one.html',
        controller: 'NoOneCtrl',
        controllerAs: 'noOne'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignUpCtrl',
        controllerAs: 'signUp'
      })
      .when('/sorry', {
        templateUrl: 'views/sorry.html',
        controller: 'SorryCtrl',
        controllerAs: 'sorry'
      })
      .when('/trying', {
        templateUrl: 'views/trying.html',
        controller: 'TryingCtrl',
        controllerAs: 'trying'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('PFlagCtrl', [ '$scope', '$location', function ($scope, $location) {
    
  }
]);
