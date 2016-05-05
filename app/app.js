'use strict';

var invoiceFormApp = angular.module('itspInvoiceFormApp',
[
   'ngRoute'
]);

var configurationProvider = function($routeProvider) {
       
    $routeProvider.when('/invoices', {
        templateUrl:'/app/views/list-invoices.html',
        controller: 'listInvoicesController'
       }).otherwise({
        redirectTo: '/invoices'
    });
    
    
};

    
invoiceFormApp.config(['$routeProvider'], routeProvider);
