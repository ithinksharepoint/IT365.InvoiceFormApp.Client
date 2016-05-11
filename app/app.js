'use strict';

var invoiceFormApp = angular.module('itspInvoiceFormApp',
[
   'ngRoute', 'invoiceControllersModule', 'dataModelService', 'AdalAngular', 'configurationServiceModule'
]);

var appStart = function($routeProvider, $httpProvider, adalProvider, applicationConstants) {
       
    $routeProvider.when('/invoices/add', {
        templateUrl:'/app/views/add-invoice.html',
        controller: 'addInvoiceController',
        requireADLogin: true
       }).when('/invoices', {
        templateUrl:'/app/views/list-invoices.html',
        controller: 'listInvoicesController',
        requireADLogin: false
       }).otherwise({
        redirectTo: '/invoices'
    });
    
    var instance=applicationConstants.instance; 
    var clientId=applicationConstants.clientId;
    var tenantName=applicationConstants.tenantName;
    var endPoints=applicationConstants.endPoints;
    
    
    
    adalProvider.init({
        instance: instance, 
        tenant: tenantName,
        clientId: clientId,
        endPoints: endPoints,
        anonymousEndpoints:{},
        extraQueryParameter: 'nux=1',
        cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
    }, $httpProvider); 
    
    
};

    
invoiceFormApp.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', 'applicationConstants', appStart]);
