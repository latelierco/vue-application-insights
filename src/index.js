
import { AppInsights } from "applicationinsights-js"

/**
 * Install function passed to Vue.use() show documentation on vue.js website.
 *
 * @param Vue
 * @param options
 */
function install (Vue, options) {

  const { id } = options
  
  if (options.appInsights) {
    Vue.appInsights = options.appInsights
  } else {
    Vue.appInsights = AppInsights
    Vue.appInsights.downloadAndSetup({ instrumentationKey: id }) 
  }

  const router = options.router

  // Watch route event if router option is defined.
  if (router) {

    if (options.trackInitialPageView !== false) {
      setupPageTracking(options, Vue);
    } else {
      router.onReady(() => setupPageTracking(options, Vue))
    }

  }

  Object.defineProperty(Vue.prototype, '$appInsights', {
    get: () => Vue.appInsights
  })

}

/**
 * Track route changes as page views with AppInsights
 * @param options 
 */
function setupPageTracking(options, Vue) {

  const router = options.router

  const baseName = options.baseName || '(Vue App)'

  router.beforeEach( (route, from, next) => {
    const name = baseName + ' / ' + route.name;
    Vue.appInsights.startTrackPage(name)
    next()
  })

  router.afterEach( route => {
    const name = baseName + ' / ' + route.name;
    const url = location.protocol + '//' + location.host + route.fullPath;
    Vue.appInsights.stopTrackPage(name, url);
  })
}

// auto install for navigator
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install
