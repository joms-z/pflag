'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:SignUpCtrl
 * @description
 * # SignUpCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('SignUpCtrl', ['$scope', '$location', '$http', function ($scope, $location, $http) {
     
    $scope.username = '';
    $scope.password = '';
    $scope.confirmPassword = '';

    $scope.register = function () {
    	if ($scope.username != '' && $scope.password != '' && $scope.password == $scope.confirmPassword) {
    		var data = {
    			username: $scope.username,
    			password: $scope.password,
    			isMentor: true //TODO: Make dynamic for admin user
    		};

    		$http.post('http://localhost:5000/register', data).success(function (data, status) {
    			console.log('Registered successfully');
            	$location.path('/chat');
    		}).error(function (data, status) {
    			console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
    		});
    	}
    }
  }]);
