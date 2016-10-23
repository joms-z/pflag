'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
	.controller('ProfileCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
		$scope.save = function() {

			var data = {
				username: $scope.$parent.username,
				profile: $scope.$parent.profile
			};
			console.log(data);
			$http.post('http://localhost:5000/save-profile', data).success(function (data, status) {
				console.log('Updated profile successfully');
				$location.path('/choose');
			}).error(function (data, status) {
				console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
			});
		}
}]);
