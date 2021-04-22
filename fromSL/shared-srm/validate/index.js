import { isEmpty } from '@shared/util'
import {
  passwordReg,
  phoneNoReg,
  smallReg,
  businessLicenseNoReg,
  emailReg,
  numberReg,
  idCardReg,
  bankCardNumberReg,
  emptyReg,
  qqReg,
  weChatReg,
  telePhoneReg
} from './regular.js'

/**
 * 生成验证器
 * @param {RegExp|Function} validateRule 正则或者函数
 * @param {String} errorMsg 错误提示
 */
export function generateFormItemValidator (validateRule, errorMsg) {
  return (rule, value, callback) => {
    let isFailed = typeof validateRule === 'object' ? !validateRule.test(value) : validateRule(value)
    if (isFailed) {
      callback(new Error(errorMsg))
    } else {
      callback()
    }
  }
}

/**
 * 函数验证器
 * @param {String} errorMsg 错误消息
 * @param {Function} fn 判断数据错误的方法,返回Boolean类型
 * @param {String|Array} trigger 触发方式
 */
export const fnValidator = function (errorMsg, fn, trigger = 'blur', required = false) {
  return {
    validator: generateFormItemValidator(fn, errorMsg),
    message: errorMsg,
    trigger: trigger,
    required: required
  }
}

/**
 * 生成可为空的验证器
 * @param {String} errorMsg
 * @param {RegExp} businessReg
 * @param {String|Array} trigger
 */
export const generateNotRequiredValidator = function (errorMsg, businessReg, trigger = 'blur') {
  let fn = function (value) {
    return !emptyReg.test(value) && !businessReg.test(value)
  }
  return {
    validator: generateFormItemValidator(fn, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

export const emptyValidator = function (errorMsg, trigger = 'blur', required = true) {
  return {
    validator: (rule, value, callback) => {
      if (isEmpty(value)) {
        callback(new Error(errorMsg))
      } else {
        callback()
      }
    },
    message: errorMsg,
    trigger: trigger,
    required: required
  }
}

/**
 * 字符长度校验器
 * @param {String} errorMsg
 * @param {Number} min
 * @param {Number} max
 * @param {String} trigger
 */
export const charLimitValidator = function (errorMsg, min, max, trigger = 'blur', required = true) {
  if (!required) {
    const CHAR_LENGTH_REG = new RegExp('^.{' + min + ',' + max + '}$')
    return generateNotRequiredValidator(errorMsg, CHAR_LENGTH_REG, trigger)
  }
  return {
    min,
    max,
    message: errorMsg,
    trigger: trigger
  }
}

export const passwordValidator = function (errorMsg = '至少包含两种字符的组合,支持数字、大小写字母', trigger = 'blur') {
  return {
    validator: generateFormItemValidator(passwordReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

export const phoneNoValidator = function (errorMsg = '请输入正确格式手机号码', trigger = 'blur') {
  return {
    validator: generateFormItemValidator(phoneNoReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

export const emailValidator = function (errorMsg = '请输入正确的邮箱地址', trigger = 'blur') {
  return {
    validator: generateFormItemValidator(emailReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

// 身份证校验
export const idCardValidator = function (errorMsg = '请输入正确的身份证号', trigger = 'blur') {
  return {
    validator: generateFormItemValidator(idCardReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

export const digitalValidator = function (errorMsg = '请输入数字', trigger = 'blur', required = true) {
  if (!required) {
    return generateNotRequiredValidator(errorMsg, numberReg, trigger)
  }
  return {
    validator: generateFormItemValidator(numberReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

export const smallValidator = function (errorMsg = '请输入0.00-999999.99之间的数字', trigger = 'blur', required = true) {
  return {
    validator: generateFormItemValidator(smallReg, errorMsg),
    message: errorMsg,
    trigger: trigger,
    required: required
  }
}

export const numberValidator = function (errorMsg = '', trigger = 'blur', required = false, len) {
  // 根据传入的要校验的数字长度
  const number = `^[0-9]`
  const pattern = new RegExp(`${number}{0,${len}}$`)
  return {
    validator: generateFormItemValidator(pattern, errorMsg),
    message: errorMsg,
    trigger: trigger,
    required: required
  }
}

// 营业执照号验证
export const businessLicenseNoValidator = function (errorMsg = '', trigger = 'blur') {
  return {
    validator: generateFormItemValidator(businessLicenseNoReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

// 交易额
export const transactionAamountValidator = function (errorMsg = '', trigger = 'blur') {
  let transactionAamountReg = /^(([1-9][0-9]{0,7})|0)(\.[0-9][1-9]?)?$/
  return {
    validator: generateFormItemValidator(transactionAamountReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

// 银行卡号
export const bankCardNumberValidator = function (errorMsg = '请输入正确的银行卡号', trigger = 'blur') {
  return {
    validator: generateFormItemValidator(bankCardNumberReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

// QQ号
export const qqValidator = function (errorMsg = '请输入正确的qq号', trigger = 'blur', required = false) {
  if (!required) {
    return generateNotRequiredValidator(errorMsg, qqReg, trigger)
  }
  return {
    validator: generateFormItemValidator(qqReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

// 微信号
export const weChatValidator = function (errorMsg = '请输入正确的微信号', trigger = 'blur', required = false) {
  if (!required) {
    return generateNotRequiredValidator(errorMsg, weChatReg, trigger)
  }
  return {
    validator: generateFormItemValidator(weChatReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}

// 国内固定电话
export const telePhoneValidator = function (errorMsg = '请输入正确的电话号码', trigger = 'blur', required = false) {
  if (!required) {
    return generateNotRequiredValidator(errorMsg, telePhoneReg, trigger)
  }
  return {
    validator: generateFormItemValidator(telePhoneReg, errorMsg),
    message: errorMsg,
    trigger: trigger
  }
}
