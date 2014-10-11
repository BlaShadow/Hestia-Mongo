/*
 * Host database 
 *
 **/

angular.module('hestia.controllers')
 
.controller('HostDataBaseCtrl',['$scope','$route','$routeParams','$http','Util','DatabaseService',
function($scope,$route,$routeParams,$http,Util,DatabaseService){

	$scope.dbInfo = "Nice";
	$scope.collectionNameCreate = "";
	$scope.messageError = "Error manito";

	var id = $routeParams.id;
	var dbName = $routeParams.dataBaseName;

	$scope.DBName = dbName;
	$scope.hostID = id;

	$scope.collapse = function(target){
		var element = jQuery(target,document);

		element.collapse('toggle');
	};

	$scope.pretty = Util.parse;

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":false,'value':'Hosts',"href":"/hosts"},
		{"active":false,'value':'Host',"href":"/hosts/"+ id +"/view/"},
		{"active":true,'value':'DataBase',"href":"/hosts/"+ id +"/database/"+dbName},
	];

	/** **/
	$scope.createCollection = function(){
		
		var params = {
			collection_name:$scope.collectionNameCreate,
		};

		DatabaseService.createCollection(params,id,dbName,function(result){
			if(result.error === true){
				alert('Error');
			}else{
				alert('success');

				window.location.reload();
			}
		});
	};

	/** **/
	$scope.getCollections = function(){
		
		DatabaseService.getBataBaseCollection(id,dbName,function(result){
			if(result.error=== true){
				console.error('Error getting database info');
			}else{
				$scope.collections = result.data;

				var total = 0;

				for(var i=0;i<result.data.length;i++){
					total += result.data[i].stats.storageSize;
				}

				$scope.totalSize = total;
			}
		});
	};

	/** **/
	$scope.getDatabseInfo = function(){
		DatabaseService.getBataBaseInfo(id,dbName,function(result){
			if(result.error === true){
				console.error('Error loading databse information');
			}else{
				console.log('Databse information');

				$scope.dbInfo = result.data;
			}
		});
	};
}]);