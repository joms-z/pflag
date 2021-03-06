'use strict';

/**
 * @ngdoc function
 * @name pflagUiApp.controller:ChatCtrl
 * @description
 * # ChatCtrl
 * Controller of the pflagUiApp
 */

// The polling function
function poll(fn, timeout, interval) {
    var dfd = new Deferred();
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
            // If the condition is met, we're done!
            if(fn()) {
                dfd.resolve();
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(p, interval);
            }
            // Didn't match and too much time, reject!
            else {
                dfd.reject(new Error('timed out for ' + fn + ': ' + arguments));
            }
    })();

    return dfd.promise;
}

angular.module('pflagUiApp')
  .controller('ChatCtrl', ['$scope', '$http', '$document', function ($scope, $http, $document) {
    $scope.waitingForMentor = true;
		var socketio = null;
		$scope.name = $scope.$parent.username;
		$scope.isVolunteer = false;

		if( $scope.$parent.isMentor ){
			$scope.isVolunteer = true;
			var waitingForClient = true;
			socketio = io.connect("localhost:5000", {query: 'v='+1+'&name='+$scope.name});
			$scope.waitingForMentor = false;
		}else{
			if(!$scope.name){
				$scope.name = "A Cute Potato";
			}

			socketio = io.connect("localhost:5000", {query: 'v='+0+'&name='+$scope.name});

			socketio.emit("isMatch",{ name:$scope.name });

			socketio.on("isMatch", function(data) {
				if(!data.isMatch){
					setTimeout(function(){
						socketio.emit("isMatch",{});
					}, 1000);
				}else{
					setWaitingForMentor(false);
				}
			});
		}

		function setWaitingForMentor(value){
			$scope.waitingForMentor = value;
			$scope.$digest();
		}

		if(socketio){
			console.log("Connected!");
		}

    socketio.on("message_received", function(data) {
        $scope.historicalChats.push(data);
				$scope.$digest();
    });

		socketio.on("new_chat", function(data) {
				$scope.historicalChats.push({
					message : data.with,
					name: $scope.name,
					simple: true
				});
				$scope.$digest();
    });

		socketio.on("disconnected", function(data) {
				$scope.historicalChats.push({
					message : data.with,
					name: $scope.name,
					simple: true,
					disconnected: true
				});
				$scope.$digest();
    });

		$scope.submitMessage = function(){
			socketio.emit("message", {
				message : $scope.message,
				name: $scope.name,
			});
			$scope.historicalChats.push({
				message : $scope.message,
				name: $scope.name,
			});

			$scope.message = "";
			$scope.$digest();
		}

		$scope.historicalChats = [];

		$scope.$on("$destroy", function() {
			socketio.disconnect();
			socketio = null;
		});
  }]);
