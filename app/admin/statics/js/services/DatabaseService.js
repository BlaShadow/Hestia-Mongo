/** Database Service  **/
 angular.module('hestia.services')
 
 .service('DatabaseService',function($http){

	/**  **/
	this.getBataBaseInfo = function(hostID,dbName,callback){
		$http({
			url:'/api/database/host/'+ hostID +'/database/' + dbName + '/info/',
			method:'GET',
		}).success(function(data, status, headers, config){
			callback({error:false,data:data});
		})
		.error(function(){
			callback({error:true});
		});
	};

	/** Create Batabase **/
	this.createDatabase = function(hostID,dbName,callback){
		$http({
			url:'/api/database/host/'+ hostID +'/database/',
			method:'POST',
			data:{
				name:dbName
			}
		}).success(function(){
			callback({error:false});
		}).error(function(){
			callback({error:true});
		});
	};

	/**  **/
	this.getBataBaseCollection = function(hostID,dbName,callback){
		$http({
			url:'/api/database/host/' + hostID + '/database/' + dbName + '/collections/',
			method:'GET',
		}).success(function(data, status, headers, config){
			callback({error:false,data:data});
		}).error(function(){
			callback({error:true});
		});
	}

	/**  **/
	this.createCollection = function(params,hostID,dbName,callback){
		$http({
			url:'/api/database/host/' + hostID + '/database/' + dbName + '/',
			data:params,
			method:'POST',
		}).success(function(data, status, headers, config){
			callback({error:false,data:data});
		}).error(function(data, status, headers, config){
			callback({error:true});
		});
	};
});