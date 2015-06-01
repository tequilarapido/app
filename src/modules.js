(function (app, $, _) {
  'use strict';

  /**
   * Setup and run module
   *
   * @param {object} module
   */
  var runModule = function (module) {
    // Check if the module container is in the DOM
    if (!module.container()) {
      return;
    }

    // Init any vues (VueJS) attached to this module
    if (module.vues) {
      _.forEach(module.vues, function (vue) {
        vue(module);
      });
    }

    // Call init if defined on the module
    if (module.init) {
      module.init();
    }
  };


  /**
   * Run modules
   */
  function module() {
    var moduleNames = _.toArray(arguments);

    $(document).ready(function () {
      _.forEach(moduleNames, function (moduleName) {
        var m = app[moduleName];

        // Module not defined ?
        if (typeof m === 'undefined') {
          throw new Error('Module <' + moduleName + '> is not defined. Make sure the name is correct and the module script file is loaded.');
        }

        // If module has its own 'run' method, execute it
        if (typeof m.run == 'function') {
          m.run();
          return;
        }

        // otherwise, we will execute default run method
        runModule(m);
      });
    });
  };

  /**
   * Add / attach a vue to module
   *
   * @param module
   * @param vueName
   * @param vue
   */
  function addModuleVue(module, vueName, vue) {
    app[module].vues[vueName] = vue;
  };


  /**
   * Register a module
   *
   * @param name
   * @param module
   */
  function registerModule(name, module) {
    // Add module to app
    app[name] = module;

    // Add modules vues namespace
    module.vues = {};

    // Add services namespace
    module.services = {};

    // Add helpers
    module.services.requestHeaders = app.getCommonRequestHeaders;
  };


  /**
   * Export
   */
  app.module = module;
  app.registerModule = registerModule;
  app.addModuleVue = addModuleVue;


})(App, jQuery, _);
