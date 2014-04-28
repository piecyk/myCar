'use strict';

angular.module('yoMyCarApp', [
  'ngRoute',

  'settings',
  'locale',
  'cordova',
  'fuel'
]);

angular.module('yoMyCarApp').config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});

angular.module('yoMyCarApp').run(
  [
    'CordovaService', 'Locale', '$settings', '$rootScope', '$location', '$window',
    function (CordovaService, Locale, $settings, $rootScope, $location, $window) {
      Locale.load($settings.lang);

      // cordova ready
      CordovaService.ready().then(function() {
        FastClick.attach(document.body);
        navigator.globalization.getLocaleName(function (locale) {
          Locale.load(locale.value);
        }, function () {
          // we dont have locale
        });
      });

      CordovaService.online().then(function() {
        //navigator.notification.alert('online', function(){}, '', '');
      });

      CordovaService.offline().then(function() {
        //offline
      });

      // bad pratice ;/ but for fast prototype
      $rootScope.back = function() {
        $window.history.back();
      };
      $rootScope.go = function(path){
        $location.url(path);
      };
    }
  ]
);

angular.module('cordova', [])
  .factory('CordovaService', [
    '$q',
    function($q) {

      function _ready() {
        var d = $q.defer();
        document.addEventListener('deviceready', function() {
          d.resolve(window.cordova);
        });
        return d.promise;
      }

      function _offline() {
        var d = $q.defer();
        document.addEventListener('offline', function() {
          d.resolve(window.cordova);
        }, false);
        return d.promise;
      }

      function _online() {
        var d = $q.defer();
        document.addEventListener('online', function() {
          d.resolve(window.cordova);
        }, false);
        return d.promise;
      }

      return {
        ready : _ready,
        online: _online,
        offline: _offline
      };
    }
  ]);
