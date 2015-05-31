(function (app) {
  'use strict';

  /**
   * Get and set store data
   *
   * @param name
   * @param object
   * @returns {*}
   */
  function data(name, object) {
    // Get
    if (object === undefined) {
      return app.dataStore[name];
    }

    // Set
    app.dataStore[name] = object;
  };


  /**
   * Export
   */
  app.dataStore = {};
  app.data = data;

})(App);
