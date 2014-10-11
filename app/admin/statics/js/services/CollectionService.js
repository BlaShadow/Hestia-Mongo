/* 
 * collection service 
 *
 **/
 angular.module('hestia.services')
 
 .service('CollectionService',function($http){

	this.deleteCollection = function(hostID,dbName,collection,callback){
		$http({
			url:'/api/database/host/'+ hostID +'/database/' + dbName + '/collection/'+ collection + '/',
			method:"DELETE",
		}).success(function(){
			callback({error:false});
		}).error(function(){
			callback({error:true});
		});
	};

	this.deleteDeletedocument = function(hostID,dbName,collection,document,callback){
		$http({
			url:'/api/database/host/'+ hostID +'/database/' + dbName + '/collection/'+collection+'/document/',
			method:'DELETE',
			data:{
				"document": document,
			},
			headers: {
				"Content-Type": "application/json"
			}
		}).success(function(data, status, headers, config){
			callback({error:false,result:data});
		}).error(function(){
			callback({error:true,result:null});
		});
	};

	this.getCollectionInfo = function(hostID,dbName,collection,callback){
		$http({
			url:'/api/database/host/'+ hostID +'/database/' + dbName + '/collection/'+collection + '/',
			method:'GET',
		}).success(function(data, status, headers, config){
			console.log('Collection Info');
			
			callback({error:false,data:data});
		})
		.error(function(){
			callback({error:true,result:null});
			console.log('Error getting database info');
		});
	};

	this.createDocument = function(document,hostID,dbName,collection,callback){
		data = {
			raw:document
		}

		$http({
			url:'/api/database/host/'+hostID+'/database/'+ dbName +'/collection/'+ collection +'/document/',
			method:'POST',
			data:data
		}).success(function(data,status,headers,config){
			callback({error:false});
		}).error(function(){
			callback({error:true});
		});
	};

	this.updateDocument = function(document,hostID,dbName,collection,callback){
		$http({
			url:'/api/database/host/'+hostID+'/database/'+ dbName +'/collection/'+ collection +'/document/',
			method:'PUT',
			data:{
				raw:document,
			}
		}).success(function(data,status,headers,config){
			callback({error:false});
		}).error(function(error){
			callback({error:true});
		});
	};

	this.createIndex = function(indexes,hostID,dbName,collection,callback){

		$http({
			url:'/api/database/host/'+ hostID +'/database/' + dbName + '/collection/'+ collection +'/indexes/',
			data:indexes,
			method:"POST",
		}).success(function(data,status,headers,config){
			callback({error:false});
		}).error(function(error){
			callback({error:true});
		});
	};


	/**  **/
	this.removeIndex = function(params,hostID,dbName,collection,callback){

		$http({
			url:"/api/database/host/"+ hostID + '/database/'+dbName+'/collection/'+collection + '/indexes/',
			method:'DELETE',
			data:params,
			headers: {
				'Content-Type': 'application/json'
			}
		}).success(function(){
			callback({error:false});
		}).error(function(){
			callback({error:true});
		});	
	};

	this.removeCollection = function(hostID,dbName,collection,callback){
		$http({
			url:'/api/database/host/'+ hostID +'/database/' + dbName + '/collection/'+ collection + '/',
			method:"DELETE",
		}).success(function(){
			callback({error:false});
		}).error(function(){
			callback({error:false});
		});
	};

	this.queryCollection = function(criteria,page,hostID,dbName,collection,callback){
		var params = {
			page:page,
			criteria:criteria,
		};

		$http({
			url:'/api/database/host/'+ hostID +'/database/' + dbName + '/collection/'+collection + '/query/',
			method:'POST',
			data:params,
		}).success(function(data, status, headers, config){

			console.log('Collection Documents');

			callback({
				error:false,
				data:{
					queryResult:data.result,
					total:data.collection_count
				}
			});
		})
		.error(function(){
			callback({
				error:true,
				data:null
			});
		});
	};
});