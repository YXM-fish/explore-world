
const addListener = function (el, type, fn) {
  el.addEventListener(type, fn, false)
}
const specialIntDecimalsFilter = function (el) {
  // 正整数，小数和-
  let count = 0
  let lastVal = ''
  const matchReg = new RegExp(
    '^\\d+(\\d+|(\\.\\d+))?(-\\d+(\\d+|(\\.\\d+))?)?$'
  )
  addListener(el, 'input', () => {
    let val = el.value
      .replace(/^[.-]/, '')
      .replace(/[^.-\d]/g, '')
    if (val && !matchReg.test(val)) {
      count++
      if (/[.-]{2}/.test(val)) {
        count--
        el.value = lastVal
      } else {
        lastVal = val
        if (count === 1) {
          const splitVal = val.split('-')
          if (
            splitVal.length === 3 ||
            splitVal[0].split('.').length === 3 ||
            (splitVal[1] !== undefined &&
              splitVal[1].split('.').length === 3)
          ) {
            count = 0
            lastVal = /[.-]$/.test(val)
              ? val.replace(/(.+)[.-]$/, '$1')
              : val
          }
        }
      }
    } else {
      count = 0
      lastVal = val
    }
    el.value = lastVal
  })
  addListener(el, 'blur', (event) => {
    while (/(.+)[.-]$/.test(lastVal)) {
      lastVal = lastVal.replace(/(.+)[.-]$/, '$1')
      event.target.value = lastVal
    }
    count = 0
    el.value = lastVal.replace(/(.+)[.-]$/, '$1')
  })
}
export default {
  bind (el, binding) {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    switch (binding.arg) {
      case 'specialIntDecimalsFilter':
        specialIntDecimalsFilter(el)
        break
      default:
        break
    }
  }
}
