/**
 * Created by jiachenpan on 16/11/18.
 */

import { Message } from 'element-ui'
import store from 'store/index'
let CryptoJS = require('crypto-js')

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1] }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

// 格式化时间
export function getQueryObject(url) {
    url = url == null ? window.location.href : url
    const search = url.substring(url.lastIndexOf('?') + 1)
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen(val) {
    let len = 0
    for (let i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/gi) != null) {
            len += 1
        } else {
            len += 0.5
        }
    }
    return Math.floor(len)
}

export function cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
        if (actual[i]) {
            newArray.push(actual[i])
        }
    }
    return newArray
}

export function param(json) {
    if (!json) return ''
    return cleanArray(
        Object.keys(json).map(key => {
            if (json[key] === undefined) return ''
            return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
        })
    ).join('&')
}

export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

export function html2Text(val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
}

export function objectMerge(target, source) {
    /* Merges two  objects,
     giving the last one precedence */

    if (typeof target !== 'object') {
        target = {}
    }
    if (Array.isArray(source)) {
        return source.slice()
    }
    for (const property in source) {
        if (source.hasOwnProperty(property)) {
            const sourceProperty = source[property]
            if (typeof sourceProperty === 'object') {
                target[property] = objectMerge(target[property], sourceProperty)
                continue
            }
            target[property] = sourceProperty
        }
    }
    return target
}

export function scrollTo(element, to, duration) {
    if (duration <= 0) return
    const difference = to - element.scrollTop
    const perTick = (difference / duration) * 10
    setTimeout(() => {
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to) return
        scrollTo(element, to, duration - 10)
    }, 10)
}

export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString =
            classString.substr(0, nameIndex) +
            classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

export const pickerOptions = [
    {
        text: '今天',
        onClick(picker) {
            const end = new Date()
            const start = new Date(new Date().toDateString())
            end.setTime(start.getTime())
            picker.$emit('pick', [start, end])
        }
    },
    {
        text: '最近一周',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
        }
    },
    {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
        }
    },
    {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString())
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
        }
    }
]

let startshortcuts = [
    {
        text: '今天',
        onClick(picker) {
            let dataTime = new Date()
            dataTime.setHours(0)
            dataTime.setMinutes(0)
            dataTime.setSeconds(0)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '昨天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(0)
            dataTime.setMinutes(0)
            dataTime.setSeconds(0)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近三天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(0)
            dataTime.setMinutes(0)
            dataTime.setSeconds(0)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 3)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近七天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(0)
            dataTime.setMinutes(0)
            dataTime.setSeconds(0)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近15天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(0)
            dataTime.setMinutes(0)
            dataTime.setSeconds(0)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 15)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近30天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(0)
            dataTime.setMinutes(0)
            dataTime.setSeconds(0)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近90天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(0)
            dataTime.setMinutes(0)
            dataTime.setSeconds(0)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', dataTime)
        }
    }
]
export let startPickerOptions = {
    disabledDate(time) {
        return time.getTime() > Date.now()
    },
    shortcuts: startshortcuts
}

export let noDisabledStartPickerOptions = {
    shortcuts: startshortcuts
}

let endShortcuts = [
    {
        text: '今天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(23)
            dataTime.setMinutes(59)
            dataTime.setSeconds(59)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '昨天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(23)
            dataTime.setMinutes(59)
            dataTime.setSeconds(59)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近三天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(23)
            dataTime.setMinutes(59)
            dataTime.setSeconds(59)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 3)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近七天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(23)
            dataTime.setMinutes(59)
            dataTime.setSeconds(59)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近15天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(23)
            dataTime.setMinutes(59)
            dataTime.setSeconds(59)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 15)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近30天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(23)
            dataTime.setMinutes(59)
            dataTime.setSeconds(59)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', dataTime)
        }
    },
    {
        text: '最近90天',
        onClick(picker) {
            const dataTime = new Date()
            dataTime.setHours(23)
            dataTime.setMinutes(59)
            dataTime.setSeconds(59)
            dataTime.setTime(dataTime.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', dataTime)
        }
    }
]

export let singlePickerOptions = {
    disabledDate(time) {
        return time.getTime() > Date.now()
    },
    shortcuts: endShortcuts
}

export let noDisabledPickerOptions = {
    shortcuts: endShortcuts
}

export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

export function debounce(fun, delay) {
    let deferTimer
    return function (...args) {
        let that = this
        let _args = args
        clearTimeout(deferTimer)
        deferTimer = setTimeout(function () {
            fun.apply(that, _args)
        }, delay)
    }
}


