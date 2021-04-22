/**
 * @desc 处理数字精度问题
 * @method keepDecimal
 * @param {number, string} val 要处理的值
 * @param {number} decimalPlace 小数点位数，默认两位小数（注：如果val是整数，则不保留小数位）
 * @return {number} 返回整数或保留两位小数的数字
 *
 * @date 2017-07-16
 * author Nancy
 */
export function keepDecimal(val, decimalPlace = 2, isRound) {
    let result = ''
    if (val) {
        const splitVal = String(val).split('.')
        if (splitVal.length === 1) {
            result = val
        } else {
            if (isRound) {
                return Math.round(val * 100) / 100
            }
            result = splitVal[0] + '.' + splitVal[1].substring(0, decimalPlace)
        }
    }
    return Number(result)
}
// 处理乘法精度
export function accMultiplication(num1, num2) {
    var m = 0
    var s1 = num1.toString()
    var s2 = num2.toString()
    try {
        m += s1.split('.')[1].length
    } catch (e) {}
    try {
        m += s2.split('.')[1].length
    } catch (e) {}
    return (
        (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
                Math.pow(10, m)
    )
}
