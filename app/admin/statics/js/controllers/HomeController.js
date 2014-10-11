/*
 * Home controller 
 *
 **/
 
angular.module('hestia.controllers')

.controller('HomeCtrl',['$scope','HomeService',function($scope,HomeService){
	
	$scope.users = 'App controller';

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
	];

	$scope.getLoggendUser = function(){
		HomeService.getCurrentUser(function(user){
			$scope.user = user;	
		});
	};

	$scope.getStast = function(){
		HomeService.getStast(function(result){
			if(result.error === false){
				$scope.stats = result.data;
			}
		});
	};
}]);
