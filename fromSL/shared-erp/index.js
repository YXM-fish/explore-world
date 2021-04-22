import Vue from 'vue'
// 指令
const requireDirectives = require.context('./directives', true, /\w+\.(js)$/)
const excludesDirectives = ['./sticky.js'] // 不注册到全局上的文件列表，可以考虑删除对应的文件
requireDirectives.keys().forEach(fileName => {
    if (!excludesDirectives.includes(fileName)) {
        const file = requireDirectives(fileName)
        const config = file.default || file
        Vue.use(config)
    }
})

/**
 * 已存在的组件
 * 命名规范: 以Sl开头,表明注册为全局组件
 * 组件列表：SlLoading ,SlSortElement ,SlBackTop ,SlCheckoutBox ,SlCheckoutBoxColor ,SlDatePicker ,
 *          SlPoper ,SlProgress ,SlRadioBox ,SlTable ,SlInnerTable ,SlMergeTable ,SlOrderTable ,SlShowImage ,
 *          SlPagination ,SlTextBox ,SlWarehouseSelect ,SlSticky ,SlFormItemContainer ,SlWithTitleContainer ,
 *          SlTinymceEditor ,SlUploadFiles ,SlUploadFile ,SlUploadImage ,SlFileView, SlSelect
 */
const requireComponents = require.context('./components', true, /\w+\.(vue)$/)
requireComponents.keys().forEach(fileName => {
    const file = requireComponents(fileName)
    const config = file.default || file
    const name = config.name
    if (name && name.indexOf('Sl') !== -1) {
        Vue.component(config.name, config)
    }
})

/**
 * 过滤器
 */
import * as filters from './filters'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