export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    for (const keys in source) {
        if (Object.prototype.hasOwnProperty.call(source, keys)) {
            if (source[keys] && typeof source[keys] === 'object') {
                targetObj[keys] = source[keys].constructor === Array ? [] : {}
                targetObj[keys] = deepClone(source[keys])
            } else {
                targetObj[keys] = source[keys]
            }
        }
    }
    return targetObj
}

export const b64toBlob = (b64Data, contentType = '', sliceSize = 1024) => {
    const byteCharacters = atob(b64Data)

    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize)

        const byteNumbers = new Array(slice.length)
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        const byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, {
        type: contentType
    })
    return blob
}
// function b64EncodeUnicode(str) {
//   return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
//       return String.fromCharCode(parseInt(p1, 16))
//   }))
// }
// function b64DecodeUnicode(str) {
//   return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
//   }).join(''))
// }

export function compareDate(startDate, endDate) {
    if (startDate && endDate) {
        var sDate = new Date(startDate)
        var eDate = new Date(endDate)
        if (sDate.getTime() > eDate.getTime()) {
            // 转换成毫秒进行比较
            return true
        }
    }
    return false
}

export function onbeforeunload() {
    var scrollPos = 0
    scrollPos = document.documentElement.scrollTop
    sessionStorage.setItem('scrollTop', scrollPos)
}

export function scrollback() {
    let scrollPos = sessionStorage.getItem('scrollTop')
    document.documentElement.scrollTop = scrollPos
    document.body.scrollTop = scrollPos
}

var isObject = (arg) => typeof arg === 'object' && arg !== null
export function removeKey(o, key) {
    isObject(o) && Object.keys(o).forEach(function (k) {
        (k === key && (!o[k] || o[k].length === 0)) && delete o[k] ||
            (o[k] && isObject(o[k]) && removeKey(o[k], key))
    })
    return o
}

export function changeValue(o) {
    o.forEach(ev => {
        if (!ev.children) {
            ev.children = []
        } else {
            changeValue(ev.children)
        }
    })
    return o
}

var setItem = (opt, item, key, defaultValue) => {
    switch (opt) {
        case 0:
            !!item.hasOwnProperty(key) &&
                Object.defineProperty(item, key, {
                    value: defaultValue
                })
            break
        case 1:
            item.hasOwnProperty(key) && delete item[key]
            break
        case 2:
            item.hasOwnProperty(key) && (item[key] = defaultValue)
            break
    }
}
/* 对象增、删、改属性 (zhangjian)
 * @opt: 操作方式
 * @o: 操作对象
 * @deepKey：递归遍历键
 * @key：操作键
 * @key：键值
 */
export function batchKey(opt, o, deepKey, key, defaultValue) {
    if (!isObject(o)) return false
    if ([0, 1, 2].indexOf(opt) == -1) return false
    // opt: 0增加  1删除  2修改
    let _item = null
    if (o instanceof Array) {
        let _copy = []
        o.forEach(item => {
            _item = item
            if (deepKey && item[deepKey]) {
                _item[deepKey] = batchKey(
                    opt,
                    item[deepKey],
                    deepKey,
                    key,
                    defaultValue
                )
            }
            setItem(opt, _item, key, defaultValue)
            _copy.push(_item)
        })
        return _copy
    } else {
        if (deepKey && o[deepKey]) {
            o[deepKey] = batchKey(opt, o[deepKey], key, defaultValue, deepKey)
        }
        setItem(opt, o, key, defaultValue)
        return o
    }
}

export function throttle(fun, delay) {
    let last, deferTimer
    return function (args) {
        let that = this
        let _args = arguments
        let now = +new Date()
        if (last && now < last + delay) {
            clearTimeout(deferTimer)
            deferTimer = setTimeout(() => {
                last = now
                fun.apply(that, _args)
            }, delay)
        } else {
            last = now
            fun.apply(that, _args)
        }
    }
}

export function _throttle(func, wait) {
    let previous = 0
    return function () {
        let now = Date.now()
        let context = this
        let args = arguments
        if (now - previous > wait) {
            func.apply(context, args)
            previous = now
        }
    }
}

