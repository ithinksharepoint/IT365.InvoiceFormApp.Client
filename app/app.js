'use strict';

var invoiceFormApp = angular.module('itspInvoiceFormApp',
[
   'ngRoute', 'invoiceControllersModule', 'dataModelService'
]);

var appStart = function($routeProvider) {
       
    $routeProvider.when('/invoices/add', {
        templateUrl:'/app/views/add-invoice.html',
        controller: 'addInvoiceController'
       }).when('/invoices', {
        templateUrl:'/app/views/list-invoices.html',
        controller: 'listInvoicesController'
       }).otherwise({
        redirectTo: '/invoices'
    });
    
    
};

    
invoiceFormApp.config(['$routeProvider', appStart]);
