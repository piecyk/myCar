(function() {
  'use strict';

  function Resource($http, path) {
    _.extend(this, {
      _http: $http,
      _path: 'resources' + path
    });
  }

  Resource.$factory =  ['$http', function($http) {
    return function(path) {
      return new Resource($http, path);
    };
  }];

  angular.module('yoMyCarApp').factory('cResource', Resource.$factory);

  Resource.prototype.find = function(uid) {
    return this._http.get(this.path(uid));
  };

  Resource.prototype.path = function(uid) {
    return uid ? this._path + '/' + uid : this._path;
  };

  Resource.prototype.set = function(uid, newValue) {
    var path = this._path + '/' + uid;

    return this._http.put(path, newValue);
  };

})();
