'use strict'

var invoiceControllersModule = angular.module('invoiceControllersModule', ['invoiceDataService']);

invoiceControllersModule.controller('listInvoicesController', ['$scope', '$location', 'adalAuthenticationService', 'invoiceDataService', function ($scope, $location, adalService, invoiceDataService) {
  $scope.invoices = [];
  $scope.error="";
  
  $scope.showInvoiceList=function(){
      
        return true;
    };
  
  $scope.showInvoice=function(referenceNumber){
       $location.path("/invoices/" + referenceNumber + "/view");
      return true;
  }
 
  $scope.load=function load() {
       $scope.dataloaded=false;
        invoiceDataService.getInvoices().then(function(response){
            $scope.invoices = response.data;
            $scope.dataloaded=true;
        }, function error(response){
            $scope.error=response;
        });
       
  };
  
  $scope.loggedIn=adalService.userInfo.isAuthenticated;
  $scope.login = function loginStub(){
      adalService.login().then(function(){
            $location('#')
        });  
  }
  if(adalService.userInfo.isAuthenticated)
  {
       
        $scope.load();

  }
  
  
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
  
  
}]);

invoiceControllersModule.controller('addInvoiceController', ['$scope', 'dataModelService', '$location', 'invoiceDataService', function($scope, dataModelService, $location, invoiceDataService){
    $scope.invoice=new dataModelService.Invoice();
    $scope.addInvoiceLine = function addInvoiceLine() {
        var newInvoiceLine=new dataModelService.InvoiceLine();
        $scope.invoice.invoiceLines.push(newInvoiceLine);
    }
    
    $scope.cancel = function cancelStub(){
        $location.path('/');
    }
    
    $scope.status = "";
    $scope.error="";
    
    $scope.saveInvoice = function saveInvoiceStub(){
         invoiceDataService.saveNewInvoice($scope.invoiceNo, $scope.invoice).then(function processSuccess(response){
            $scope.status="Successfully Saved Invoice";
            $location.path("#");
            return true;
        },
        function processFailure(response){
            //alert(response.data);
            $scope.error="Failed to create invoice: " + response.data.message;
        });
    };
    
}]);

invoiceControllersModule.controller('editInvoiceController', ['$scope','$http', '$routeParams', '$filter', 'configurationService', 'adalAuthenticationService', 'invoiceDataService', '$location', 'dataModelService', function ($scope, $http, $routeParams, $filter, configurationServuce, adalService, invoiceDataService, $location, dataModelService) {
    $scope.invoice= {};
    $scope.mode='edit';
    
    if(adalService.userInfo.isAuthenticated)
    {
        $scope.invoiceNo=$routeParams.invoiceid;
        $scope.load=function load() {
            invoiceDataService.getInvoice($scope.invoiceNo).then(
                function(response)
                {
                    if(response.data)
                    {
                        $scope.invoice = response.data;
                        $scope.invoice.invoiceDate=new Date($scope.invoice.invoiceDate);
                    }
                    else{
                        $scope.error = "There seem to be more than one invoice with the same reference";
                    }
                }, 
                function(response)
                {
                    $scope.error=response.data;
                }
            );
        };
        
    
        $scope.config = configurationServuce;
        $scope.error="";
       
        $scope.load();
                
    }
    $scope.saveInvoice = function saveInvoiceStub(){
        invoiceDataService.updateInvoice($scope.invoiceNo, $scope.invoice).then(function processSuccess(response){
            $scope.status="Successfully Saved Invoice";
            $location.path("#");
        },
        function processFailure(response){
            $scope.error="Failed to update invoice: " + response.data.message;
        });
    };
    
    $scope.cancel = function cancelFunctionStub(){
        $location.path("#");
    }
    
    $scope.addInvoiceLine = function addInvoiceLine() {
        var newInvoiceLine=new dataModelService.InvoiceLine();
        $scope.invoice.invoiceLines.push(newInvoiceLine);
    }
    
    $scope.removeInvoiceLine = function removeInvoiceLine(index) {
         $scope.invoice.invoiceLines.splice(index, 1);
    }
    
   
}]);


invoiceControllersModule.controller('viewInvoiceController', ['$scope','$http', '$routeParams', 'configurationService', 'adalAuthenticationService', 'invoiceDataService', '$location', function ($scope, $http, $routeParams, Configuration, adalService, invoiceDataService, $location) {
    $scope.invoice= {};
    if(adalService.userInfo.isAuthenticated)
    {
        $scope.invoiceNo=$routeParams.invoiceid;
       
        $scope.load=function load() {
            invoiceDataService.getInvoice($scope.invoiceNo).then(
                function(response)
                {
                    if(response.data)
                    {
                        $scope.invoice = response.data;
                        $scope.invoice.invoiceDate=new Date($scope.invoice.invoiceDate);
                        $scope.dataloaded=true;
                    }
                    else{
                        $scope.error = "There seem to be more than one invoice with the same reference";
                    }
                }, 
                function(response)
                {
                    $scope.error=response.data;
                }
            );
        };
        
        $scope.editInvoice=function(){
            var urlSnippet="invoices/"+$scope.invoiceNo + "/edit";
            $location.path(urlSnippet);  
        };
        
        $scope.cancel = function cancelStub(){
            $location.path('/');
        }
        
        
        $scope.config = Configuration;
        $scope.error="";
       
        $scope.load();
                
    }
      
    
}]);

