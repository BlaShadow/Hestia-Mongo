/** Util service **/
 angular.module('hestia.services')
 
 .service('Util',function(){

	this.parse = function(obj){

	    if(obj != undefined && obj["$$hashKey"] != undefined){
	        delete obj["$$hashKey"];
	    }
	        
	    return JSON.stringify(obj,null,4);
	}

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