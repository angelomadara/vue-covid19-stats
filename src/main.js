import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.axios = Axios
Vue.prototype.coronaApi = 'https://corona.lmao.ninja/'

/**
 * filters
 */
Vue.filter('prettyNumber',function(str){
  str = ""+str; // ignore trowing error and make sure that the value will be string 
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

new Vue({
  render: h => h(App),
}).$mount('#app')
