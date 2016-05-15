'use strict';
var settingsControllerModule = angular.module('settingsController', ['configurationServiceModule']);

settingsControllerModule.controller('settingsController', ['$scope','$http','$routeParams','configurationService','adalAuthenticationService', function ($scope, $http, $routeParams, configurationService, adalService) {
    $scope.userInfo = adalService.userInfo;
    
    $scope.apiConfig={};
    $http({
        method:'GET',
        url: configurationService.settings.apiUrl + "/configuration"        
    }).then(function processConfigurationResponse(response){
        $scope.apiConfig=response.data;
    }, function processError(response){
        alert(response);
    });
}]);