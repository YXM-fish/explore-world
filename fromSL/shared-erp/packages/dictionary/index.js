import Global from 'utils/global'

/**
 * 通过字典名获取选项
 * @param {String} code
 * @param {Array} config.appoint 用户指定需要的数据
 * @param {'value' | 'code'} config.appointKey 返回时指定选项时, 过滤标准标准是哪个字段
 * @param {Boolean} config.isObject 是否返回Object类型的数据
 * @param {'value' | 'code'} config.objectKey 返回时Object类型时, 对象的key是哪个字段
 * @param {'label'} config.objectValue 返回时Object类型时, 对象的value是哪个字段
 */
const getDictionary = function (code, config = {}) {
    // 获取到用户目标的源数组
    let options = this.data[code]
    const { appoint = [], appointKey = 'value', isObject = false, objectKey = 'value', objectValue = 'label' } = config

    // 有指定数据的话，只返回指定数据
    if (appoint.length > 0) {
        options = options.filter((option) => appoint.includes(option[appointKey]))
    }
    // 如果是Object类型数据的话, 则将数据转成Object返回
    if (isObject) {
        return arrayToObject(options, objectKey, objectValue)
    }
    return options
}

/**
 *
 * @param {String} code 字典名
 * @param {String|Number} value 字典项的value
 */
const labelDictionary = function (code, value, key = 'code') {
    // 获取到用户目标的源数组
    let options = this.data[code]
    const object = options.find((option) => option[key] === value)
    return object ? object.label : ''
}

/**
 *
 * @param {Array} array 数据源
 * @param {String} config.code
 * @param {String} config.value
 * @param {String} config.label
 * @param {Boolean} config.isObject 是否返回Object类型的数据
 * @param {'value' | 'code'} config.objectKey 返回时Object类型时, 对象的key是哪个字段
 * @param {'label'} config.objectValue 返回时Object类型时, 对象的value是哪个字段
 */
const format = function (array = [], config = {}) {
    const { code = 'value', value = 'enumValue', label = 'name', isObject = false, objectKey = 'value', objectValue = 'label' } = config
    const options = array.map((option) => {
        return {
            code: option[code],
            value: option[value],
            label: option[label]
        }
    })
    // 如果是Object类型数据的话, 则将数据转成Object返回
    if (isObject) {
        return arrayToObject(options, objectKey, objectValue)
    }
    return options
}

/**
 * 将数组转换成对象输出
 * @param {Array} array 数据源
 * @param {String} objectKey [required] 对象key取值的属性
 * @param {String} objectValue [required] 对象value取值的属性
 */
const arrayToObject = function (array = [], objectKey, objectValue) {
    let objectOption = {}
    array.forEach(option => {
        objectOption[option[objectKey]] = option[objectValue]
    })
    return objectOption
}

// 返回给用户调用的方法
const dictionary = {
    // 数据源
    data: {},
    get: getDictionary,
    label: labelDictionary,
    format
}

// 安装模块，将其挂载在Vue实例上
const DictionaryServer = {
    install: (Vue) => {
        dictionary.data = loadData()
        Vue.prototype.$dictionary = dictionary
    }
}

/**
 * 加载字典数据项
 */
const loadData = function () {
    let data = { ...Global.options }
    const dictionaryModules = require.context('./', true, /\.js$/)
    dictionaryModules.keys().forEach((fileName) => {
        const module = dictionaryModules(fileName)
        Object.keys(module).forEach((dataName) => {
            const moduleData = module[dataName]
            Object.keys(moduleData).forEach((dictionary) => {
                if (data[dictionary]) {
                    console.warn(`[dictionary] Duplicate named dictionary definition: ${dictionary}`)
                }
            })
            Object.assign(data, moduleData)
        })
    })
    return data
}

export default DictionaryServer
