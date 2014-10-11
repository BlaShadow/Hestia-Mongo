/*
 * Setting Controller 
 *
 **/
 
angular.module('hestia.controllers')

.controller('SettingCtrl',['$scope','SettingService',function($scope,SettingService){
	
	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":false,'value':'Setting',"href":"/"}
	];

	$scope.connections = [];

	$scope.getConnections = function(){
		SettingService.getConnections(function(result){
			if( result.error === false ){
				console.log(result);
				$scope.connections = result.data;
			}else{
				console.log('Error getting currents connections');
			}
		});
	};

	$scope.canFlushConnections = function(){
		return $scope.connections.length !== 0;
	};

	$scope.flushConnections = function(){

		var answer = confirm('Sure to flush all connections?');

		if( answer === true ){
			SettingService.flushConnections(function(result){
				if(result.error === false){
					alert('Connections flushes');
					window.location.reload();
				}else{
					alert('Error');
				}
			});
		}
	};
}]);