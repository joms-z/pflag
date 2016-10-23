'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:TryingCtrl
 * @description
 * # TryingCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
    .controller('CallCtrl', ['$scope', '$http', function ($scope, $http) {
        $http.get('/call').success(function (data, status) {
            console.log("called");
        }).error(function (data, status) {
            console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
        });
    }]);
