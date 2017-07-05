'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _applicationinsightsJs = require('applicationinsights-js');

/**
 * Install function passed to Vue.use() show documentation in vue.js website.
 *
 * @param Vue
 * @param options
 */
function install(Vue, options) {
  var id = options.id;


  Vue.appInsights = _applicationinsightsJs.AppInsights;
  Vue.appInsights.downloadAndSetup({ instrumentationKey: id });

  var router = options.router;

  // Watch route event if router option is defined.
  if (router) {

    var basePath = options.basePath || '(Application Root)';

    var pathFormatter = function pathFormatter(path) {
      return basePath + '/' + path.substr(1);
    };

    router.beforeEach(function (route, from, next) {
      Vue.appInsights.startTrackPage(pathFormatter(route.fullPath));
      next();
    });

    router.afterEach(function (route) {
      Vue.appInsights.stopTrackPage(pathFormatter(route.fullPath), route.fullPath);
    });
  }

  Object.defineProperty(Vue.prototype, '$appInsights', {
    get: function get() {
      return Vue.appInsights;
    }
  });
}

// auto install for navigator
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}

exports.default = install;