// 导出
let getExcelStream = (url, cb, callbackFn, isLoading, params, type = 'GET') => {
    if (isLoading) {
        store.dispatch('openLoading', {
            background: 'rgba(255, 255, 255, 0.6)',
            text: '导出中···'
        })
    }
    let contentType = ''
    let xhr = new XMLHttpRequest()
    xhr.addEventListener('abort', () => {
        callbackFn && typeof callbackFn === 'function' && callbackFn()
    })
    xhr.open(type, url, true)
    xhr.responseType = 'arraybuffer'
    xhr.setRequestHeader('Accept', 'application/json, application/vnd.ms-excel, */*;charset')
    if (type === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
        xhr.send(JSON.stringify(params))
    }
    xhr.onreadystatechange = function () {
        contentType = this.getResponseHeader('content-type')
    }
    xhr.onload = function () {
        if (isLoading) {
            store.dispatch('closeLoading')
        }
        if (xhr.status === 400) {
            arrayBufferToJson(xhr.response).then(data => {
                let obj = JSON.parse(data)
                Message({
                    message: obj.error ? obj.error.message : '未找到导出数据',
                    type: 'error',
                    duration: 5 * 1000
                })
            })
            callbackFn && typeof callbackFn === 'function' && callbackFn()
            return
        }

        if (!contentType || contentType.indexOf('json') > -1) {
            Message({
                message: '数据错误',
                type: 'error',
                duration: 5 * 1000
            })
            callbackFn && typeof callbackFn === 'function' && callbackFn()
            return
        }
        let arrayBuffer = xhr.response // Note: not xhr.responseText
        if (arrayBuffer) {
            let byteArray = new Uint8Array(arrayBuffer)
            cb && cb(byteArray)
        }
        callbackFn && typeof callbackFn === 'function' && callbackFn()
    }
    xhr.send(null)
}

export function downloadFile(data, filename) {
    let link = document.createElement('a')
    let url = window.URL.createObjectURL(new Blob([data]))
    link.href = url
    link.download = filename
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

export let exportFiles = (url, name, params) => {
    if (!url) return
    let queryParams = buildQueryUrl(url, params)
    const elemA = document.createElement('a')
    elemA.download = name
    elemA.href = queryParams
    elemA.target = '_blank'
    document.body.appendChild(elemA)
    elemA.click()
}

export let exportFileWithCrossOrigin = (url, name, params, { isLoading, cb } = { isLoading: true, cb: () => {} }) => {
    if (isLoading) {
        store.dispatch('openLoading', {
            background: 'rgba(255, 255, 255, 0.6)',
            text: '拼命处理中···'
        })
    }
    // update: 优化跨域请求时，设置download属性失效的问题
    const xhr = new XMLHttpRequest()
    url = buildQueryUrl(url, params)
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function (res) {
        if (isLoading) {
            store.dispatch('closeLoading')
        }
        if (xhr.status === 200) {
            const blob = xhr.response
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, name)
            } else {
                var link = document.createElement('a')
                var body = document.querySelector('body')
                link.href = window.URL.createObjectURL(blob)
                link.download = name
                link.style.display = 'none'
                body.appendChild(link)
                link.click()
                body.removeChild(link)
                window.URL.revokeObjectURL(link.href)
            }
            if (cb) cb()
        } else {
            const fileReader = new FileReader()
            fileReader.onload = function () {
                try {
                    const res = JSON.parse(fileReader.result) // 格式亦或发生异常
                    const errorText = res && res.error && res.error.message || '发生异常'
                    Message({
                        message: errorText,
                        type: 'error',
                        duration: 5 * 1000
                    })
                } catch (err) {
                    Message({
                        message: '发生异常',
                        type: 'error',
                        duration: 5 * 1000
                    })
                }
            }
            fileReader.readAsText(xhr.response)
        }
    }
    xhr.onerror = function () {
        Message({
            message: '发生异常',
            type: 'error',
            duration: 5 * 1000
        })
    }
    xhr.send()
}

