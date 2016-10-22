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

  		$http.post('/login', data).success(function (data, status) {
    		console.log('Logged in successfully');
            $location.path('/chat');
    	}).error(function (data, status) {
    		console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
    	});
  	};
    
  }]);
