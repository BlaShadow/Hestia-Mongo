/** Util service **/
 angular.module('hestia.services')
 
 .service('Util',function(){

	this.parse = function(obj){

	    if(obj != undefined && obj["$$hashKey"] != undefined){
	        delete obj["$$hashKey"];
	    }
	        
	    return JSON.stringify(obj,null,4);
	}
	
	this.parseData = function(bytes){
		var finalLabel = "";
		
		if(bytes < 1024){
			finalLabel = bytes.toFixed(2) + " bytes";
		}else{
			bytes = bytes / 1024;
			if( bytes < 1024 ){
				finalLabel = bytes.toFixed(2) + " KB";
			}else{
				finalLabel = (bytes / 1024).toFixed(2) + " MB";
			}
		}
		
		return finalLabel;
	};

	this.pager = function(pagerObj){
		var current = pagerObj.current;
		
		var maxPage = Math.ceil( pagerObj.total / pagerObj.perPage  );

		if(current > 1 && current < maxPage){
			
			return [current -1, current, current+1]

		}else if(current == 1 && Math.ceil( pagerObj.total / pagerObj.perPage  ) < 2 ){
			return [1];
		}else if( current >= Math.ceil( pagerObj.total / pagerObj.perPage  ) ){

			return [current - 1, current];			
		}

		return [current, current+1]
	}
})
