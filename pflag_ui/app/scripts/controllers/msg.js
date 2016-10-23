'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:MsgCtrl
 * @description
 * # MsgCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('MsgCtrl', ['$scope', '$http', function ($scope, $http) {

  		//This is only for debugging
  		function populateMockData () {
  			var data1 = {
  				message: 'Hi. This is Alex. I\'m not sure what to do, please reach out to me',
  				email: 'alex@gmail.com',
  				phone: '606-321-0982',
          isNew: true,
  				dateSent: new Date()
  			};

  			var data2 = {
  				message: 'This is Bethanie. I\'m in trouble with my parents. Can you contact me soon? Need advice',
  				email: 'beth.email@gmail.com',
  				phone: '901-234-3210',
          isNew: true,
  				dateSent: new Date()
  			};
  			$scope.messages.push(data1);
  			$scope.messages.push(data2);

  		};
  		//End debug
    	(function () {
        $scope.messages = [];
    		populateMockData();
    		$http.get('http://localhost:5000/getMessages').success(function (data, status) {
          console.log(data);
          console.log(status);
    			for (var looper = 0; looper < data.length; looper++) {
    				$scope.messages.push(data[looper]);
    			}
          console.log(data);
    		}).error(function (data, success) {
    			console.log('error fetching messages');
    		});
    	})();
  }]);
