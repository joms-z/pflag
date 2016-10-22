'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('ChatCtrl', ['$scope', '$http', function ($scope, $http) {
		$scope.historicalChats = [];
		(function () {
			$http.get('/loadChats').success(function (data, status) {
    		console.log('Logged in successfully');
            $scope.historicalChats = data;
            console.log("data");
    	}).error(function (data, status) {
    		console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
    	});
	})(); 
  }]);
