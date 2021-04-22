import { Message } from 'element-ui'
import { imageToBase64 } from 'utils/index'

/**
 * 用于校验文件图片宽高
 * @param {object} imgFile 图片对象，必传
 * @param {Array} allowProportion 允许的图片比例，不传为不限制
 * @return 返回一个promise，通过校验时resolve('')， 否则reject(errorInfo)
 */
function validateImgFileHW(imgFile, allowProportion = []) {
    return new Promise((resolve, reject) => {
        if (allowProportion.length === 0) {
            resolve('')
        }

        const _image = imgFile
        let reader = new FileReader()
        reader.readAsDataURL(_image)
        reader.onload = function (theFile) {
            let currentImg = new Image()
            currentImg.src = theFile.target.result
            currentImg.onload = function () {
                let width = this.width
                let height = this.height
                let proportionHW = Number((height / width).toFixed(2))
                let errorInfo = {
                    errorType: 'proportion',
                    width,
                    height
                }
                if (allowProportion.includes(proportionHW)) {
                    resolve('')
                } else {
                    reject(errorInfo)
                }
            }
        }
    })
}

/**
 * 用于校验文件图片像素大小
 * @param {object} imgFile 图片对象，必传
 * @param {Objecy} pixelLimit {limit:是否限制，minWidth,minHeight,maxWidth,maxHeight}
 * @return 返回一个promise，通过校验时resolve('')， 否则reject(errorInfo)
 */
function validateImgPixel(imgFile, pixelLimit) {
    return new Promise((resolve, reject) => {
        let { minWidth = 100, minHeight = 100, maxWidth = 4096, maxHeight = 4096 } = pixelLimit
        const _image = imgFile
        let reader = new FileReader()
        reader.readAsDataURL(_image)
        reader.onload = function (theFile) {
            let currentImg = new Image()
            currentImg.src = theFile.target.result
            currentImg.onload = function () {
                let imgWidth = this.width
                let imgHeight = this.height

                if (
                    imgWidth > maxWidth ||
                  imgWidth < minWidth ||
                  imgHeight > maxHeight ||
                  imgHeight < minHeight
                ) {
                    let errorInfo = {
                        errorType: 'pixelLimit',
                        minWidth,
                        minHeight,
                        maxWidth,
                        maxHeight }
                    reject(errorInfo)
                } else {
                    resolve('')
                }
            }
        }
    })
}

/**
 * 用于校验文件图片大小
 * @param {object} imgFile 图片对象，必传
 * @param {Number, String} maxSize 图片允许的最大大小（含），单位为M，不传为不限制
 * @return 返回校验结果，通过校验返回值为‘’，否则返回errorInfo
 */
function validateImgFileSize(imgFile, maxSize = 0) {
    if (maxSize === 0) {
        return ''
    }

    const _image = imgFile
    let maxByte = Number(maxSize) * 1024 * 1024
    let currentByte = _image.size
    if (currentByte > maxByte) {
        let errorInfo = {
            errorType: 'size',
            maxSize
        }
        return errorInfo
    } else {
        return ''
    }
}

/**
 * 用于校验链接图片宽高
 * @param {object} imgFile 图片对象，必传
 * @param {Array} allowProportion 允许的图片比例，不传为不限制
 * @return 返回一个promise，通过校验则resolve('')， 否则reject(errorInfo)
 */
function validateImgUrlHW(imgUrl, allowProportion = []) {
    return new Promise((resolve, reject) => {
        if (allowProportion.length === 0) {
            resolve('')
        }
        let currentImg = new Image()
        currentImg.src = imgUrl
        currentImg.onload = function () {
            let width = this.width
            let height = this.height
            let proportionHW = Number((height / width).toFixed(2))
            let sizeInfo = {
                width,
                height
            }
            if (allowProportion.includes(proportionHW)) {
                resolve(sizeInfo)
            } else {
                reject(sizeInfo)
            }
        }
    })
}

