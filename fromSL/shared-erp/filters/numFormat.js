
import { thousandsSeparate } from '@shared/util'

export default {
  install: Vue => {
    Vue.filter('numFormat', function (value, formatFnName, extra) {
      if (formatFnName === 'thousandsSeparate') {
        return thousandsSeparate(value, extra)
      }
      return value
    })
  }
}
