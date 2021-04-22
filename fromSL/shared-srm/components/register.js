import Vue from 'vue'
import ECharts from './echarts'
import Moment from './moment'
Vue.use(ECharts)
Vue.use(Moment)

const requireInstance = require.context('../', true, /\.vue$/)
function importAllComponents (r) {
  r.keys().forEach(path => {
    const file = requireInstance(path)
    const componentOption = file.default || file
    const name = componentOption.name
    if (name && name.indexOf('Sl') !== -1) {
      Vue.component(componentOption.name, componentOption)
    }
  })
}

importAllComponents(requireInstance)
