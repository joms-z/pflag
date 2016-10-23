'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:MentorsOnlineCtrl
 * @description
 * # MentorsOnlineCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
	.controller('MentorsOnlineCtrl', ['$scope', '$http', function ($scope, $http) {
	$http.get('http://localhost:5000/get-mentors').success(function (data, status) {
			console.log(data);
			$scope.mentors = data
		}).error(function (data, status) {
			console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
		});
	}]);


