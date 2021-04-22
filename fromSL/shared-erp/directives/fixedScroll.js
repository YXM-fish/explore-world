
const fixedScroll = {}

const scrollDirective = {
    update(el, binding) {
        let scrollNode = binding.value.scrollNode ? document.querySelector(binding.value.scrollNode) : window.document
        let bindNode = binding.value.bindNode ? el.querySelector(binding.value.bindNode) : el
        const directiveType = binding.value.type || 'arrow'    // arrow,scroll
        const fsId = binding.value.id || 'fixedscroll'
        const fs = createScroll()
        let moving = false
        let pointX = 0

        if (directiveType === 'arrow') {
            var rightArrow = createArrow('right')
            var leftArrow = createArrow('left')
            rightArrow.addEventListener('click', e => {
                clickRight(e, binding)
            })
            rightArrow.addEventListener('mousemove', e => {
                rightArrow.style.background = 'rgba(64,158,255,0.7)'
                rightArrow.style.color = '#ffffff'
            })
            rightArrow.addEventListener('mouseout', e => {
                rightArrow.style.background = 'none'
                rightArrow.style.color = '#409EFF'
            })
            leftArrow.addEventListener('click', e => {
                clickLeft(e, binding)
            })
            leftArrow.addEventListener('mousemove', e => {
                leftArrow.style.background = 'rgba(64,158,255,0.7)'
                leftArrow.style.color = '#ffffff'
            })
            leftArrow.addEventListener('mouseout', e => {
                leftArrow.style.background = 'none'
                leftArrow.style.color = '#409EFF'
            })
            fs.appendChild(rightArrow)
            fs.appendChild(leftArrow)
        } else {
            var way = createWay()
            way.addEventListener('mousedown', e => {
                mouseDown(e)
            })
            way.addEventListener('mousemove', e => {
                mouseMove(e)
            })
            way.addEventListener('mouseup', e => {
                mouseUp(e)
            })
            way.addEventListener('mouseout', e => {
                mouseUp(e)
                way.style.background = 'rgba(177, 177, 177, 0.6)'
            })
            way.addEventListener('mouseover', e => {
                mouseOver(e)
            })
            fs.appendChild(way)
            bindNode.addEventListener('scroll', e => {
                const scrollLeft = e.target.scrollLeft
                const scrollWidth = e.target.scrollWidth
                const scrollOffset = e.target.offsetWidth
                const parentWidth = parseInt(fs.style.width)
                const width = Number(way.style.width.split('px')[0])
                const left =
                            (scrollLeft / (scrollWidth - scrollOffset)) *
                            (parentWidth - width)

                way.style.left = left + 'px'
            })
        }

        init()
        document.body.appendChild(fs)

        function init() {
            const ch =
                        document.documentElement.clientHeight ||
                        document.body.clientHeight

            const { bottom, height } = el.getBoundingClientRect()
            if (
                bottom > ch &&
                        bottom - ch < height &&
                        bindNode.scrollWidth > bindNode.offsetWidth
            ) {
                fs.style.display = 'block'
            } else {
                fs.style.display = 'none'
            }
        }

        scrollNode.addEventListener('scroll', () => {
            const ch =
                        document.documentElement.clientHeight ||
                        document.body.clientHeight

            const { bottom, height } = el.getBoundingClientRect()
            if (
                bottom > ch &&
                        bottom - ch < height &&
                        bindNode.scrollWidth > bindNode.offsetWidth
            ) {
                fs.style.display = 'block'
            } else {
                fs.style.display = 'none'
            }
        })
        function createScroll() {
            let fixedscroll = document.getElementById(fsId)
            if (fixedscroll) {
                fixedscroll.parentNode.removeChild(fixedscroll)
            }
            let scroll = document.createElement('div')
            scroll.setAttribute('id', fsId)
            scroll.style.position = 'fixed'
            scroll.style.bottom = '20px'
            scroll.style.left = directiveType === 'arrow' ? '48%' : '50%'
            scroll.style.zIndex = 2000
            scroll.style.transform = directiveType === 'arrow' ? '' : 'translateX(-50%)'
            scroll.style.background = directiveType === 'arrow' ? 'none' : 'rgba(236, 236, 236, 0.8)'
            scroll.style.width = directiveType === 'arrow' ? '100px' : '400px'
            scroll.style.height = directiveType === 'arrow' ? '30px' : '12px'
            scroll.style.borderRadius = directiveType === 'arrow' ? '12px' : '6px'
            return scroll
        }
        function createWay() {
            let way = document.createElement('div')
            way.style.position = 'absolute'
            way.style.bottom = '0px'
            way.style.left = '0'
            way.style.zIndex = 2001
            way.style.background = 'rgba(177, 177, 177, 0.6)'
            way.style.width = '150px'
            way.style.height = '12px'
            way.style.borderRadius = '6px'
            return way
        }
        function createArrow(type) {
            let arrow = document.createElement('div')
            arrow.style.width = '30px'
            arrow.style.height = '30px'
            arrow.style.lineHeight = '30px'
            arrow.style.textAlign = 'center'
            arrow.style.borderRadius = '50%'
            arrow.style.border = '1px solid #409EFF'
            arrow.style.fontSize = '16px'
            arrow.style.color = '#409EFF'
            arrow.style.position = 'absolute'
            arrow.style[type] = '0px'
            arrow.style.cursor = 'pointer'
            arrow.innerHTML = `<i class="el-icon-arrow-${type}"></i>`
            return arrow
        }
        function mouseDown(e) {
            pointX = e.clientX
            moving = true
        }
        function mouseMove(e) {
            let dx = e.clientX - pointX
            pointX = e.clientX
            if (moving) {
                let left = Number(way.style.left.split('px')[0])
                let width = Number(way.style.width.split('px')[0])
                if (left + dx <= 0) {
                    way.style.left = '0px'
                } else if (
                    left + dx > 0 &&
                            left + dx + width < Number(fs.style.width.split('px')[0])
                ) {
                    way.style.left = left + dx + 'px'
                } else {
                    way.style.left =
                                parseInt(fs.style.width) - width + 'px'
                }
                bindNode.scrollLeft =
                            (Number(way.style.left.split('px')[0]) /
                                (Number(fs.style.width.split('px')[0]) -
                                    Number(way.style.width.split('px')[0]))) *
                            (bindNode.scrollWidth - bindNode.offsetWidth)
            }
        }
        function mouseOver(e) {
            way.style.background = 'rgba(100, 100, 100, 0.6)'
        }
        function mouseUp(e) {
            moving = false
        }
        function clickRight(e, binding) {
            const scrollMoveVal = binding.value && binding.value.scrollMoveVal
            bindNode.scrollLeft += scrollMoveVal || 100
        }
        function clickLeft(e, binding) {
            const scrollMoveVal = binding.value && binding.value.scrollMoveVal
            bindNode.scrollLeft -= scrollMoveVal || 100
        }
    },
    unbind(el, binding) {
        const fsId = binding.value.id || 'fixedscroll'
        let fixedscroll = document.getElementById(fsId)
        if (fixedscroll) {
            fixedscroll.parentNode.removeChild(fixedscroll)
        }
    }
}

fixedScroll.install = (Vue, options = {}) => {
    Vue.directive('fixedScroll', scrollDirective)
}

export default fixedScroll
