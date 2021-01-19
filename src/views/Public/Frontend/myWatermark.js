/**
 * @param:options
 * {
 *  fontSize: 14px,
 *  font:''
 *  deg: 15
 * }
 */
let watermark = {}

function setWatermark(dom, content, { width = 120, height = 120, deg = 15, fontSize = 20, fontFamily = 'Vedana' }) {
    let id = '#waterMark'

    if (dom.querySelector(id) !== null) {
        dom.removeChild(dom.querySelector(id))
    }
    // 创建一个画布
    let can = document.createElement('canvas')

    // 设置画布的长宽
    can.width = width
    can.height = height

    let cans = can.getContext('2d')
    // 旋转角度
    cans.rotate(deg * Math.PI / 180)
    // cans.fontFamily = fontFamily
    // cans.fontSize = fontSize
    cans.font = `${fontSize} ${fontFamily}`
    // 设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(200, 200, 200, 0.40)'
    // 设置文本内容的当前对齐方式
    cans.textAlign = 'left'
    // 设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle'
    // 在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
    cans.fillText(content, can.width / 8, can.height / 2)

    let div = document.createElement('div')
    div.id = id
    div.style.pointerEvents = 'none'
    div.style.top = '0px'
    div.style.left = '0px'
    div.style.position = 'absolute'
    div.style.zIndex = '9999'
    div.style.width = dom.clientWidth + 'px'
    div.style.height = dom.clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    dom.appendChild(div)
}

watermark.set = (dom, content, options) => {
    let id = setWatermark(dom, content, options)
    setInterval(() => {
        if (dom.querySelector(id) === null) {
            id = setWatermark(dom, content, options)
        }
    }, 500)
    window.onresize = () => {
        setWatermark(dom, content, options)
    }
}

export default watermark
