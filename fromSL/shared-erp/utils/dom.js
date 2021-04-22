// 获取文字宽度 -> 默认字体为table样式 14px
export function getTextWith(
    text = '',
    fontStyle = '14px "Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif"' // 设置字体大小和字体
) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    context.font = fontStyle
    const elem = context.measureText(text)
    return elem.width
}
