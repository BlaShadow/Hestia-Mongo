/** User Service **/
 angular.module('hestia.services')
 
 .service('UserService',function($http){

	/**  **/
	this.getUsers = function(callback){
		$http({
			url:'/api/local/users/',
		}).success(function(data, status, headers, config){
			callback({error:false,data:data.result});
		}).error(function(){
			callback({error:false});
		});
	}

	/**  **/
	this.createUser = function(model,callback){
		$http({
			url:'/api/local/users/add/',
			data:model,
			method:'POST'
		}).success(function(data, status, headers, config){

			if(data.error != undefined && data.error === false){
				callback({error:false});
			}else{
				callback({error:false});
			}

		}).error(function(){
			callback({error:false});
		});
	}

})