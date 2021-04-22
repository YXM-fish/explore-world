import MD5 from 'crypto-js/md5'
let CryptoJS = require('crypto-js')

export function valueToMd5 (val) {
  return MD5(val).toString()
}

// 上传图片hash值生成重复图片
export function fileToMd5 (file) {
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
