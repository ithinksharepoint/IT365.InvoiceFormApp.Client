'use strict';

var invoiceFormApp = angular.module('itspInvoiceFormApp',
[
   'ngRoute', 'invoiceControllersModule', 'dataModelService', 'AdalAngular', 'applicationConstantsModule', 'configurationServiceModule', 'settingsController', 'invoiceDataService'
]);

var appStart = function($routeProvider, $httpProvider, adalProvider, applicationConstants, configurationServiceProvider) {
       
    $routeProvider.when('/invoices/add', {
        templateUrl:'/app/views/add-invoice.html',
        controller: 'addInvoiceController',
        requireADLogin: true
       }).when('/invoices/:invoiceid/view', { 
        templateUrl: '/app/views/invoice-display.html',
        controller: 'viewInvoiceController',
        requireADLogin: true        
        }).when('/invoices/:invoiceid/edit', {
        templateUrl:'/app/views/edit-invoice.html',
        controller: 'editInvoiceController',
        requireADLogin: true        
        }).when('/invoices', {
        templateUrl:'/app/views/list-invoices.html',
        controller: 'listInvoicesController',
        requireADLogin: false
       }).when('/settings', {
        templateUrl:'/app/views/settings.html',
        controller: 'settingsController',
        requireADLogin: true
       }).otherwise({
        redirectTo: '/invoices'
    });
    
    var instance=applicationConstants.instance; 
    var clientId=applicationConstants.clientId;
    var tenantName=applicationConstants.tenantName;
    var endPoints=applicationConstants.endPoints;
    var apiUrl = applicationConstants.apiUrl;
    
    configurationServiceProvider.init(apiUrl, tenantName, clientId, endPoints);
    
    adalProvider.init({
        instance: instance, 
        tenant: tenantName,
        clientId: clientId,
        endpoints: endPoints,
        anonymousEndpoints:{},
        extraQueryParameter: 'nux=1',
        cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
    }, $httpProvider); 
    
    
};

    
invoiceFormApp.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', 'applicationConstants', 'configurationServiceProvider', appStart]);
