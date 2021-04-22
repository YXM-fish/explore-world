
import { get } from '@shared/http'
import { getSameProtocol } from '@shared/util'
const Qs = require('qs')

/**
 * 下载blob格式的文件
 * @param {blobData} blobData blob格式的数据源
 * @param {fileName} fileName 导出的文件名
 */
export const downloadBlobData = (blobData, fileName) => {
  let url = window.URL.createObjectURL(blobData)
  downloadFile(url, fileName)
  window.URL.revokeObjectURL(url)
}

/**
 * 下载文件
 * @param {file} file 要下载的文件
 * @param {fileName} fileName  要下载的文件名
 */
export const downloadFile = (file, fileName) => {
  let link = document.createElement('a')
  link.download = fileName
  link.href = getSameProtocol(file)
  link.style.display = 'hidden'
  link.target = '_blank'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 远程下载
 */
export function exportFileFromRemote ({
  url,
  name,
  params,
  beforeLoad,
  afterLoad,
  successFn,
  errorFn
} = {}) {
  if (typeof beforeLoad === 'function') {
    beforeLoad()
  }

  get(getSameProtocol(url), params, {
    responseType: 'blob',
    paramsSerializer: function (params) {
      return Qs.stringify(params)
    }
  }).then(res => {
    if (res.type === 'application/json') {
      errorFn()
      return
    }
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(res, name)
    } else {
      downloadBlobData(res, name)
    }
    if (typeof successFn === 'function') {
      successFn()
    }
  }).catch(() => {
    if (typeof errorFn === 'function') {
      errorFn()
    }
  }).finally(() => {
    if (typeof afterLoad === 'function') {
      afterLoad()
    }
  })
}
