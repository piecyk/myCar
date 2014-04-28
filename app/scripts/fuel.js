'use strict';

angular.module('fuel', []);

angular.module('fuel').config(['$routeProvider', function ($routeProvider) {
  $routeProvider.when('/fuel-manager', {templateUrl: 'views/fuel-menu.tpl.html', controller: 'FuelCtrl'});
  $routeProvider.when('/fuel-manager/add', {templateUrl: 'views/fuel-add.tpl.html', controller: 'FuelAddCtrl'});
  $routeProvider.when('/fuel-manager/list', {templateUrl: 'views/fuel-list.tpl.html', controller: 'FuelListCtrl'});
}]);


angular.module('fuel').service('FuelService', [
  '$timeout',
  function($timeout) {

    //
    var fuelItems = [];

    return {
      getItems: function() {
        return fuelItems;
      },
      addItem: function(item) {
        fuelItems.push(item);
      },
      updateItem: function(item) {
        //
      },
      removeItem : function(id) {
        //
      },
      length: function() {
        return fuelItems.length;
      },
      isEmpty: function() {
        return fuelItems.length === 0;
      }
    };
  }
]);

angular.module('fuel').controller('FuelCtrl', [
  '$scope', 'FuelService',
  function ($scope, FuelService) {

  }
]);

angular.module('fuel').controller('FuelAddCtrl', [
  '$scope', 'FuelService', '$location', '$timeout',
  function ($scope, FuelService, $location, $timeout) {

    $scope.item = {
      date: moment().format('dddd'),
      distance: 1,
      priceOfLiter: 2,
      refueled: 3,
      // full, reserve
      typeOfRefueling: null,
      geolocation: null
    };

    $scope.add = function() {
      FuelService.addItem($scope.item);
      // validate the form
      $location.url('/fuel-manager');
    };


    //TODO: play time ////
    $scope.showE = function() {
      //console.log('s');
      //$scope.modalWrap = 'md-effect-3';
      //$scope.modal = 'effeckt-show';
      //$scope.modalStyle = 'effeckt-show';
      

      $scope.s = {'display': 'block'};      
      $scope.overlay = 'effeckt-show';
    };
    $timeout(function() {
      $scope.showE();
      $scope.modalWrap = 'effeckt-show';
      //$scope.modalWrap = $scope.modalWrap + ' effeckt-show';
    },100);

  }
]);

angular.module('fuel').controller('FuelListCtrl', [
  '$scope', 'FuelService', '$locale', //'Unit',
  function ($scope, FuelService, $locale) {

    //var a = Unit.$add();
    
    $scope.model = {
      array: FuelService.getItems()
    };

    //$scope.$locale = $locale;
    //console.log($locale);
    
  }
]);
