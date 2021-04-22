/**
 * 功能描述：限制只能输入数字，可通过decimalsPlace参数值保留多少位小数，通过maxlength参数限制能输入的最大长度
 * 用法：在绑定的元素上添加指令 v-number, 要传参用法：v-number="{decimalsPlace: 0, maxlength: 8}"
 *
 * @params {number} decimalsPlace 小数点位数 默认两位小数
 * @params {number} maxlength 最大长度(注：不包括小数点和小数位数) 默认最大长度9位
 * @return {string} 不超过最大长度并且小数点保留decimalsPlace位的值
 *
 * @data 2020-07-16
 * @author Nancy
 */
export default (Vue) => {
    Vue.directive('number', {
        bind: function (el, binding, vnode) {
            // 默认两位小数
            let decimalsPlace = 2
            // 默认最大长度9
            let maxlength = 9
            let { value } = binding
            if (value) {
                decimalsPlace = value.decimalsPlace ? value.decimalsPlace : value.decimalsPlace === 0 ? 0 : decimalsPlace
                maxlength = value.maxlength || maxlength
            }
            const input = el.getElementsByTagName('input')[0]

            const inputMaxLen = Number(decimalsPlace) + Number(maxlength) + (!!Number(decimalsPlace) & 1)
            let lastValue = ''

            const oninput = (el) => {
                let inputVal = el.target.value
                let result
                // 验证长度
                const lenReg = new RegExp(`(^[0-9]{${maxlength + 1}}$)`)
                // 正整数
                if (decimalsPlace === 0) {
                    result = inputVal.replace(/[^\d]/g, '')
                        .replace(lenReg, inputVal.substring(0, maxlength))
                } else {
                    // 小数
                    const reg = new RegExp(`^(-)*(\\d+)\\.(\\d{${decimalsPlace}}).*$`)
                    result = inputVal.replace(/[^\d.]/g, '')
                        .replace(/^\./g, '')
                        .replace(lenReg, inputVal.substring(0, maxlength))
                        .replace(/\.{2,}/g, '.')
                        .replace('.', '$#$')
                        .replace(/\./g, '')
                        .replace('$#$', '.')
                        .replace(reg, '$1$2.$3')
                }

                if (value.exact) {
                    if (inputVal === result && result.length > inputMaxLen) {
                        el.target.value = lastValue
                    } else {
                        el.target.value = result
                        lastValue = result
                    }
                } else {
                    el.target.value = result
                }
                if (inputVal !== result) {
                    input.dispatchEvent(new Event('input'))
                }
            }
            if (input) {
                input.addEventListener('input', oninput)
            }
        }
    })
}
