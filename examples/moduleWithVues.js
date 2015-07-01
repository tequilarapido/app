// Declare module as usual (example/module.js)


/**
 * vueName
 */
(function (app, $, window, document) {

  app.addModuleVue('moduleName', 'vueName', function (module) {
    return new Vue({
      el: '#vue-el',
      data: {},
      methods: {}
    });
  }

);

})(App, jQuery, window, document);
