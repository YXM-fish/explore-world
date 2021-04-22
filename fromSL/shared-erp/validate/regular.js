// 密码至少包含两种字符,数字、大写字母、小写字母任意两种或三种
export const passwordReg = /(?!^[0-9]{6,20}$)(?!^[a-z]{6,20}$)(?!^[A-Z]{6,20}$)^[0-9A-Za-z]{6,20}$/
export const phoneNoReg = /^((\+86)?(13\d|14[5-9]|15[0-35-9]|16[25-7]|17[0-8]|18\d|19[0-25-9])\d{8})$/
export const numberReg = /^[0-9]+$/
export const letterReg = /^[A-Za-z]+$/
export const wordCharacterReg = /^\w+$/
export const emptyReg = /^$/
// 18位/15位身份证校验
export const idCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/
// 支持中文用户名
export const emailReg = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,8})$/
// 0-999999.99
export const smallReg = /^((([^0][0-9]+|0)\.([0-9]{1,6}))$)|^(([1-9]+)\.([0-9]{1,2})$)/
// 营业执照号15位或18位
export const businessLicenseNoReg = /(^(?:(?![IOZSV])[\dA-Z]){2}\d{6}(?:(?![IOZSV])[\dA-Z]){10}$)|(^\d{15}$)/
// 根据ISO标准,银行卡长度一般在13-19位,首位不为0
export const bankCardNumberReg = /^[1-9]\d{12,18}$/
// QQ号
export const qqReg = /^[1-9][0-9]{4,14}$/
// 微信号
export const weChatReg = /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/
// 国内固定电话,最多20位字符
export const telePhoneReg = /^((0\d{2,3})-?)?\d{7,8}(-?(\d{3,6}))?$/
