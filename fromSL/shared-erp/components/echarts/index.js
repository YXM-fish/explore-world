import ECharts from 'vue-echarts'

export default {
  install: function (Vue) {
    Vue.component('sl-chart', ECharts)
  }
}