/**
 * 用于校验链接图片大小
 * @param {object} imgFile 图片对象，必传
 * @param {Number, String} maxSize 图片允许的最大大小（含），单位为M，不传为不限制
 * @return {Promise} 返回校验结果，通过校验则resolve()，否则reject(errorInfo)
 */
function validateImgUrlSize(url, maxSize = 0) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async(resolve, reject) => {
        if (maxSize === 0) {
            resolve()
        }

        let imgFile = await imageUrlToFile(url)
        let validateRes = validateImgFileSize(imgFile, maxSize)
        if (!validateRes) {
            resolve()
        } else {
            reject(validateRes)
        }
    })
}


function getImgCutName(imgName) {
    if (imgName.length > 30) {
        let preString = imgName.substring(0, 14)
        let endString = imgName.substr(imgName.length - 16)
        return `${preString}...${endString}`
    } else {
        return imgName
    }
}


/**
 * 用于校验图片大小和尺寸
 * @param {object} imgFile 图片对象，必传
 * @param {object} validateInfo 校验相关配置参数
 * @return {Promise} 返回校验结果，通过校验则resolve('')，否则resolve(errorInfo)
 */
async function validateImgFile(imgFile, validateInfo) {
    let { needLimitSize = false, maxSize = 4, needLimitProportion = false, allowProportion = [1.33, 1], pixelLimit, needNotice = true } = validateInfo
    if (needLimitSize) {
        let error = validateImgFileSize(imgFile, maxSize)
        if (error !== '') {
            if (needNotice) {
                errorNotice(imgFile, error)
            }
            return error
        }
    }

    if (needLimitProportion) {
        try {
            await validateImgFileHW(imgFile, allowProportion)
        } catch (error) {
            errorNotice(imgFile, error)
            return error
        }
    }

    if (pixelLimit && pixelLimit.limit) {
        try {
            await validateImgPixel(imgFile, pixelLimit)
        } catch (error) {
            if (needNotice) {
                errorNotice(imgFile, error)
            }
            return error
        }
    }
    let defaultError = ''
    return defaultError
}

function errorNotice(_image, error) {
    if (error === '') return

    let { errorType } = error
    let imgName = getImgCutName(_image.name)
    let errorMsg = ''
    switch (errorType) {
        case 'size': {
            let { maxSize } = error
            errorMsg = `图片（${imgName}）大小不符合要求，请上传不超过${maxSize}M的图片`
            break
        }
        case 'pixelLimit': {
            let { minWidth, minHeight, maxWidth, maxHeight } = error
            errorMsg = `图片宽和高像素要求：大于等于${minWidth}（宽）、${minHeight}（高）且小于等于${maxWidth} （宽）、${maxHeight}（高）`
            break
        }
        default: {
            let { width, height } = error
            errorMsg = `图片（${imgName}）尺寸（宽: ${width} 高: ${height}）不符合要求，请上传4:3或1:1比例图片`
        }
    }
    setTimeout(() => {
        Message({
            showClose: true,
            message: errorMsg,
            type: 'error',
            duration: 0
        })
    }, 0)
}

function getUrlFileName(url) {
    let regExp = /(.*\/)*([^.]+)/ig
    let fileName = url.replace(regExp, '$2')
    return fileName
}

/**
 * base64转file
 * @param {string} dataUrl 图片base64
 * @param {string} filename 图片名称
*/
export function dataURLtoFile(dataUrl, filename) {
    let arr = dataUrl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}


/**
 * 图片url转file
 * @param {String} sourceUrl 图片url
 */
async function imageUrlToFile(sourceUrl) {
    let base64Str = await imageToBase64(sourceUrl)
    let fileName = getUrlFileName(sourceUrl)

    return new Promise((resolve) => {
        let file = dataURLtoFile(base64Str, fileName)
        resolve(file)
    })
}

export {
    validateImgFileHW,
    validateImgUrlHW,
    validateImgFileSize,
    validateImgUrlSize,
    getImgCutName,
    validateImgFile,
    errorNotice,
    imageUrlToFile
}
