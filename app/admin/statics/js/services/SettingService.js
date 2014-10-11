/** Setting service **/
 angular.module('hestia.services')
 
 .service('SettingService',function($http){
	
	this.getConnections = function(callback){
		$http({
			url:'/api/database/connections/',
			type:'GET',
		}).success(function(data){
			callback({error:false,data:data})
		}).error(function(){
			callback({error:false})
		});
	}

	this.flushConnections = function(callback){
		$http({
			url:'/api/database/connections/flush',
			type:'GET',
		}).success(function(){
			callback({error:false})
		}).error(function(){
			callback({error:false})
		});
	}
});