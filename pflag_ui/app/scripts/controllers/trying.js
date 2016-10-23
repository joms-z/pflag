'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:TryingCtrl
 * @description
 * # TryingCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('TryingCtrl',['$location', '$timeout', function ($location, $timeout) {
    (function () {
        $timeout(function() {
            $location.path('/sorry');
        }, 3000);
    })();
  }]);