let buildQueryUrl = (root, obj) => {
    let params = Object.assign({}, obj, {})
    let ret = []
    for (let d in params) {
        if (params[d] !== '' && params[d] !== undefined && params[d] != null) { ret.push(d + '=' + encodeURIComponent(params[d])) }
    }
    return ret.length > 0 ? `${root}?${ret.join('&')}` : root
}
export function exportExcel(api, queryParams, fileName, callbackFn, type = 'GET') {
    // isLoading true-loading加载效果 false-无loading加载效果，默认有
    let isLoading = true
    if (queryParams) {
        if ('isLoading' in queryParams) {
            isLoading = queryParams.isLoading
            delete queryParams.isLoading
        }
    }
    let query = Object.assign({}, queryParams)
    let _params = {}
    for (let attr in query) {
        if (query[attr] instanceof Array) {
            if (query[attr].length > 0) {
                query[attr].forEach((m, i) => {
                    _params[attr + '[' + i + ']'] = m
                })
                if (type === 'GET') {
                    _params[attr] = query[attr].join(',')
                }
            }
        } else {
            if (
                query[attr] !== '' &&
                query[attr] != undefined &&
                query[attr] != null
            ) {
                _params[attr] = query[attr]
            }
        }
    }
    let url
    if (type === 'GET') {
        url = buildQueryUrl(api, _params)
    } else {
        url = api
    }

    getExcelStream(url, data => {
        let blob = new Blob([data])
        let newHrefUrl = URL.createObjectURL(blob)
        exportFiles(newHrefUrl, fileName)
    }, callbackFn, isLoading, query, type)
}

