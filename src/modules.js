(function (app, $, _) {
  'use strict';

  /**
   * Setup and run module
   *
   * @param {object} module
   * @param {string} moduleName
   */
  var runModule = function (module, moduleName) {
    
    // Check if we need to run module 
    // To keep backward compatibility we check if we have a `container()` method, 
    // if not we'll use the `isRunnable` method.

    // The module must define one of the two methods
    if(typeof module.container !== 'function' && typeof module.isRunnable === 'function'){
      throw new Error('Module <' + moduleName + '> must define isRunnable() method.');
    }

    // Backward compatibilty. To be deprecated.
    if (typeof module.container === 'function' && !module.container()) {
      return;
    }

    // New way from version 0.0.4
    if (typeof module.isRunnable === 'function' && !module.isRunnable()) {
      return;
    }

    // Call init if defined on the module
    typeof module.container === 'function' && module.init();

    // Init any vues (VueJS) attached to this module
    if (module.vues) {
      _.forEach(module.vues, function (vue) {
        vue(module);
      });
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

        // Starting from v0.0.3 you must not define `run` method inside module. Instead, use `init` and `isRunnable` methods.
        // Just for backward compatibility, we will execute `run` method if found.
        if (typeof m.run == 'function') {
          m.run();
          return;
        }

        // otherwise, we will execute default run method
        runModule(m, moduleName);
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
