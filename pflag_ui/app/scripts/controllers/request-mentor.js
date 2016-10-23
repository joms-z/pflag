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
			var data = {
				username: $scope.$parent.username
			};
			$http.post('http://localhost:5000/request-mentor', data).success(function (data, status) {
				console.log('Requesting to be a mentor successful');
				$scope.$parent.isMentor = true;
				$location.path('/profile');
			}).error(function (data, status) {
				console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
			});
		}
	}]);
