/*
 * Directives 
 *
 **/
 
angular.module('hestia.directives')

.directive('repeatDone',function(){

	return function(scope,element,attrs){
		
		if(scope.$last){
			setTimeout(function(){
				scope.$eval(attrs.repeatDone)();	
			},100)
		}
	}
});