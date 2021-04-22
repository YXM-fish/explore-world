const vueSticky = {}
let listenAction
vueSticky.install = Vue => {
    Vue.directive('sticky', {
        bind(el, binding) {
            const params = binding.value || {}
            const stickyTop = params.stickyTop || 0
            const zIndex = params.zIndex || 1000
            const difference = params.difference || 3

            const bindNode = params.bindNode ? el.querySelector(params.bindNode) : el
            const originPosition = bindNode.style.position
            const elStyle = bindNode.style

            elStyle.cssText = `top: ${stickyTop}px; z-index: ${zIndex}`

            const parentElm = bindNode.parentNode || document.documentElement
            const placeholder = bindNode.cloneNode()

            let active = false


            const sticky = () => {
                if (active) {
                    return
                }
                const elHeight = bindNode.getBoundingClientRect().height
                const elWidth = bindNode.getBoundingClientRect().width
                // 如果需要被固定的元素的高度或者宽度为0，那么元素就不可见，固定已没必要
                // 当存在多个tab页的时候，不可见的tab页的元素的宽高都将是0，也不应该触发固定
                if (elHeight === 0 || elWidth === 0) return
                placeholder.style.width = `${elWidth}px`
                placeholder.style.height = `${elHeight - difference}px`

                let tempNode = document.createElement('div')
                parentElm.insertBefore(tempNode, bindNode)

                elStyle.position = 'fixed'
                elStyle.height = `${elHeight}px`
                elStyle.width = `${elWidth}px`

                parentElm.insertBefore(placeholder, tempNode)
                placeholder.style.display = 'inline-block'

                parentElm.removeChild(tempNode)

                active = true
            }

            const reset = () => {
                if (!active) {
                    return
                }

                elStyle.position = originPosition
                parentElm.removeChild(placeholder)
                active = false
            }

            const check = () => {
                const offsetTop = active ? placeholder.getBoundingClientRect().top : bindNode.getBoundingClientRect().top
                if (offsetTop < stickyTop) {
                    sticky()
                } else {
                    reset()
                }
            }
            listenAction = () => {
                check()
            }

            window.addEventListener('scroll', listenAction)
        },

        unbind() {
            window.removeEventListener('scroll', listenAction)
        }
    })
}

export default vueSticky

