/*
 * User local controller 
 *
 **/

angular.module('hestia.controllers')

.controller('UserAddCtrl',['$scope','$location','UserService',function($scope,$location,UserService){
	
	$scope.user = {};

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":false,'value':'Users',"href":"/users/"},
		{"active":true,'value':'Create',"href":"/users/add/"},
	];

	$scope.save = function(isValid){
		
		if(isValid === true){
			var model = $scope.user;

			UserService.createUser(model,function(result){

				if(result.error === true){
					alert('Error');
				}else{
					$scope.user = {};
					alert('User added');

					$location.path('/users');
				}
			});
		}
	};
}]);