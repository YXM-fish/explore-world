
/**
 *
 * @param {number|string} value 数值
 * @param {number} extra 保留小数位
 */
export function thousandsSeparate (value, extra) {
  let isNegative = /^-/.test(value)
  let num = Math.abs(Number(value))
  let valueStr = '' + num
  let arr = []
  if (isNaN(num)) {
    return null
  }
  arr = valueStr.split('.')// 分成整数和小数部分
  if (arr[1]) {
    arr[1] = '.' + arr[1].substr(0, extra)
  } else {
    arr[1] = ''
  }

  return (isNegative ? '-' : '') + arr[0].replace(/(?!^)(?=(\d{3})+$)/g, ',') + arr[1]
}
