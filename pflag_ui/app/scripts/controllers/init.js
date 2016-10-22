'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:InitCtrl
 * @description
 * # InitCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('InitCtrl', [$scope, $location, function ($scope, $location) {
  		$scope.goToLogin = function () {
  			$location.path('/login');
  		};
  }]);