export function transTime(val) {
    if (val == 0) return 0
    let result = []
    if (val > 1000 * 60 * 60 * 24) { result.push(parseInt(val / (1000 * 60 * 60 * 24)) + '天') }
    if (val > 1000 * 60 * 60) {
        result.push(
            parseInt((val % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + '时'
        )
    }
    if (val > 1000 * 60) { result.push(parseInt((val % (1000 * 60 * 60)) / (1000 * 60)) + '分') } else return 0

    // if(val > 1000) result.push(parseInt((val % (1000 * 60)) / 1000) + '秒')

    // else result.push((val / 1000).toFixed(3) + '秒')

    return result.join('')
}
export function cloneObject(origin) {
    let originProto = Object.getPrototypeOf(origin)
    return Object.assign(Object.create(originProto), origin)
}

export function getDateRange(range) {
    range = range === undefined ? 7 : range
    let startDate = new Date()
    let endDate = new Date()
    let result = []

    result.push(parseTime(startDate.setDate(startDate.getDate() - range), '{y}-{m}-{d}'))
    result.push(parseTime(endDate, '{y}-{m}-{d}'))

    return result
}
export function getDateTimeRange(range, isDefualtTime = true) {
    range = range === undefined ? 7 : range
    // 初始查询条件
    let startDate = new Date(); let endDate = new Date(); let result = []
    if (isDefualtTime) {
        startDate.setHours(0)
        startDate.setMinutes(0)
        startDate.setSeconds(0)

        endDate.setHours(23)
        endDate.setMinutes(59)
        endDate.setSeconds(59)
    }
    result.push(parseTime(startDate.setDate(startDate.getDate() - range), '{y}-{m}-{d} {h}:{i}:{s}'))
    result.push(parseTime(endDate, '{y}-{m}-{d} {h}:{i}:{s}'))
    return result
}
export function getMonthRange() {
    // 初始查询条件
    let result = []
    let startDate = new Date()
    startDate.setDate(1)
    let startTime = parseTime(
        new Date(new Date(startDate).toLocaleDateString()).getTime()
    )

    let endDate = new Date()
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    let endTime = parseTime(+new Date(endDate))
    result.push(startTime)
    result.push(endTime)
    return result
}


function traverseTree(tree, key, vaildArr) {
    if (vaildArr && vaildArr.length === 0) {
        return []
    }
    for (let index = 0; index < tree.length; index++) {
        let ele = tree[index]
        if (ele[key]) {
            if (ele.children && ele.children.length > 0) {
                let children = traverseTree(ele.children, key, vaildArr)
                if (children.length > 0) {
                    traverseTree(ele.children, key, vaildArr)
                } else {
                    tree.splice(index, 1)
                    index--
                }
            } else {
                if (vaildArr && !vaildArr.includes(ele[key])) {
                    tree.splice(index, 1)
                    index--
                }
            }
        } else {
            tree.splice(index, 1)
            index--
        }
    }
    return tree
}

export function removeUnwantedRouter(tree, key, vaildArr) {
    let operationArr = deepClone(tree)
    return traverseTree(operationArr, key, vaildArr)
}


export function undefinedNullToEmpty(value) {
    return (value === undefined || value === null) ? '' : value
}

export function formatThousand(number, places, symbol, behindSymbol) {
    number = number || 0
    places = !isNaN(places = Math.abs(places)) ? places : 2
    symbol = (typeof symbol === 'string') ? symbol : ''
    behindSymbol = (typeof behindSymbol === 'string') ? behindSymbol : ''
    var negative = number < 0 ? '-' : ''
    var i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + ''
    var j = (j = i.length) > 3 ? j % 3 : 0
    return symbol + negative + (j ? i.substr(0, j) + ',' : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + ',') + (places ? '.' + Math.abs(number - i).toFixed(places).slice(2) : '') + behindSymbol
}

export function arrayBufferToJson(arrayBuffer) {
    return new Promise((resolve, reject) => {
        try {
            let blob = new Blob([arrayBuffer], {
                type: 'text/plain'
            })
            let reader = new FileReader()
            reader.readAsText(blob, 'utf-8')
            reader.onload = function () {
                resolve(reader.result)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export function isEmpty(value) {
    if (typeof value === 'string') {
        return value.trim() === ''
    }

    if (value === undefined || value === null) {
        return true
    }

    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            return value.length === 0
        } else {
            return JSON.stringify(value) === '{}'
        }
    }

    return false
}

export function before(n, func) {
    let result
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function')
    }
    return function (...args) {
        if (--n > 0) {
            result = func.apply(this, args)
        }
        if (n <= 1) {
            func = undefined
        }
        return result
    }
}


export function once(func) {
    return before(2, func)
}

export function imgToBase64(image) {
    const canvas = document.createElement('canvas')   // 创建canvas DOM元素
    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext('2d')
    ctx.drawImage(image, 0, 0, image.width, image.height) // 参数可自定义
    return canvas.toDataURL()
}

export function base64ToBlob(base64) {
    let arr = base64.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let blobStr = atob(arr[1])
    let len = blobStr.length
    let u8arr = new Uint8Array(len)

    while (len--) {
        u8arr[len] = blobStr.charCodeAt(len)
    }

    return new Blob([u8arr], { type: mime })
}

/**
 * 去重对象数组
 * @param {Array} objectArr 对象数组
 * @param {String} key 依据去重的标识属性
 */
export function dedupObjectArr(objectArr, key) {
    let hasExisted = {}
    return objectArr.reduce((prev, cur) => {
        if (cur && !hasExisted[cur[key]]) {
            hasExisted[cur[key]] = true
            prev.push(cur)
        }
        return prev
    }, [])
}

/**
 * 从html字符串中提取图片链接
 * @param {String} htmlStr html字符串
 */
export function extractImgSrcFromHtmlStr(htmlStr) {
    let imgURLs = []
    // 匹配图片
    const imgReg = /<img.*?(?:>|\/>)/gi
    // 匹配src属性
    const srcReg = /src=[\\'\\"]?([^\\'\\"]*)[\\'\\"]?/i
    const imgArr = htmlStr.match(imgReg)
    for (let i = 0; i < imgArr.length; i++) {
        let src = imgArr[i].match(srcReg)
        // 获取图片地址
        if (src && src[1]) {
            imgURLs.push(src[1])
        }
    }

    return imgURLs
}

/**
 * 组合排序、生成组合数据
 * @param {Array<Array>} values
 * 入参:[[1,2],[3,4],[5,6]]
 * 出参:
    [1, 3, 5]
    [1, 3, 6]
    [1, 4, 5]
    [1, 4, 6]
    [2, 3, 5]
    [2, 3, 6]
    [2, 4, 5]
    [2, 4, 6]
 */
export function flap(values) {
    var head = values.shift()
    if (values.length === 0) {
        return head.map(ele => [ele])
    }
    var tail = flap(values)
    return head.reduce((prev, cur) => {
        prev = [...prev, ...tail.map(items => [cur, ...items])]
        return prev
    }, [])
}

export function fileToMd5(file) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function (event) {
            return resolve(CryptoJS.MD5(
                CryptoJS.enc.Latin1.parse(event.target.result)
            ).toString())
        }
        reader.readAsText(file)
    })
}

/**
 * 下拉数据搜索排序
 * @param {String} keywords 搜索关键字
 * @param {Array} arrData 搜索数据源
 * @param {String} objProp 如果搜索源是对象数组,可用
 * @param {Function} disabledFn 禁用条件
 */
export function selectOptionsSort(keywords, arrData, objProp, disabledFn) {
    let result = []

    result = arrData
        .filter((item) => {
            let temp = objProp ? item[objProp] : item
            return temp.indexOf(keywords) > -1
        })
        .sort((a, b) => {
            let tempA = objProp ? a[objProp] : a
            let tempB = objProp ? b[objProp] : b
            return tempA.length - tempB.length
        })
        .sort((a, b) => {
            let tempA = objProp ? a[objProp] : a
            let tempB = objProp ? b[objProp] : b
            return (
                tempA.indexOf(keywords) -
                        tempB.indexOf(keywords)
            )
        })


    if (typeof disabledFn === 'function') {
        result.sort((a, b) => {
            if (typeof disabledFn !== 'function') {
                return 0
            }
            let aDisable = disabledFn(a)
            let bDisable = disabledFn(b)
            if (aDisable && !bDisable) {
                return 1
            }

            if (!aDisable && bDisable) {
                return -1
            }
            return 0
        })
    }

    return result
}

/**
 * @param {source} 必传，图片文件或图片地址
 * @param {pixelLimit} 非必传，像素限制{limit:是否限制 minWidth,minHeight, maxWidth, maxHeight}
*/
export function imageToBase64(source, pixelLimit = {}, maxWidth = 4096) {
    return new Promise((resolve, reject) => {
        if (source instanceof Object) {
            let reader = new FileReader()
            reader.readAsDataURL(source)
            reader.onload = (e) => {
                resolve(e.target.result)
            }
        } else {
            let img = new Image()
            img.src = source + '?v=' + Math.random()
            img.crossOrigin = '*'
            img.onload = () => {
                if (pixelLimit.limit) {
                    let { minWidth = 100, minHeight = 100, maxWidth = 4096, maxHeight = 4096 } = pixelLimit
                    if (
                        img.width > maxWidth ||
                  img.width < minWidth ||
                  img.height > maxHeight ||
                  img.height < minHeight
                    ) {
                        resolve({
                            message: `图片宽和高像素要求：大于等于${minWidth}（宽）、${minHeight}（高）且小于等于${maxWidth} （宽）、${maxHeight}（高）`
                        })
                        return
                    }
                }
                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, img.width, img.height)
                resolve(canvas.toDataURL(`image/jpeg`))
            }
        }
    })
}

