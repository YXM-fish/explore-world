// 节流函数 wait时间内只触发一次
export const throttle = (fn, wait) => {
  let init = 0
  return function () {
    const currentTime = +new Date()
    if (currentTime - init > wait) {
      fn.apply(this)
      init = currentTime
    }
  }
}

// 防抖函数
export const debounce = (fn, wait = 300) => {
  var timer
  return function () {
    var args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args) // this 指向vue
    }, wait)
  }
}
