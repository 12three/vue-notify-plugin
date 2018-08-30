import Vue from 'vue'
import App from './App.vue'
import VueNotifyPlugin from './plugin/init.js'

Vue.use(VueNotifyPlugin);
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')