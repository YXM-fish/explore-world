import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import './index.scss'
import '../theme/index.css'
import ElementUI from 'element-ui'
// import './element-variables.scss'

Vue.use(ElementUI, { size: 'small' })

import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
Vue.use(VueHighlightJS)

// import VueVirtualScroller from 'vue-virtual-scroller'
// import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
// Vue.use(VueVirtualScroller)

import directives from '@/directives'
Vue.use(directives)

import { routes } from './routes'
const router = new VueRouter({
    routes
})

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
