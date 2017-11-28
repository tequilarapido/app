(function (window) {
  'use strict';

  /**
   * Object exported into Window as App
   *
   * @type {object}
   */
  var app = window.App || {};

  // Vues declarations
  app.vues = {};

  /**
   * Init and inject into global (window) scope
   */
  window.App = app;

}(window));
