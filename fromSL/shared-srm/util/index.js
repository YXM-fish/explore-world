export * from './basic'
export * from './messageUI'
// json数据生成CSV文件
export * from './json2Csv'
// 下载文件
export * from './download'
export * from './optimize'
export * from './browserStorage'
export * from './crypto'
export * from './dateFormat'
export * from './numberFormat'

/**
 * 在文件使用的地方使用，import {merge} from "lodash"
 * 不建议使用require的方式引用，这样不能做摇树优化
 */
// export const merge = require('lodash/merge')

export const getLang = function () {
  return localStorage.getItem('lang') || process.env.VUE_APP_LANG || 'zh'
}

export const setLang = function (lang) {
  localStorage.setItem('lang', lang)
}

export const valueToListByEnter = function (value) {
  if (!value) {
    return false
  }
  if (Array.isArray(value)) {
    return value
  }
  if (typeof value === 'string') {
    return value.split(/[(\r\n)\r\n]+/)
  }
}

export function isEmpty (value) {
  if (typeof value === 'string') {
    return value.trim() === ''
  }

  if (value === undefined || value === null) {
    return true
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.length === 0
    } else {
      return JSON.stringify(value) === '{}'
    }
  }

  return false
}

// 异步some函数
export const asyncSome = async (arr, predicate) => {
  for (let e of arr) {
    if (await predicate(e)) return true
  }
  return false
}

/**
 * 垂直滚动页面
 * @param {Number} top 位置
 * @param {Number} offset 补偿像素,用于页面有fixed定位头部的场景,一般设为头部高度的负数
 */
export function scrollToTop (top = 0, offset = 0) {
  window.scrollTo({
    top: top + offset,
    behavior: 'smooth'
  })
}

export function scrollToElFormElement (elForm, offset = 0, fn) {
  let firstErrorItem = elForm.querySelectorAll('.el-form-item.is-error')[0]
  if (firstErrorItem) {
    if (typeof fn === 'function') {
      fn(firstErrorItem)
      return
    }
    let boxModel = firstErrorItem.getBoundingClientRect()
    let scrollTop =
      document.documentElement.scrollTop ||
      window.pageYOffset ||
      document.body.scrollTop
    let computedTop = scrollTop + boxModel.top
    scrollToTop(computedTop, offset)
  }
}

// 替换请求协议为本站相同的协议
export function getSameProtocol (url) {
  if (!url) {
    return url
  }
  return url.replace(/^(http|https)/, window.location.protocol.split(':')[0])
}
