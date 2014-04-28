(function() {
  'use strict';

  angular.module('settings', [], ["$provide", function($provide) {
    $provide.value("$settings", {
      lang: 'pl_pl',
      unitLength: 'km'
    });
  }]);

})();
