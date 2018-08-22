import Vue from 'vue'
import App from './App.vue'
import VueNotify from './plugins/VueNotify.js'

Vue.use(VueNotify);
Vue.use(VueNotify);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
