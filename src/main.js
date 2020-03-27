import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
// import BootstrapVue from 'bootstrap-vue'
// import bootstrap from 'boos'

Vue.config.productionTip = false

// Vue.use(VueAxios,axios)
Vue.prototype.axios = Axios
// Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')
