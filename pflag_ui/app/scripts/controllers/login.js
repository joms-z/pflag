'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
	.controller('LoginCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {

		$scope.username = "";
		$scope.password = "";

		$scope.loginFunction = function () {
			var data = {
				username: $scope.username,
				password: $scope.password
			};

			$http.post('http://localhost:5000/login', data).success(function (data, status) {
				console.log('Logged in successfully');
				console.log(data);
				$location.path('/choose');
				$scope.$parent.isLoggedIn = true;
				$scope.$parent.isMentor = data.isMentor;
				$scope.$parent.username = $scope.username;
			}).error(function (data, status) {
				console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
			});
		};

	}]);
