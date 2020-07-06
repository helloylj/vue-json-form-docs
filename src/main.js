import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import vjf, { VJFStore } from '../../vue-form-create/src'

Vue.use(Vuex)
Vue.use(vjf)

new Vue({
  router,
  store: new Vuex.Store(VJFStore),
  render: h => h(App)
}).$mount('#app')
