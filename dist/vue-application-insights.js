'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _applicationinsightsJs = require('applicationinsights-js');

/**
 * Install function passed to Vue.use() show documentation on vue.js website.
 *
 * @param Vue
 * @param options
 */
function install(Vue, options) {
  var id = options.id;


  if (options.appInsights) {
    Vue.appInsights = options.appInsights;
  } else {
    Vue.appInsights = _applicationinsightsJs.AppInsights;
    Vue.appInsights.downloadAndSetup({ instrumentationKey: id });
  }

  var router = options.router;

  // Watch route event if router option is defined.
  if (router) {

    if (options.trackInitialPageView !== false) {
      setupPageTracking(options, Vue);
    } else {
      router.onReady(function () {
        return setupPageTracking(options, Vue);
      });
    }
  }

  Object.defineProperty(Vue.prototype, '$appInsights', {
    get: function get() {
      return Vue.appInsights;
    }
  });
}

/**
 * Track route changes as page views with AppInsights
 * @param options 
 */
function setupPageTracking(options, Vue) {

  var router = options.router;

  var basePath = options.basePath || '(Application Root)';

  var pathFormatter = function pathFormatter(path) {
    return basePath + '/' + path.substr(1);
  };

  router.beforeEach(function (route, from, next) {
    var path = pathFormatter(route.fullPath);
    Vue.appInsights.startTrackPage(path);
    next();
  });

  router.afterEach(function (route) {
    var path = pathFormatter(route.fullPath);
    Vue.appInsights.stopTrackPage(path, route.fullPath);
  });
}

// auto install for navigator
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}

exports.default = install;
