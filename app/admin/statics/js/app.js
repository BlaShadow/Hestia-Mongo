
/*
 * App module
 *
 **/

var hestiaApp = angular.module('hestia',['ngRoute','hestia.controllers','hestia.directives'])

.config(function($routeProvider,$interpolateProvider){
	console.log('config');

	$interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

    $routeProvider
    .when('/home',{
    	controller:'HomeCtrl',
        templateUrl:'/views/home.html'
    })
    .when('/users/',{
        controller:'UsersCtrl',
        templateUrl:'/views/user/users.html',
    })
    .when('/users/add',{
    	controller:'UserAddCtrl',
    	templateUrl:'/views/user/users_add.html',
    })

    .when('/hosts',{
    	controller:'HostsCtrl',
    	templateUrl:'/views/host/hosts.html',
    })
    
    //host view
    .when('/hosts/:id/view',{
        controller:'HostViewCtrl',
        templateUrl:'/views/host/view.html'
    })
    
    .when('/hosts/add/',{
        controller:'HostsAddCtrl',
        templateUrl:'/views/host/hosts_add.html',
    })


    //host databases
    .when('/hosts/:id/database/:dataBaseName',{
        controller:'HostDataBaseCtrl',
        templateUrl:'/views/host/host_database_details.html'
    })

    .when('/hosts/:id/database/:dataBaseName/collection/:collectionName',{
        controller:'HostCollectionCtrl',
        templateUrl:'/views/host/host_collection_details.html'
    })


    /** setting  **/

    .when('/setting',{
        controller:'SettingCtrl',
        templateUrl:'/views/setting.html'
    })

    .otherwise({
    	redirectTo: '/home',
    });
})

.run(function($rootScope){
    $rootScope.merge = function(obj1,obj2){
        var obj3 = {};

        for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
        for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }

        return obj3;
    }
});

