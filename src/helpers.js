(function (app, $, _) {
  'use strict';

  /**
   * Wrapper to $(document).ready()
   *
   * @param callable
   */
  function ready(callable) {
    $(document).ready(callable);
  }

  /**
   * Resize
   *
   * @param callable
   */
  function resize(callable) {
    $(window).resize(_.debounce(callable, 500));
  }

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
  }

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
  }

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
