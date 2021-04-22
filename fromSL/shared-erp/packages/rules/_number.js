

export default {
    /**
     * 校验最小值
     * @param {String} tips 校验不通过时的提示语
     * @param {Number} maxValue 最大值
     */
    validateMinNumber(tips, maxValue) {
        this.rules.push((value) => {
            value = value || 0
            maxValue = maxValue || 0
            if (Number(value) > Number(maxValue)) {
                return tips
            }
            return true
        })
        return this
    },
    /**
     * 校验最大值
     * @param {String} tips 校验不通过时的提示语
     * @param {Number} maxValue 最小值
     */
    validateMaxNumber(tips, minValue) {
        this.rules.push((value) => {
            value = value || 0
            minValue = minValue || 0
            if (Number(value) < Number(minValue)) {
                return tips
            }
            return true
        })
        return this
    }
}
