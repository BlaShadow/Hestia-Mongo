/*
 * Collection controller 
 *
 **/
 
 angular.module('hestia.controllers')
 
 .controller('HostCollectionCtrl',['$window','$scope','$routeParams','$http','$location,Util','CollectionService',
function($window,$scope,$routeParams,$http,$location,Util,CollectionService){

	var id = $routeParams.id;
	var dbName = $routeParams.dataBaseName;
	var collName = $routeParams.collectionName;

	$scope.pretty = Util.parse;

	$scope.DBName = dbName;
	$scope.hostID = id;
	$scope.collectionName = collName;
	$scope.collectionInfo = {};

	$scope.breadcrumbs = [
		{"active":false,'value':'Home',"href":"/"},
		{"active":false,'value':'Hosts',"href":"/hosts"},
		{"active":false,'value':'Host',"href":"/hosts/"+ id +"/view/"},
		{"active":false,'value':'DataBase',"href":"/hosts/"+ id +"/database/"+dbName},
		{"active":true,'value':'Collection',"href":"/hosts/"+ id +"/database/"+dbName + "/collection" +  collName},
	];

	$scope.currentDocument = "Hola Mundo";

	$scope.pager = {
		current:1,
		total:1,
		perPage:10,
	};

	$scope.getPages = function(){
		return Util.pager($scope.pager);
	};

	$scope.actual = function(item){
		console.log('Actual ' + $scope.pager.current + ' Comp ' + item);
		return $scope.pager.current === item;
	};

	$scope.paginationPageLoad = function(page){

		if(page === 'last'){
			page = Math.ceil( $scope.pager.total / $scope.pager.perPage  );
		}

		$scope.pager.current = page;
		$scope.loadData($scope.q,page);
	};

	$scope.deleteDocument = function(){
		CollectionService.deleteDeletedocument(id,dbName,collName,$scope.currentDocument,function(result){
			if(result.error === true){
				alert('Error');
			}else{
				alert('Sucess');

				window.location.reload();
			}
		});
	};

	$scope.q = "";
	$scope.searchCriteria = "";

	/** get collection info **/
	$scope.getCollectionInfo = function(){
		CollectionService.getCollectionInfo(id,dbName,collName,function(result){
			if(result.error === true){
				console.log('Error getting collection info');
			}else{
				$scope.collectionInfo = result.data;
			}
		});
	};
	
	/** get collection first documents **/
	$scope.loadData = function(criteria,page){
		CollectionService.queryCollection(criteria,page,id,dbName,collName,function(result){
			if(result.error === true){
				alert('Query error');
			}else{
				$scope.collectionDocuments = result.data.queryResult;
				$scope.pager.total = result.data.total;
				$scope.q = "";
			}
		});
	};

	/** Search **/
	$scope.search = function(event){
		console.log(event);

		if(event.keyCode === 13){
			$scope.searchCriteria =  $scope.q;

			$scope.loadData($scope.searchCriteria,1);
		}
	};
	
	/*
	 * Wrap metho to handle creation of editor
	 **/
	var editorHandler = function(currentEditor){
        jQuery("#document-view-modal").modal("show");

        //clean modal container
        jQuery("#moda-content-source").html("<textarea id='modal-content-textarea' ng-model='currentDocument'></textarea>");

        var value = $scope.currentDocument = currentEditor.getValue();

        jQuery("#modal-content-textarea").val(value);

        /* set current editor */
        $scope.updateEditor = $scope.setCodeMirror(document.getElementById("modal-content-textarea"),true,function(){

        });
    };

	$scope.paintCodeMirror = function(){
		var elements = $window.document.getElementsByClassName("documentDetails");

		for(var i=0;i<elements.length;i++){
            
            var item = elements[i];

            $scope.setCodeMirror(item,false,editorHandler);
        }
	};

	$scope.setCodeMirror = function(item,autoFocus,onFocus){

        var properties =  {
            mode: "application/json",
            value:item.textContent,
            lineNumbers: true,
            lineWrapping: true,
            matchBrackets: true,
            styleActiveLine: true,
            theme:"blackboard",
            lint: true,
            gutters: ["CodeMirror-lint-markers"],
        };

        var editor = CodeMirror.fromTextArea(item,properties);

        editor.on("focus",function(editor){ 
        	return onFocus(editor);
        });

        if(autoFocus){
            editor.focus();
        }

        return editor;
    };


	/** document section (update) **/
	$scope.update = function(){
		
		var rawDocument = $scope.updateEditor.getValue();

		CollectionService.updateDocument(rawDocument,id,dbName,collName,function(result){
			if(result.error === true){
				alert('Error');
			}else{
				alert('Sucess');

				window.location.reload();
			}
		});
	};
	/**  end update document **/

	/** document section (create) **/
	$scope.newDocument = "";
	$scope.currentEditor = null;

	/** paint codemirror and set the place to create **/
	$scope.create = function(target){

		jQuery(target).modal('show');

		jQuery('#modal-create-content-source').html("<textarea id='text-area-new-document' ng-model='newDocument'> {} </textarea>");

		var element = document.getElementById('text-area-new-document');

		var editor = $scope.setCodeMirror(element,false,function(){

		});

		$scope.currentEditor = editor;
	};

	$scope.createDocument = function(){

		var data = $scope.currentEditor.getValue();

		CollectionService.createDocument(data,id,dbName,collName,function(result){
			if(result.error === true){
				alert('Error');
			}else{
				alert('Success');

				window.location.reload();
			}
		});
	};
	/** **/


	/** index section **/
	$scope.newIndexesModel = {
		"elements":[{
			field:"Element",
			type:1,
		}],
		"unique":true,
	};

	$scope.newElement = function(){
		$scope.newIndexesModel.elements.push({
			field:"Elemeny",
			type:1,
		});
	};

	$scope.removeElement = function(index){
		$scope.newIndexesModel.elements.splice(index,1);
	};

	$scope.createIndex = function(){

		var indexes = $scope.newIndexesModel;

		CollectionService.createIndex(indexes,id,dbName,collName,function(result){
			if(result.error === true){
				alert('Error');
			}else{
				alert('Success');

				window.location.reload();				
			}
		});
	};

	$scope.removeIndex = function(indexName){
		var answer = confirm("Sure to delete index?");

		if(answer === true){

			var params = {
				"index_name":indexName,
			};

			CollectionService.removeIndex(params,id,dbName,collName,function(result){
				if(result.error === true){
					alert('Error');
				}else{
					alert('Success');

					window.location.reload();				
				}
			});
		}
	};

	$scope.collapseIndex = function(reference){

		var element = jQuery(reference,document);

		element.collapse('toggle');
	};

	/**  **/

	/* Drop collection */
	$scope.deleteCollection = function(){
		
		var result = confirm("Sure to delete this collection?");

		if(result === true){
			CollectionService.deleteCollection(id,dbName,collName,function(result){
				if(result.error === true){
					alert('Error');
				}else{
					alert('Sucess');
					window.location.reload();
				}
			});
		}else{
			alert("False");
		}
	};
	/* end */
}]);







