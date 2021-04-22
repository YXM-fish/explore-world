/**
 * Created by jiachenpan on 16/11/18.
 */

/* 是否是公司邮箱*/
export function isWscnEmail(str) {
    const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i
    return reg.test(str.trim())
}

/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 验证key*/
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}

/* 纯数字*/
export function validatNumber(str) {
    const reg = /^[0-9]*$/
    return reg.test(str)
}

/* 0-100数字*/
export function validateNumber0_100(str) {
    const reg = /^([1-9]?\d|100)$/
    return reg.test(str)
}

/* 汇率验证 */
export function validatCnyRate(value) {
    let regexp = /^\d{1,5}(?:\.\d{0,5})?$/
    if (value && value <= 0) {
        return '汇率不能小于等于0'
    } if (value && !regexp.test(value)) {
        return '汇率整数不能超过5位并且小数点不能超过5位'
    } else {
        return true
    }
}
// 身份证号码
export const validateCardId = (rule, value, callback) => {
    let reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    if (!reg.test(value)) {
        callback(new Error('请输入合法的身份证号码'))
    } else {
        callback()
    }
}
// url
export const validateUrl = (rule, value, callback) => {
    var url = /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
    if (value && !url.test(value)) {
        callback(new Error('请输入正确格式的URL'))
    } else {
        callback()
    }
}
// 非必填表单整数类型字段验证
export function formNoRequiredInterger(value) {
    if (!value && value !== 0) {
        return true
    }

    if (typeof value === 'string' && value.trim() === '') {
        return true
    }

    return /(^([^0][0-9]+|0)$)|(^([1-9]+)$)/.test(value)
}

/* 电话号码 */
export function validatPhone(str) {
    const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/
    return reg.test(str)
}

/* 中文验证 */
export function chineseValidate(value, min, max) {
    const reg = new RegExp('^[\\u4e00-\\u9fa5]{' + min + ',' + max + '}$')
    return reg.test(value)
}

/* 常规字符验证字母、数字、-、_ */
export function mormalCharValidate(value, min, max) {
    const reg = new RegExp('^[\\w-]{' + min + ',' + max + '}$')
    return reg.test(value)
}

/* 正数验证包括小数 */
export function positiveNumberValidate(value) {
    const reg = /^([1-9][0-9]*)(\.\d*[1-9]+)?$/
    return reg.test(value)
}

/* 正整数校验 */
export function positiveIntegerValidate(value) {
    const reg = /^[1-9][0-9]*$/
    return reg.test(value)
}


/**
 * 浮点数校验并转换
 * @param {*} value 输入值
 * @param {*} eventType 事件类型,用于确定是否去掉末尾的小数点
 * @param {*} decimalPlaces 小数位数
 * @param {*} max 允许最大值
 * @returns 返回转换值
 */
export function floatNumberValidate(value, eventType, decimalPlaces = 2, max = 999999) {
    value = String(value)
    // 先把非数字的都替换掉，除了数字和.
    value = value.replace(/[^\d.]/g, '')
    // 必须保证第一个为数字而不是.
    value = value.replace(/^\./g, '')
    // 保证只有出现一个.而没有多个.
    value = value.replace(/\.{2,}/g, '')
    // 保证.只出现一次，而不能出现两次以上
    value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    let index = -1
    for (let i in value) {
        if (value[i] === '.') {
            index = i
        }
        if (index !== -1) {
            if (i - index > decimalPlaces) {
                value = value.substring(0, value.length - 1)
            }
        }
    }
    if (Number(value) > max) {
        if (value.indexOf('.') > -1) {
            let valueArr = value.split('.')
            if (Number(valueArr[0]) >= max) {
                value = max
            } else {
                value = valueArr[0].slice(0, String(max).length) + '.' + valueArr[1]
            }
        } else {
            value = value.slice(0, String(max).length)
        }
    }

    // 如果末尾剩一个小数点,去掉
    if ((eventType === 'change' || eventType === 'blur') && value.indexOf('.') === value.length - 1) {
        value = value.replace('.', '')
    }

    return value
}

/**
 * 校验1688地址：关键字 detail.1688.com/offer/620051018159.html
 * @param {String} 1699 url
 */
export function url1688Validate(url) {
    return validateURL(url) && /.1688\.com\/(offer|buyer\/offerdetail)\/[0-9]+\.html/.test(url)
}


