'use strict';
var invoiceDataServiceModule = angular.module('invoiceDataService', ['AdalAngular', 'configurationServiceModule']);
invoiceDataServiceModule.service('invoiceDataService', ['$http', '$q', 'configurationService', 'adalAuthenticationService', invoiceDataServiceFactory]);

function invoiceDataServiceFactory($http, $q, configurationService, adalService)
{
    
    var invoiceDataServiceDefinition={};
    invoiceDataServiceDefinition.getInvoices=function getInvoices(){
        var url=configurationService.settings.apiUrl + "/invoice";
        console.log(adalService.userInfo);
        
        return $http.get(url);
    }
    
    invoiceDataServiceDefinition.getInvoice=function getInvoice(invoiceReference){
        var url=configurationService.settings.apiUrl + "/invoice/" + invoiceReference;
        return $http.get(url);
    }
    
    invoiceDataServiceDefinition.saveNewInvoice=function saveNewInvoice(invoiceNo, invoice) {
        var url=configurationService.settings.apiUrl + "/invoice/add";
        
        //update created by, modified by, created and modified
        invoice.createdBy=adalService.userInfo.userName;
        invoice.created = new Date();
        invoice.vatRate = configurationService.vatRate;
         var updatedInvoice = invoiceDataServiceDefinition.updateInvoiceMetadata(invoice);
        return invoiceDataServiceDefinition.executeSave(url, 'POST', updatedInvoice);
    }
    
    invoiceDataServiceDefinition.updateInvoice=function updateInvoice(invoiceNo, invoice){
        var url=configurationService.settings.apiUrl + "/invoice/" + invoiceNo;
        var updatedInvoice = invoiceDataServiceDefinition.updateInvoiceMetadata(invoice);
        return invoiceDataServiceDefinition.executeSave(url, 'PUT', updatedInvoice);
    }
    
    invoiceDataServiceDefinition.updateInvoiceMetadata = function updateInvoiceMetadata(invoice){
        //update created by, modified by, created and modified
        invoice.modifiedBy=adalService.userInfo.userName;
        invoice.modified = new Date();
        invoice.invoiceDate=new Date(invoice.invoiceDate);
        return invoice;
    }
    
    invoiceDataServiceDefinition.executeSave=function(url, method, invoice){
        var deferred = $q.defer();
        
        var dataPackage=JSON.stringify(invoice);
        $http({method:method, url:url, data:dataPackage}).then(function processSuccess(response){
            deferred.resolve("Successfully Save Invoice");
        },
        function processFailure(response){
            deferred.reject("Failed to update invoice: " + response.data.message);
        });
        
        return deferred.promise;
    }
    
    return invoiceDataServiceDefinition;
};