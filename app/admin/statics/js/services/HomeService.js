/** HomeService **/
 angular.module('hestia.services')
 
 .service('HomeService',function($http){
	
	this.getStast = function(callback){
		$http({
			url:'/api/local/stast',
			type:'GET'
		}).success(function(data){
			callback({error:false,data:data});
		}).error(function(){
			callback({error:true});
		});
	};

	this.getCurrentUser = function(callback){

		$http({
			url:"/manage/user",
			type:"GET",
		}).success(function(result){
			console.log(result.user);
			callback(result.user);
		}).error(function(){
			callback({user:"None"});
		});

	};

});