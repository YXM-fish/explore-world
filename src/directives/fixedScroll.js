export default {
    inserted: function(el, binding) {
        let scrollNode = binding.value.scrollNode ? document.querySelector(binding.value.scrollNode) : window.document
        let bindNode = binding.value.bindNode ? el.querySelector(binding.value.bindNode) : el
        const fs = createScroll()
        const way = createWay()
        let moving = false
        let pointX = 0
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
        })

        fs.style.display = 'none'
        fs.appendChild(way)
        document.body.appendChild(fs)

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
        bindNode.addEventListener('scroll', e => {
            const scrollLeft = e.target.scrollLeft
            const scrollWidth = e.target.scrollWidth
            const scrollOffset = e.target.offsetWidth
            const parentWidth = parseInt(fs.style.width)
            const width = parseInt(way.style.width)
            const left =
                        (scrollLeft / (scrollWidth - scrollOffset)) *
                        (parentWidth - width)

            way.style.left = left + 'px'
        })
        function createScroll() {
            const scroll = document.createElement('div')
            scroll.style.position = 'fixed'
            scroll.style.bottom = '20px'
            scroll.style.left = '50%'
            scroll.style.zIndex = 9000
            scroll.style.transform = 'translateX(-50%)'
            scroll.style.background = '#eaeaea'
            scroll.style.width = '400px'
            scroll.style.height = '20px'
            scroll.style.borderRadius = '10px'
            return scroll
        }
        function createWay() {
            const way = document.createElement('div')
            way.style.position = 'absolute'
            way.style.bottom = '2px'
            way.style.left = '0'
            way.style.background = '#969696'
            way.style.width = '150px'
            way.style.height = '16px'
            way.style.borderRadius = '8px'
            way.style.cursor = 'pointer'
            return way
        }
        function mouseDown(e) {
            pointX = e.clientX
            moving = true
        }
        function mouseMove(e) {
            const dx = e.clientX - pointX
            pointX = e.clientX
            if (moving) {
                const left = parseInt(way.style.left)
                const width = parseInt(way.style.width)
                if (left + dx <= 0) {
                    way.style.left = '0px'
                } else if (
                    left + dx > 0 &&
                            left + dx + width < parseInt(fs.style.width)
                ) {
                    way.style.left = left + dx + 'px'
                } else {
                    way.style.left =
                                parseInt(fs.style.width) - width + 'px'
                }
                bindNode.scrollLeft =
                            (parseInt(way.style.left) /
                                (parseInt(fs.style.width) -
                                    parseInt(way.style.width))) *
                            (bindNode.scrollWidth - bindNode.offsetWidth)
            }
        }
        function mouseUp(e) {
            moving = false
        }
    }
}
