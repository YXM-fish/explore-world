
import inputFilter from './inputFilter'
import Vue from 'vue'
const install = function (Vue) {
  Vue.directive('inputFilter', inputFilter)
}

if (window.Vue) {
  Vue.use(install)
}

inputFilter.install = install
export default inputFilter
