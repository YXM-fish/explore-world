import { downloadBlobData } from './download'

/**
 * 通过JSON数据生成csv内容并下载
 * @param {data} data 导出的数据
 * @param {fileName} fileName 导出的文件名
 * @param {fields} fields 导出的列名
 */
export const downloadJsonToCsv = (data, fileName, fields) => {
  // 引入第三方插件 [json2csv]
  const { Parser } = require('json2csv')
  // 根据传入的列生成可用的数据
  const fileHeader = Object.keys(fields).map((keyName) => {
    return {
      value: `${keyName}`,
      label: fields[keyName]
    }
  })
  // 实例化json2csv对象
  const parser = new Parser({
    fields: fileHeader
  })
  // 生成csv数据
  const csvData = parser.parse(data)
  // 生成blob数据
  const blobData = new Blob(['\uFEFF' + csvData], { type: 'text/plain;charset=utf-8;' })
  // 下载blob数据
  downloadBlobData(blobData, fileName)
}
