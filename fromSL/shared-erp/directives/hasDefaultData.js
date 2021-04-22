/**
 * [mapData, selData]
 * mapData: 下拉数据集合
 * selData：默认选中数据id集合
 */
const focus = {}
focus.install = Vue => {
    Vue.directive('hasDefaultData', {
        bind(el, bindings) {
            const [mapData, selData] = bindings.value
            let disableIndex = []
            selData.forEach((selItem, index) => {
                const selObj = mapData.find(
                    (mapItem) => mapItem.id === selItem
                )
                if (selObj) disableIndex.push(index)
            })

            setTimeout(() => {
                const tags = el.querySelectorAll('.el-tag__close')
                tags.forEach((tag, index) => {
                    if (disableIndex.includes(index)) {
                        tag.classList.add('default-none')
                    }
                })
            })
        }
    })
}
export default focus
