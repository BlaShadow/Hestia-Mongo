/*
 * Host Create controller 
 *
 **/

angular.module('hestia.controllers')

.controller('HostsAddCtrl',['$scope','$http','$location','HostService',
function($scope,$http,$location,HostService){
	
	$scope.host = {};

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":false,'value':'Hosts',"href":"/hosts/"},
		{"active":true,'value':'Create',"href":"/hosts/add/"},
	];

	$scope.save = function(isValid){
		if(isValid === true){
			var model = $scope.host;

			HostService.addHost(model,function(result){
				if(result.error === true){
					alert('Error');
				}else{
					alert('success');

					window.location.reload(); 
				}
			});
		}
	};
}]);