/**
 * tequilarapido-app.js v0.0.1
 * (c) 2015 tequilarapido.
 */
(function (window) {
  'use strict';

  /**
   * Object exported into Window as App
   *
   * @type {object}
   */
  var app = {};

  /**
   * Init and inject into global (window) scope
   */
  window.App = app;

}(window));

(function (app, $, _) {
  'use strict';

  /**
   * Wrapper to $(document).ready()
   *
   * @param callable
   */
  function ready(callable) {
    $(document).ready(callable);
  };

  /**
   * Resize
   *
   * @param callable
   */
  function resize(callable) {
    $(window).resize(_.debounce(callable, 500));
  };

  /**
   * Return viewport
   *
   * @returns {{width: int, height: int}}
   */
  function viewport() {
    return {
      width: $(window).width(),
      height: $(window).height()
    };
  }

  /**
   * Returns csrf token from meta
   *
   * @returns {string}
   */
  function csrfToken() {
    return $('meta[name="csrf-token"]').attr('content');
  }

  /**
   * Add csrf token to request
   *
   * @param request
   */
  function addCsrfTokenHeader(request) {
    request.setRequestHeader(
      "X-CSRF-Token",
      csrfToken()
    );
  };

  /**
   * Return common ajax request headers
   *
   * @returns {{Accept: string, X-CSRF-Token: *}}
   */
  function getCommonRequestHeaders() {
    return {
      'Accept': 'application/json',
      'X-CSRF-Token': csrfToken()
    };
  };

  /**
   * Global ajax setup
   */
  function setupCsrfAjaxFilter() {
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
      var token = csrfToken();
      if (token) {
        jqXHR.setRequestHeader('X-CSRF-Token', token);
      }

      return jqXHR;
    });
  }

  /**
   * Export
   */
  app.ready = ready;
  app.resize = resize;
  app.viewport = viewport;
  app.addCsrfTokenHeader = addCsrfTokenHeader;
  app.getCommonRequestHeaders = getCommonRequestHeaders;
  app.setupCsrfAjaxFilter = setupCsrfAjaxFilter;

})(App, jQuery, _);

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
