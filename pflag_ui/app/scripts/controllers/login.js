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
				$scope.$parent.username = $scope.username;
				$scope.$parent.isMentor = data.isMentor;
				$scope.$parent.profile = data.profile;
				// $scope.$parent.profile.bio = data.bio;
				// $scope.$parent.profile.isParent = data.isParent;
				// $scope.$parent.profile.isLgbtq = data.isLgbtq;
				// $scope.$parent.profile.isYouth = data.isYouth;
			}).error(function (data, status) {
				console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
			});
		};

	}]);
