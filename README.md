# vue-application-insights


## Installation


```console
$ npm install vue-application-insights --save
```

## Get started


```js
import Vue from 'vue'
import VueAppInsights from 'vue-application-insights'

Vue.use(VueAppInsights, {
  id: 'XXXXXXXX--XXXX-XXXX-XXXXXXXXXXXX'
})
```

With vue router


```js
import Vue from 'vue'
import router from './router'

import VueAppInsights from 'vue-application-insights'

Vue.use(VueAppInsights, {
  id: 'XXXXXXXX--XXXX-XXXX-XXXXXXXXXXXX',
  router
})
```

Example with custom track event

```js
Vue.extend({

  methods: {
    custom_action() {
      this.$appInsights.trackEvent("custom_action", { value: 'ok' });
    }   
  }
  
});
```

## Options

- **id** - The instrumentation key of your AppInsights resource on Azure.
- **router** - The router instance, which events should be tracked as page views _(optional)_.
- **baseName** String that will prefix the name of the tracked page _(optional, default is '(Vue App)')_
- **appInsights** Instance of the Application Insights client  _(optional)_.
- **trackInitialPageView** - Boolean that determines whether or not the initial page view should be tracked. _(optional, defaults to true)_
- **onAfterScriptLoaded** Callback function that will be invoked after AppInsights script have loaded. _(optional, defaults to undefined)_
- **appInsightsConfig** Object where you can put custom [AppInsights configuration](https://github.com/microsoft/ApplicationInsights-JS#configuration) _(optional, defaults to empty object)_

## Initializing AppInsights from outside the Vue application

Maybe you use server side code to include the javascript snippet that initializes AppInsights. In that case you want to provide the AppInsights instance to this Vue plugin and prevent it from tracking the initial page view.

```js
import Vue from 'vue'
import router from './router'

import VueAppInsights from 'vue-application-insights'

Vue.use(VueAppInsights, {
  appInsights: window.appInsights,
  trackInitialPageView: false,
  router
})
```