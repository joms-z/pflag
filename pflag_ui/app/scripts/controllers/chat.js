'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the pflagUiApp
 */
angular.module('pflagUiApp')
  .controller('ChatCtrl', ['$scope', '$http', function ($scope, $http) {
    
		var socketio = null;
		var mentor = confirm("mentor");
		var name = "";

		if(mentor){
			var waitingForClient = true;
			socketio = io.connect("localhost:5000", {query: 'v='+1});
		}else{
			var waitingForMentor = false;
			socketio = io.connect("localhost:5000", {query: 'v='+0});
		}

		if(socketio){
			console.log("Connected!");
		}

    socketio.on("message_received", function(data) {
        console.log(data);
    });

		$scope.submitMessage = function(){
			socketio.emit("message", { 
				message : $scope.message,
				name: name,
			});
			$scope.message = "";
		}
		
		$scope.historicalChats = [];
		$scope.currentUser = "t12useron";
		/*
		(function () {
			$http.get('/loadChats').success(function (data, status) {
    		console.log('Logged in successfully');
            $scope.historicalChats = data;
            console.log("data");
    	}).error(function (data, status) {
    		console.log('FAILED WITH DATA: ' + data + ' STATUS: ' + status);
    	});
	})(); 
	*/
  }]);
