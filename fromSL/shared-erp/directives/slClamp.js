
import { clamp } from '@shared/util/clamp'

export default {
  install: function (Vue) {
    Vue.directive('slClamp', function (el, binding) {
      clamp(el, binding.value)
    })
  }
}
