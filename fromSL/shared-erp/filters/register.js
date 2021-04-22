import Vue from 'vue'

const requireInstance = require.context('./', true, /\.js$/)

function importAllFilters (r) {
  r.keys().forEach(path => {
    const file = requireInstance(path)
    const option = file.default || file
    Vue.use(option)
  })
}

importAllFilters(requireInstance)