/**
 * 树形结构转Map
 * @param {treeData} 必传 树形数据
 * @param {childrenKey} 必传 子节点key
*/
export function treeTpMap(treeData, childrenKey, result = '') {
    result = result || new Map()
    if (!childrenKey) childrenKey = 'children'
    for (var k in treeData) {
        let obj = treeData[k]
        let clone = JSON.parse(JSON.stringify(obj))
        delete clone[childrenKey]
        result.set(obj.id, clone)
        if (obj[childrenKey]) {
            treeTpMap(obj[childrenKey], childrenKey, result)
        }
    }
    return result
}


// 异步some函数
export const asyncSome = async(arr, predicate) => {
    for (let e of arr) {
        if (await predicate(e)) return true
    }
    return false
}

/**
 * 过滤非空字段
 * @param { Object } query 查询对象
*/
export function formatQuery(query = {}) {
    const result = {}
    Object.keys(query).forEach((item) => {
        if (Object.prototype.hasOwnProperty.call(query, item)) {
            const value = query[item]
            let isAdd = false
            if (
                Object.prototype.toString.call(value) ===
                        '[object Object]'
            ) {
                if (
                    (Array.isArray(value) && value.length) ||
                            Object.keys(value).length
                ) {
                    isAdd = true
                }
            } else if (
                (value !== null &&
                            value !== '' &&
                            value !== undefined) ||
                        typeof value === 'boolean'
            ) {
                isAdd = true
            }
            if (isAdd) {
                result[item] = value
            }
        }
    })
    return result
}

export function removePropertyOfInvalid(obj, invalidType) {
    let myObj = JSON.parse(JSON.stringify(obj))
    Object.keys(myObj).forEach(item => {
        let isInvalidValue = false
        switch (invalidType) {
            case 'emptyString':
                isInvalidValue = myObj[item] === ''
                break
            case 'null':
                isInvalidValue = myObj[item] === null
                break
            case 'nullAndEmptyString':
                isInvalidValue = myObj[item] === null || myObj[item] === ''
                break
            default:
                isInvalidValue = !myObj[item]
                break
        }
        if (isInvalidValue) {
            delete myObj[item]
        } else {
            const IS_ARRAY = Array.isArray(myObj[item])
            if (IS_ARRAY && myObj[item].length === 0) {
                delete myObj[item]
            }
        }
    })
    return myObj
}

export function toFixed(length, number) {
    return Math.round(Math.pow(10, length) * number) / Math.pow(10, length)
}
