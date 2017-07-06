
import { AppInsights } from "applicationinsights-js"

/**
 * Install function passed to Vue.use() show documentation on vue.js website.
 *
 * @param Vue
 * @param options
 */
function install (Vue, options) {

  const { id } = options

  Vue.appInsights = AppInsights
  Vue.appInsights.downloadAndSetup({ instrumentationKey: id })

  const router = options.router

  // Watch route event if router option is defined.
  if (router) {

    const basePath = options.basePath || '(Application Root)'

    const pathFormatter = path =>
    basePath + '/' + path.substr(1)

    router.beforeEach( (route, from, next) => {
      Vue.appInsights.startTrackPage(pathFormatter(route.fullPath))
      next()
    })

    router.afterEach( route => {
      Vue.appInsights.stopTrackPage(pathFormatter(route.fullPath), route.fullPath)
    })

  }

  Object.defineProperty(Vue.prototype, '$appInsights', {
    get: () => Vue.appInsights
  })

}

// auto install for navigator
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install
