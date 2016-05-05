'use strict'

var invoiceControllersModule = angular.module('invoiceControllersModule', []);

invoiceControllersModule.controller('listInvoicesController', ['$scope', function ($scope) {
  $scope.invoices = [];
  $scope.error="";
  
  $scope.showInvoiceList=function(){
    return true;
    };
    
    function createInvoice(){
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
        modified:'',
    };
    return invoiceObject;       
    };
 
  $scope.load = function(){
      var invoice=createInvoice();
      invoice.reference="INV01";
      invoice.companyName="Contoso";
      invoice.agencyContact="Jack Black";
      invoice.vatRate=20;
      invoice.invoiceTotal=10000;
      
      
      $scope.invoices.push(invoice);
      
      invoice=createInvoice();
      invoice.reference="INV02";
      invoice.companyName="Fabrikam";
      invoice.agencyContact="Jack Black";
      invoice.vatRate=20;
      invoice.invoiceTotal=10000;
   
      $scope.invoices.push(invoice);   
  };
  
  $scope.load();
  
  
}]);