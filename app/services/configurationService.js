'use strict'
var configurationService = angular.module('configurationServiceModule', []);

configurationService.service('configurationService',[]);
configurationService.provider('configurationService', function configurationServiceProvider(){
    
    this.endPoints=null;
    this.clientId=null;
    this.apiUrl=null;
    this.tenantName=null;
    this.hasInternetConnection=function(){
        return true;
    }
    this.init=function(apiUrl, tenantName, clientId, endPoints)
    {
        this.apiUrl=apiUrl;
        this.tenantName=tenantName;
        this.clientId=clientId
        this.endPoints=endPoints;
        
        
    }
    
    this.load=function(){
        var promise = $q.defer();
        
    };
    
    
    this.$get = [function initialiseConfigurationService(){
        var configurationServiceInstance=new configurationSettings();
        configurationServiceInstance.settings.apiUrl=this.apiUrl;
        configurationServiceInstance.settings.adalSettings.clientId=this.clientId;
        configurationServiceInstance.settings.adalSettings.tenant=this.tenantName;
        configurationServiceInstance.settings.adalSettings.endPoints=this.endPoints;
        return configurationServiceInstance;
    }];
    
    
    
});
  


function configurationSettings()
{
    this.settings={};
    this.settings.siteUrl="";
    this.settings.apiUrl=""; 
    this.settings.logoUrl="https://blog.ithinksharepoint.com/logo.png";
    this.settings.adalSettings={};
    this.settings.adalSettings.instance="";
    this.settings.adalSettings.tenant="";
    this.settings.adalSettings.clientId=""; 
    this.settings.adalSettings.applicationId="";
    this.settings.adalSettings.endPoints="";
    
    
    this.vatRate=20;
    
    this.currency="£";
    
    this.unitTypes = [
      {name: 'once'},
      {name: 'hour'},
      {name: 'day'} 
    ];
    
   
};


