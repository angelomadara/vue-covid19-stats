import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import { BootstrapVue, IconsPlugin, BootstrapVueIcons } from 'bootstrap-vue'
import VCharts from 'v-charts';
// import VueCharts from 'vue-chartjs'
import DrVueEcharts from 'dr-vue-echarts'
import VueTable2 from 'vue-tables-2'
import moment from 'moment'
import vSelect from 'vue-select'


Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.use(BootstrapVueIcons)

Vue.use(VCharts)
// Vue.use(VueCharts)
Vue.use(DrVueEcharts)
Vue.use(VueTable2)

// Vue.use(vSelect)
Vue.component('v-select',vSelect)

// Vue.prototype.dateFormat = dateFormat
// Vue.prototype.moment = moment
Vue.prototype.axios = Axios
Vue.prototype.coronaApi = 'https://corona.lmao.ninja/'
Vue.prototype.newsApi = 'https://newsapi.org/v2/everything'
Vue.prototype.newsApiToken = 'c59b33a71f3e4c2a800b135cbabba7a7'

/**
 * date today
 */
// Vue.prototype.today = moment().format('YYYY/MM/DD')
/**
 * filters
 */
Vue.filter('dateFormatAndTimezone',function(str){
  if(str == '') return false;
  return moment(String(str)).format('MM/DD/YYYY Z')
})

Vue.filter('prettyNumber',function(str){
  str = ""+str; // ignore trowing error and make sure that the value will be string 
  return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
})

Vue.filter('lowerCase',function(str){
  str = ""+str; // ignore trowing error and make sure that the value will be string 
  return str.toLowerCase()
})


import "vue-select/dist/vue-select.css";

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
