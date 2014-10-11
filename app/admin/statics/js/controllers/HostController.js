/*
 * Host controller 
 *
 **/

angular.module('hestia.controllers')

.controller('HostsCtrl',['$scope','$http','HostService',function($scope,$http,HostService){

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":false,'value':'Hosts',"href":"/hosts"},
	];

	$scope.getHosts = function(){
		HostService.getHosts(function(result){
			if(result.error === true){

			}else{
				$scope.hosts = result.data;
			}
		});
	};
}]);