'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:NoOneCtrl
 * @description
 * # NoOneCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('NoOneCtrl', ['$http', function ($http) {
    $scope.callToTwilio = function () {
  		$http.post('http://localhost:5000/call').success(function (data, status) {
            console.log("called");
        }).error(function (data, status) {
            console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
        });
  	};
  }]);
