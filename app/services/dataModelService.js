'use strict'
var dataModelService = angular.module('dataModelService', []);

dataModelService.service('dataModelService', [dataModelServiceFactory]);
dataModelService.provider('dataModelService', function dataModelServiceProvider(){
    this.$get = [function initDataModelService(){
        var service=new dataModelServiceFactory();
        return service;
    }];
});

function dataModelServiceFactory()
{
    var factory={};
    factory.Invoice = function invoiceConstructor() {
        
        var invoiceObject={
            reference: '',
            companyName: '',
            invoiceDate: '',
            contact:'',
            addressLine1:'',
            addressLine2:'',
            addressLine3:'',
            addressLine4:'',
            addressCity:'',
            addressCounty:'',
            addressPostCode:'',
            addressCountry:'',
            agencyName:'',
            agencyContact: '',
            invoiceLines: [
                new factory.InvoiceLine() 
            ],
            invoiceTotal:0,
            currencyType:'£',
            vatRate:0,
            vatAmount:0,
            invoiceTotalWithVat:0,
            status:'',
            createdBy:'',
            modifiedBy:'',
            created:'',
            modified:''
        };
        
        return invoiceObject;  
    };
    
    factory.InvoiceLine = function invoiceLineConstructor() {
        var invoiceLine = {
            description: '', unitQuantity: 0, unitType:'', unitValue:0, lineTotal:0, updateLineTotal: function() {
                    this.lineTotal=this.unitValue*this.unitQuantity;
                    return true;
            }
        };
        return invoiceLine;
    }
    
    return factory;
};