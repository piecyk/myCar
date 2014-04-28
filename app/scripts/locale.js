(function() {
  'use strict';

  angular.module('locale', []);

  function formatString(str) {
    if (!str) {throw new Error('invalid params');}
    var args = Array.prototype.slice.call(arguments, 1),
        rgx = /{(\d+)}/g;

    if (!args.length) {return str;}
    return str.replace(rgx, function(match, number) {
      return typeof args[number] !== 'undefined' ?args[number] : match;
    });
  }

  angular.module('locale').filter('l',['Locale', function (Locale) {
    return function (key, args) {
      return formatString.apply(null, [Locale.getText(key)].concat(args));
    };
  }]);

  angular.module('locale').service('Locale', [
    '$locale', '$q', 'cResource', '$timeout',
    function($locale, $q, cResource, $timeout) {

      var $$resource = new cResource('');

      var langInUse = null;
      var langList = [
        {id: 'en_us', name: 'english'},
        {id: 'pl_pl', name: 'polish'}
      ];
      var texts = {};

      function whatToGet(id) {
        if (!id) {return 'en_us';}

        var ret = null;
        for(var i = 0; i < langList.length; i++) {
          if (langList[i].id === id) {
            ret = id;
          }
        }
        return ret ? ret : 'en_us';
      }

      //loads localization strings
      function _load(id) {
        var deferred = $q.defer();

        if (id) {id = id.toLowerCase();}
        if (texts && texts.id === id) {
          deferred.resolve(texts.id);
        } else {
          $$resource.find('text-'+whatToGet(id)+'.json').success(function(ret) {
            texts = ret;
            langInUse = _.find(langList, function(lang) {
              return lang.id === texts.id;
            });

            // this not updated currency filter after live change of lang ;/ wtf ?
            $timeout(function() {              
              $locale.id = texts.id;
              $locale.DATETIME_FORMATS = texts.DATETIME_FORMATS;
              $locale.NUMBER_FORMATS = texts.NUMBER_FORMATS;
              moment.lang(texts.id);
              // resolve
              deferred.resolve(texts.id);
            });

          });
        }
        return deferred.promise;
      };

      return {
        getText: function (key) {
          return texts[key] || key;
        },
        getLanguages: function() {
          return langList;
        },
        getLang: function() {
          return langInUse;
        },
        load: _load
      };
    }
  ]);

  angular.module('locale').directive('cChangeLang', [
    'Locale',
    function(Locale) {
      return {
        restrict: 'AE',
        scope: {},
        template: '<select ng-model="form.lang" ng-options="l.name|l for l in locales"></select>',

        link: function(scope, element, attrs) {

          scope.$watch('form.lang', function (newVal, oldVal) {
            if (newVal) {
              Locale.load(newVal.id);
            }
          });

          scope.$watch(function() {
            return Locale.getLang();
          }, function (newVal, oldVal) {
            if (newVal) {
              scope.form = {
                lang : newVal
              };
            }
          });
          scope.locales = Locale.getLanguages();
        }
      };
    }
  ]);

})();
