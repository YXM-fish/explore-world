var slCustomeTooltipTimer = null

export function createTootip(x, y, text) {
    clearTimeout(slCustomeTooltipTimer)
    let oldTooltip = document.getElementById('slCustomeTooltip')
    if (!oldTooltip) {
        let tooltip = document.createElement('div')
        tooltip.innerText = text
        tooltip.setAttribute('id', 'slCustomeTooltip')
        tooltip.style.background = 'rgba(0, 0, 0, 0.55)'
        tooltip.style.borderRadius = '3px'
        tooltip.style.color = '#fff'
        tooltip.style.fontSize = '12px'
        tooltip.style.padding = '1px 5px 2px'
        tooltip.style.position = 'fixed'
        tooltip.style.zIndex = 999999
        tooltip.style.top = y + 'px'
        tooltip.style.left = x + 'px'
        document.body.appendChild(tooltip)
    } else {
        let ox = Number(oldTooltip.style.left.substring(0,oldTooltip.style.left.length - 2))
        let oy = Number(oldTooltip.style.top.substring(0,oldTooltip.style.top.length - 2))
        oldTooltip.innerText = text
        let top = y - oy + 'px'
        let left = x - ox + 'px'
        oldTooltip.style.transform = `translate(${left}, ${top})`
        oldTooltip.style.transition = 'transform linear .3s'
    }
    slCustomeTooltipTimer = setTimeout(() => {
        closeTooltip()
    }, 1000)
}
export function closeTooltip() {
    clearTimeout(slCustomeTooltipTimer)
    let oldTooltip = document.getElementById('slCustomeTooltip')
    if (oldTooltip) {
        document.body.removeChild(oldTooltip)
    }
}