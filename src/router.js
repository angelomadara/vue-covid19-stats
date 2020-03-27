import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from './components/Today'
import Cases from './components/Cases'


const routes = [
    {path : '/', component: Index},
    {path : '/cases', component: Cases},
]


const router = new VueRouter({
    routes : routes,
    hashbang : false,
    mode : 'history'
})

export default router