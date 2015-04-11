/*
 * Host controller 
 *
 **/

angular.module('hestia.controllers')

.controller('HostViewCtrl',['$scope','$http','$routeParams','Util','HostService','DatabaseService',
function($scope,$http,$routeParams,Util,HostService,DatabaseService){

	var id = $routeParams.id;

	$scope.hostName = 'Hola Host Name';
	$scope.hostID = id;

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":false,'value':'Hosts',"href":"/hosts"},
		{"active":false,'value':'Host',"href":"/hosts/"+ id +"/view/"},
	];

	$scope.pretty = Util.parse;

	/** util function to show data in a better way **/
	$scope.parseData = Util.parseData;

	$scope.collapse = function(target){
		
		var element = jQuery(target,document);

		element.collapse('toggle');
	};

	$scope.getHostInfo = function(){
		HostService.getHostInfo(id,function(result){
			if(result.error === true){

			}else{
				$scope.info = result.data;
			}
		});

	};

	$scope.showModal = function(target){
		jQuery(target).modal('show');
	};

	$scope.createDatabase = function(){

		var dbName = $scope.dbName;

		DatabaseService.createDatabase(id,dbName,function(result){
			if(result.error === true){
				alert('Error');
			}else{
				alert('success');

				window.location.reload();
			}
		});
	};

	$scope.getDatabasesHost = function(){
		HostService.getDatabasesHost(id,function(result){
			if(result.error === true){

			}else{
				$scope.databases = result.data;
			}
		});
	};
}]);