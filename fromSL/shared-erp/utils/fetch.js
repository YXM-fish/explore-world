import axios from 'axios'
import qs from 'qs'
import {
    Message, MessageBox, Loading
} from 'element-ui'
import store from 'store/index'
import {
    getToken,
    getUserValidVal
} from 'utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 5 * 60 * 1000 // 请求超时时间5分钟
})
let isFedLogOut = false
let currentLoading = null
let loadingCacheMap = {}
// let noPromptError = false // 不提示错误信息
// let urlCache_noPromptError = {}
// request拦截器
service.interceptors.request.use(config => {
    // noPromptError = false
    // Do something before request is sent
    if (['get', 'delete'].includes(config.method)) {
        config.paramsSerializer = function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
        }
    }
    if (store.getters.token) {
        config.headers['Authorization'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    if (store.getters.userValidValue) {
        config.headers['x-user-valid'] = getUserValidVal()
    }
    // 由于多人开发，有些写法不一致
    // if (config.noPromptError) {
    //     noPromptError = config.noPromptError
    // } else if (config.params) {
    //     noPromptError = config.params.noPromptError
    // } else if (config.data) {
    //     noPromptError = config.data.noPromptError
    // }
    // 增加全局遮罩
    if (config.showLoad) {
        openLoading(getUrl(config))
        // 在这里清除掉showLoad配置, 不将此配置发送给后台
        delete config.showLoad
    } else if (config.params && config.params.showLoad) {
        openLoading(getUrl(config))
        delete config.params.showLoad
    } else if (config.data && config.data.showLoad) {
        openLoading(getUrl(config))
        delete config.data.showLoad
    }

    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        // srm系统接口的异常处理
        let { error } = response.data || {}
        if (error) {
            switch (error.code) {
                case '500009': // 认领的数据已经被撤回 | 不同用户操作同一条数据
                    break
                default: // 默认的异常处理
                    Message({
                        message: error.message,
                        type: 'error',
                        duration: 5 * 1000
                    })
                    break
            }
        }
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        const res = response.data
        // 关闭全局遮罩层
        closeLoading(getUrl(response.config))
        if (response.status === 401 || res.status === 40101) {
            MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                confirmButtonText: '重新登录',
                type: 'warning'
            }).then(() => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            })
            return Promise.reject('error')
        }
        if (res.status === 40301 && !isFedLogOut) {
            isFedLogOut = true
            // Message({
            //   message: '当前用户无相关操作权限，您的账号已经被冻结或者无效，请重新登录',
            //   type: 'error',
            //   duration: 5 * 1000
            // });
            // store.dispatch('FedLogOut').then(() => {
            //   setTimeout(function(){
            //     location.reload(); // 为了重新实例化vue-router对象 避免bug
            //   },3000)
            // });
            MessageBox.confirm('当前用户无相关操作权限，您的账号已经被冻结或者无效，请重新登录', '提示', {
                confirmButtonText: '重新登录',
                showClose: false,
                showCancelButton: false,
                type: 'warning'
            }).then(() => {
                store.dispatch('FedLogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                })
            })
            return Promise.reject('error')
        }
        if (response.status !== 200 && res.status !== 200) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            return response.data
        }
    },
    (error) => {
        const { response, config } = error

        closeLoading(getUrl(config))
        let timeout = String(error).indexOf('timeout') > -1
        if (timeout) {
            let _message = '请求超时，请检查网络是否异常'
            if (error.config.url.indexOf('upload/image') !== -1) {
                _message = '上传图片超时，请检查网络或调整图片大小'
            }
            Message({
                message: _message,
                type: 'error',
                duration: 5 * 1000
            })
        } else if (response.status === 400 || response.status === 401 || response.status === 403 || response.data.status === 400) {
            if (!(config.noPromptError || (config.params && config.params.noPromptError) || (config.data && config.data.noPromptError))) {
                Message({
                    message: error.response.data.message || error.response.data.error.message,
                    type: 'error',
                    duration: 5 * 1000
                })
            }
        } else {
            Message({
                message: '服务器异常',
                type: 'error',
                duration: 5 * 1000
            })
        }
        return Promise.reject(error.response)
    }
)

function getUrl(httpConfig) {
    if (!httpConfig) {
        console.warn('interceptor.getUrl httpConfig Error, httpConfig is null!')
    }
    return httpConfig.url
}
// 开启加载动画
function openLoading(url) {
    if (!url) {
        console.error('interceptor.toggleLoading url Error, url is null!')
    }
    loadingCacheMap[url] = true
    if (currentLoading) return
    currentLoading = Loading.service({
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(255, 255, 255, 0.2)'
    })
}
// 关闭加载动画
function closeLoading(url) {
    if (!url) {
        console.error('interceptor.toggleLoading url Error, url is null!')
    }
    if (currentLoading != null) {
        let flag = true
        // 接口请求完毕置为false
        loadingCacheMap[url] = false
        for (const item in loadingCacheMap) {
            if (loadingCacheMap[item]) {
                flag = false
                break
            }
        }
        if (!flag) return
        currentLoading.close()
        currentLoading = null
        loadingCacheMap = {}
    }
}

export default service
