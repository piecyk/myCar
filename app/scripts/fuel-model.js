(function() {
  'use strict';
  
  function Unit(futureUnitData) {
    this.$unwrap(futureUnitData);
  }

  Unit.$factory = ['$timeout', 'cResource', function($timeout, cResource) {
    _.extend(Unit, {
      $$resource: new cResource(''),
      $timeout: $timeout
    });
    return Unit;
  }];
  
  angular.module('fuel').factory('Unit', Unit.$factory);

  Unit.$add = function() {
    var futureUnitData = this.$$resource.find('fuel-config.json');
    return Unit.$unwrapCollection(futureUnitData);
  };

  Unit.$find = function(uid) {
    var futureUnitData = this.$$resource.find(uid);
    if (uid) return new Unit(futureUnitData);
    return Unit.$unwrapCollection(futureUnitData);
  };

  Unit.prototype.$unwrap = function(futureUnitData) {
    var self = this;
    this.$futureUnitData = futureUnitData;
    this.$futureUnitData.then(function(data) {
      Unit.$timeout(function() {
        _.extend(self, data); });
    });
  };

  Unit.$unwrapCollection = function(futureUnitData) {
    var collection = {};
    collection.$futureUnitData = futureUnitData;
    futureUnitData.then(function(units) {
      Unit.$timeout(function() {
        _.reduce(units, function(c, unit) {
          c[unit.id] = new Unit(unit);
          return c;
        }, collection);
      });
    });
    console.log(collection);
    
    return collection;
  };
  
})();
