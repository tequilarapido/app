/**
 * Module
 */
(function (app, $) {
  'use strict';

  var module = {}, $ui = {};

  module.container = function () {
    $ui.container = $('#module-container');
    return $ui.container.length;
  }

  // Register module
  app.registerModule('moduleWithVues', module);

})(App, jQuery);


/**
 * VueJs vue
 */
(function (app) {
  app.addModuleVue('moduleWithVues', 'aVue', function (module) {
    return new Vue({
      el: '#vue-el',
      data: {},
      methods: {}
    });
  });
})(App);
