/** Host Service **/
 angular.module('hestia.services')
 
 .service('HostService',function($http){

	/**  **/
	this.getHostInfo = function(hostID,callback){
		$http({
			url:'/api/database/host/info/'+hostID,
			method:'GET',
		}).success(function(data, status, headers, config){
			callback({error:false,data:data});
		}).error(function(){
			callback({error:true});
		});
	};

	/**  **/
	this.getDatabasesHost = function(hostID,callback){
		$http({
			url:'/api/database/host/' + hostID + '/databases/',
			method:'GET',
		}).success(function(data, status, headers, config){
			callback({error:false,data:data});
		}).error(function(){
			callback({error:true});
		});
	};

	/**  **/
	this.getHosts = function(callback){
		$http({
			url:'/api/local/hosts/',
		}).success(function(data, status, headers, config){
			callback({error:false,data:data.result});
		}).error(function(){
			callback({error:true});
		});
	};

	this.addHost = function(model,callback){
		$http({
			url:'/api/local/hosts/add/',
			method:'POST',
			data:model,
		}).success(function(data, status, headers, config){
			if(data.error !== undefined && data.error === false){
				callback({error:false});
			}else{
				callback({error:true});
			}
		}).error(function(){
			callback({error:true});
		});
	};
});
