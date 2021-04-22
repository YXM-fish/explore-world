/**
 * // el-select 多选下拉默认值只读，不可删除
 * // el-select 的clearable功能依旧可删除默认值
 *
 * 使用示例：data-valueKey="attrTermId" v-slDefaultValOnlyRead="{'selected': [1,2,3], 'defaultVal': [2]}"
 * 使用示例：data-valueKey="attrTermId" v-slDefaultValOnlyRead="{'selected': [{id:1, label:'test1'}, {id:2, label:'test2'}], 'defaultVal': [{id:2}]}"
 *
 * data-valueKey: el-select组件的value-key，el-select的v-model值为对象类型时必填
 * @params {selected}: el-select组件v-model的数据 (required: true, type: Array)
 * @params {defaultVal}: 默认值（required: true, type: Array） 数据格式需和selected保持一致
 *
 */
const defaultValOnlyRead = {}
defaultValOnlyRead.install = Vue => {
    Vue.directive('slDefaultValOnlyRead', {
        bind(el, binding) {
            hiddenCloseTag(el, binding)
        },
        update(el, binding, node) {
            let { value: { selected = [] }, oldValue: { selected: oldSelected = [] }} = binding
            if (oldSelected.length > selected.length) {
                // 删除的时候不做处理
                return
            }

            hiddenCloseTag(el, binding)
        }
    })
}

function hiddenCloseTag(el, binding) {
    let valueKey = el.getAttribute('data-valueKey') || ''
    let { selected = [], defaultVal = [] } = binding.value

    let disableIndex = []
    selected.forEach((selectedItem, index) => {
        defaultVal.forEach((defaultItem) => {
            let valEqual = valueKey ? (selectedItem[valueKey] === defaultItem[valueKey]) : selectedItem === defaultItem
            if (valEqual) {
                disableIndex.push(index)
            }
        })
    })

    setTimeout(() => {
        const tags = el.querySelectorAll('.el-tag__close')
        tags.forEach((tag, index) => {
            tag.setAttribute('style', 'display: null;')
            if (disableIndex.includes(index)) {
                tag.setAttribute('style', 'display: none;')
            }
        })
    })
}

export default defaultValOnlyRead
