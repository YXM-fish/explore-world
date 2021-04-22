const formatNumber = {}
formatNumber.install = Vue => {
  /**
 * // 根据需求不断扩展
 * value格式：v-="{type: 'integer', includeZero: true, obj: obj, key: key}"
 *
 * type: 格式化方式，integer（正整数）、gold（保留两位小数的金钱格式）
 * includeZero：type为integer时（可选 包含0），type为gold时（表示是否自动补位）
 * obj、key 可选 兼容对象属性可能没有更新的情况
 */
  Vue.directive('slFormatNumber', {
    bind (el, binding) {
      const validate = {
        init: function (param) {
          switch (param.type) {
            case 'integer': this.setInteger(param); break
            case 'gold': this.setGold(param); break
            default:
              break
          }
        },
        setInteger: function (param) {
          const input$ = el.getElementsByTagName('input')[0]
          const onInput = () => {
            const valuePrev = input$.value
            // fix 当取最大值和最小值时，valueNext数据类型变成number
            const valueNext = compare(param, formatInteger(input$.value, param))
            if (String(valueNext) !== valuePrev) {
              input$.value = valueNext
              input$.dispatchEvent(new Event('compositionend'))
              input$.dispatchEvent(new Event('input'))
            }
          }
          validate.addEvent(input$, ['input'], onInput)
        },
        setGold: function (param) {
          const input$ = el.getElementsByTagName('input')[0]
          const onInput = () => {
            const valuePrev = input$.value
            const valueNext = compare(param, goldChange(input$.value, param.decimalPlaces || 2))
            if (String(valueNext) !== valuePrev) {
              input$.value = valueNext
              input$.dispatchEvent(new Event('compositionend'))
              input$.dispatchEvent(new Event('input'))
            }
          }
          const onChange = () => {
            const valuePrev = input$.value
            const valueNext = compare(param, goldBlur(input$.value, param.includeZero))
            if (String(valueNext) !== valuePrev) {
              input$.value = valueNext
              input$.dispatchEvent(new Event('compositionend'))
              input$.dispatchEvent(new Event('input'))
            }
          }
          validate.addEvent(input$, ['input'], onInput)
          validate.addEvent(input$, ['change'], onChange)
        },
        addEvent (el, eventName, eventFn) {
          eventName.forEach(name => {
            el.addEventListener(eventName, eventFn)
          })
        }
      }
      validate.init(binding.value)
    }
  })
}

function formatInteger (value, param) {
  const reg = /[^\d]/g
  let val = parseInt(value.replace(reg, ''))
  val = val || (param.includeZero && val === 0 ? val : '')
  return val.toString()
}
function goldChange (v, decimalPlaces = 2) {
  v = v.indexOf('.') === 0 ? '0' + v : v
  let newValue = v.toString()
  let decimalPlacesReg = '^(-)*(\\d+)\\.('
  for (let index = 0; index < decimalPlaces; index++) {
    decimalPlacesReg += '\\d'
  }
  decimalPlacesReg += ').*$'
  decimalPlacesReg = new RegExp(decimalPlacesReg)
  newValue = v
    .replace(/[^\d.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(decimalPlacesReg, '$1$2.$3')
    .replace(/[-|+]/g, '')
  if (
    newValue.length > 1 &&
    newValue.indexOf('.') !== 1 &&
    newValue.indexOf('0') === 0
  ) {
    newValue = newValue.toString().substring(1)
  }

  return newValue
}
function goldBlur (v, includeZero) {
  let nv = v.replace(/\.$/, '')
  if (!includeZero) {
    return nv
  } else {
    if (nv.indexOf('.') === -1) {
      return nv + '.00'
    } else {
      return nv.split('.')[1].length === 1 ? nv + '0' : nv
    }
  }
}
function compare (param, value) {
  let result = value
  if (!isNull(param.max) && compareMax(value, param.max)) {
    if (param.compareLength) result = generateValue(value, param.max)
    else result = param.max
  } else if (!isNull(param.min) && compareMin(value, param.min)) {
    result = param.min
  }
  return result
}
function generateValue (value, maxValue) {
  const _origin = parseInt(value).toString()
  const maxLength = maxValue.toString().length
  if (_origin.length > maxLength) { return _origin.substr(0, maxLength) }
  return _origin
}
function compareMax (origin, dest) {
  const _origin = parseInt(origin)
  return _origin >= dest
}
function compareMin (origin, dest) {
  const _origin = parseInt(origin)
  return _origin <= dest
}
function isNull (val) {
  return val === undefined || val === null
}

export default formatNumber
