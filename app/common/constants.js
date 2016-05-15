'use strict'
var constantsModule = angular.module('applicationConstantsModule', []);
constantsModule.constant('applicationConstants', {
    'clientId':'7c27b6a6-1bb8-43c0-9b92-2eee2264cc71',
    'tenantName':'ithinksharepoint.com',
    'instance':'https://login.microsoftonline.com/',
    'endPoints': {'https://itsp365invoiceformappapitest.azurewebsites.net/api':'https://ithinksharepoint.com/Itsp365.InvoiceFormApp.Api.Mark2'},
    'apiUrl': 'https://itsp365invoiceformappapitest.azurewebsites.net/api'
});
