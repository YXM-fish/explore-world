/**
 *
 * @param {number} num 金额
 * @returns 每千位按逗号分隔
 */
export function moneyFormatter(num) {
    num = +num
    if (!isNaN(num)) {
        let [int, dec] = num.toString().split('.')
        const reg = /(-?\d+)(\d{3})/g
        while (reg.test(int)) {
            int = int.replace(reg, '$1,$2')
        }
        return dec ? [int, dec].join('.') : int
    } else {
        return '-'
    }
}

/**
 * 对象数组去重
 * @param {Object[]} data 数据源
 * @param {String} compareKey 对比的property
 */
export function filterRepeat(data, compareKey) {
    const mapper = {}
    return data.reduce((acc, item) => {
        const key = item[compareKey]
        if (!mapper[key]) {
            mapper[key] = true
            acc.push(item)
        }
        return acc
    }, [])
}
