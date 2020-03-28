import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from './components/Today'
import Cases from './components/Cases'
import Timeline from './components/Timeline'

const routes = [
    {path : '/', component: Index},
    {path : '/cases', component: Cases},
    {path : '/timeline/:country', component: Timeline},
]


const router = new VueRouter({
    routes : routes,
    hashbang : false,
    mode : 'history'
})

export default router