(function (app) {

  'use strict';

  /**
   * Run application modules
   */
  app.module(
    'moduleA',
    'ModuleB'
  );

  /**
   * Application global onReady
   */
  app.ready(function () {
    app.setupCsrfAjaxFilter();
  });

})(App);
