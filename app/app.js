'use strict';

var invoiceFormApp = angular.module('itspInvoiceFormApp',
[
   'ngRoute', 'invoiceControllersModule'
]);

var appStart = function($routeProvider) {
       
    $routeProvider.when('/invoices', {
        templateUrl:'/app/views/list-invoices.html',
        controller: 'listInvoicesController'
       }).otherwise({
        redirectTo: '/invoices'
    });
    
    
};

    
invoiceFormApp.config(['$routeProvider', appStart]);
