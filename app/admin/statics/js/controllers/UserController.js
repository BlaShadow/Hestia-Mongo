/*
 * User local controller 
 *
 **/

angular.module('hestia.controllers')

.controller('UsersCtrl',['$scope','$http','$location','UserService',function($scope,$http,$location,UserService){

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":true,'value':'Users',"href":"/users/"},
	];

	$scope.addUser = function(){
		$location.path("/users/add/");
	};

	$scope.getUsers = function(){
		UserService.getUsers(function(result){
			if(result.error === true){
				console.log('Error');
			}else{
				$scope.userList = result.data;	
			}
		});
	};
}]);
