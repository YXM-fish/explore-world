
import { date } from '@shared/util'

const dateFormat = {}
dateFormat.install = Vue => {
  Vue.filter('dateFormat', date)
}

export default dateFormat
