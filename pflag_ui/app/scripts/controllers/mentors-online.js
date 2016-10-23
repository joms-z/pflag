'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:MentorsOnlineCtrl
 * @description
 * # MentorsOnlineCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
	.controller('MentorsOnlineCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
	$http.get('http://localhost:5000/get-mentors').success(function (data, status) {
			$scope.mentors = data
			console.log(data)
			if (!data.length)
				$location.path('/no_one')
		}).error(function (data, status) {
			console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
		});
	}]);


