import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { getCookie, errorMessageTip, errorNotify } from '@shared/util'
import { merge } from 'lodash'

// 存储http错误状态信息
let httpErrorCache = {}
// 同一类型的http错误,在以下时间内只做一次ui提示
const errorTimeInterval = 1000

let baseURL = process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : ''
const useProxy = process.env.VUE_APP_USE_PROXY === 'true' && process.env.NODE_ENV === 'development'
baseURL = useProxy ? '/api' : baseURL

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 110 * 1000,
  headers: {}
})

// 请求拦截
axiosInstance.interceptors.request.use(config => {
  const token = getCookie('token')
  const userKey = getCookie('userKey')

  if (config.headers['addLoading']) {
    store.dispatch('OPEN_LOADING', { isCount: true })
    delete config.headers['addLoading']
  }

  if (token) {
    config.headers['token'] = token
  }

  if (userKey) {
    config.headers['userKey'] = userKey
  }

  return config
}, err => {
  store.dispatch('CLOSE_LOADING')
  store.commit('SET_LOADING_COUNT', 0)
  // 错误处理
  return Promise.reject(err)
})

// 响应拦截
axiosInstance.interceptors.response.use(
  res => {
    store.dispatch('CLOSE_LOADING', true)
    let { error } = res.data
    if (error) {
      switch (error.code) {
        case '100001': // 未登录
        case '100002': // 账号在别处登录
        case '100003': // 授权过期,请重新登录
        case '200001': // 用户不存在或密码错误
        case '200002': // 原密码错误
        case '200003': // 公司名重复注册
        case '200004': // 账号重复注册
        case '200005': // 当前账号已冻结
        case '200006': // 供应商信息保存失败
        case '200007': // 供应商注册信息更新失败:审核未通过情况下允许此操作
        case '200010':
        case '500001': // 参数异常
        case '500002': // 数据不存在
        case '500003': // 数据冲突
        case '500004': // 超出最大限制
        case '900001':
        case '200017': // feign调用失败
          errorMessageTip(error.message)
          break
        case '100005': // 失效的token
          errorMessageTip('身份验证信息失效,请重新登录')
          break
      }
    }

    return res.data
  },
  err => {
    let errorStatus
    let errorData
    let isCancelReq = err instanceof axios.Cancel
    store.dispatch('CLOSE_LOADING')
    store.commit('SET_LOADING_COUNT', 0)
    // 错误处理
    if (err && err.response) {
      errorStatus = err.response.status
      errorData = err.response.data
      switch (errorStatus) {
        case 500:
          err.message = `服务器错误`
          break
        case 501: err.message = `服务未实现`
          break
        case 502: err.message = `网络错误`
          break
        case 503: err.message = `服务不可用`
          break
        case 504: err.message = `网络超时`
          break
        case 505: err.message = `HTTP版本不受支持`
          break
        case 506: err.message = `发货单已取消，无法打印批次号` // 特殊处理发货单取消，因为下载的时候，无法捕获到success为false的情况
          break
        case 401:
          err.message = errorData.error.message
          redirectToLogin()
          break
        case 404: err.message = `访问资源不存在`
          break
        case 429: err.message = `系统繁忙,请稍后重试`
          break
        default: err.message = `网络错误`
      }
    } else {
      err.message = '连接服务器失败!'
    }

    if (!httpErrorCache[errorStatus]) {
      httpErrorCache[errorStatus] = {
        time: +new Date()
      }
      !isCancelReq && errorNotify(null, err.message)
    } else {
      let now = +new Date()
      if (now - httpErrorCache[errorStatus].time > errorTimeInterval) {
        !isCancelReq && errorNotify(null, err.message)
        httpErrorCache[errorStatus].time = now
      }
    }
    return Promise.reject(err)
  })

function redirectToLogin () {
  store.dispatch('user/RESET_USER_DATA')
  router.push('/login')
}

function addLoadingConfigToHeader (config) {
  if (config && config.addLoading !== undefined) {
    if (config.headers) {
      config.headers = merge(config.headers, {
        addLoading: config.addLoading
      })
    } else {
      config.headers = { addLoading: config.addLoading }
    }

    delete config.addLoading
  }
  return config
}

export const get = function (url, params, config) {
  config = addLoadingConfigToHeader(config)
  return axiosInstance.get(url, {
    params,
    ...config
  })
}

export const del = function (url, params, config) {
  config = addLoadingConfigToHeader(config)
  return axiosInstance.delete(url, { params, ...config })
}

export const post = function (url, params, config) {
  config = addLoadingConfigToHeader(config)
  return axiosInstance.post(url, params, config)
}

export const put = function (url, params, config) {
  config = addLoadingConfigToHeader(config)
  return axiosInstance.put(url, params, config)
}

export const patch = function (url, params, config) {
  config = addLoadingConfigToHeader(config)
  return axiosInstance.patch(url, params, config)
}

export const http = axiosInstance
