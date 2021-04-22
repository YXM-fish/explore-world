import moment from 'moment'
moment.locale('zh-cn')

export default {
  install: function (Vue) {
    Vue.prototype.$moment = moment
  }
}
