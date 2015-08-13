/*
 * Module name
 *
 * module description
 *
 */

(function (app, $, window, document) {

    'use strict';

    var module = {}, $ui = {};


    /**    
     * Module options
     */
    module.options = {
        ui: {
        }
    };

    /**
     * Module UI
     */
    module.defineUI = function() {
       
    };

    /**
     * Run module ?
     */
    module.isRunnable = function () {
       $ui.container = $('#module-container');        
       
       return $ui.container.length;
    };

    /**
     * Init
     */
    module.init = function () {
        // Setup event handlers ... etc
    };

    /**
     * Register module
     */
    app.registerModule('moduleName', module);

})(App, jQuery, window, document);
