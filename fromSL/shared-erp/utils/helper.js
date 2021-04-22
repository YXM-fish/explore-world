
const guangzhou_source = 'cos.ap-guangzhou.myqcloud.com'
const guangzhou_cut = 'picgz.myqcloud.com'

export function fetchHostDomain(url) {
    let rets = url.match(/(?!:\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-_]+\.[a-zA-Z]{3,11}?/)
    if (rets && rets.length > 0) {
        return rets[0]
    } else {
        return
    }
}

export function sourceImageToCut(url, w = 80, h = 80, quantity = 80, ext = 'png') {
    if (url && url.match('chengdu.myqcloud.com')) {
        // 腾讯成都
        return `${url}?imageMogr2/thumbnail/${w}x${h}`
    } else if (url && url.match('guangzhou.myqcloud.com')) {
        // 腾讯广州
        return `${url.replace(guangzhou_source, guangzhou_cut)}?imageMogr2/thumbnail/${w}x${h}`
    } else if (url && url.match('starcdns.com')) {
        // s3
        return `${url}!resize=width=${w}|height=${h}|quantity=${quantity}.${ext}`
    } else if (url && (url.match('img.cdn.starlinke.cn') || url.match('aliyuncs.com'))) {
        // 阿里
        // 加了签名的url暂不支持缩略图
        if (url.indexOf('Expires') === -1) {
            return `${url}?x-oss-process=image/resize,h_${h},w_${w},limit_0`
        }
        return url
    } else {
        return url
    }
}
