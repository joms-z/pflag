'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:MessageCtrl
 * @description
 * # MessageCtrl
 * Controller of the pflagUiApp
 */


angular.module('pflagUiApp')
  .controller('MessageCtrl', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {

  	$scope.message = '';
  	$scope.phone = '';
  	$scope.email = '';
  	$scope.messageSentText = '';

  	$scope.sendMessage = function () {
  		var data = {
  			message: $scope.message,
  			phone: $scope.phone,
  			email: $scope.email,
  			dateSent: new Date()
  		};

  		$http.post('http://localhost:5000/messageTo', data).success(function (data, status) {
  			$scope.messageSentText = 'Message sent successfully. Our volunteers will reach out to you shortly.';
  			$timeout(function() {
  				$location.path('/');
  			}, 3000);
  		}).error(function (data, status) {
  			$scope.messageSentText = 'Message sending unsuccessful. Please try again';
  			$timeout(function() {
  				$scope.messageSentText = '';
  			}, 2000);
  		});

  	};
  }]);
