'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:RequestMentorCtrl
 * @description
 * # RequestMentorCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('RequestMentorCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.requestMentorStatus = function() {
        console.log('you are requesting to be a mentor');
    }
  }]);
