<template>
    <div class="sl-popper" ref="slpopper" @[trigger]="mouseOn($event)">
        <div class="pop" ref="pop" :style="styleObj" @[trigger].stop="mouseOn">
            <slot name="pop"></slot>
        </div>

        <div class="arrow" ref="arrow" :style="arrowStyleObj"></div>

        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'popper',
    props: {
        position: {
            type: String,
            default: 'top' // top,left,bottom,right
        },
        styleSetting: {
            // 样式设置，如：{ borderRadius = '6px', background = 'white' }
            type: Object,
            default: function() {
                return {}
            }
        },
        offset: {
            // 气泡的偏移值
            type: Number,
            default: 15
        },
        trigger: {
            type: String,
            default: 'mouseover' // mouseover,click
        }
    },
    data() {
        return {
            styleObj: { visibility: 'hidden' },
            arrowStyleObj: { visibility: 'hidden' },
            timer: null,
            isMouseOnPoper: false
        }
    },
    computed: {},
    mounted() {
        const popDom = this.$refs.pop
        const slPoperDom = this.$refs.slpopper

        const parentDoms = this.getParentDoms(slPoperDom)
        parentDoms.forEach(p => {
            p.addEventListener('scroll', () => {
                if (
                    this.styleObj.visibility === 'visible' &&
                    this.isMouseOnPoper
                ) {
                    this.setPopStyle()
                }
            })
        })
        if (this.trigger === 'click') {
            document.addEventListener('click', e => {
                const parents = this.getParentDoms(e.target)
                parents.unshift(e.target)
                let canRemove = true
                for (let i = 0; i < parents.length; i++) {
                    if (parents[i] === slPoperDom) {
                        canRemove = false
                        break
                    }
                }
                canRemove ? this.removeStyle() : ''
            })
        }
        if (this.trigger === 'mouseover') {
            slPoperDom.addEventListener('mouseout', e => {
                e.stopPropagation()
                this.mouseOut()
            })
            popDom.addEventListener('mouseout', e => {
                e.stopPropagation()
                this.mouseOut()
            })
        }
    },
    watch: {},
    methods: {
        // 求取popper的位置
        mouseOn() {
            this.isMouseOnPoper = true
            this.setPopStyle()
        },
        mouseOut() {
            this.isMouseOnPoper = false
            this.removeStyle()
        },
        setPopStyle() {
            if (this.timer) clearTimeout(this.timer)
            let position = this.position
            const style = {}
            const {
                color = 'black',
                border = 'none',
                borderRadius = '6px',
                boxShadow = '0 0 10px #d6d6d6',
                background = 'white'
            } = this.styleSetting

            // 获取视窗宽、高
            const ch =
                document.documentElement.clientHeight ||
                document.body.clientHeight
            const cw =
                document.documentElement.clientWidth ||
                document.body.clientWidth
            // 获取气泡的宽、高
            const popDom = this.$refs.pop
            const { height: popH, width: popW } = popDom.getBoundingClientRect()
            // 获取content内容区的信息
            const slPoperDom = this.$refs.slpopper
            const slPoperDomRect = slPoperDom.getBoundingClientRect()
            const {
                left: rectL,
                right: rectR,
                top: rectT,
                bottom: rectB,
                height: rectH,
                width: rectW
            } = slPoperDomRect

            // 设置气泡的显示方位
            position = this.reSetPosition(
                position,
                popW,
                rectL,
                rectR,
                popH,
                rectB,
                rectT,
                ch,
                cw
            )

            style.color = color
            style.border = border
            style.borderRadius = borderRadius
            style.boxShadow = boxShadow
            style.background = background
            // 获取气泡的fixed定位的位置 top,left,right,bottom
            const pObj = this.getObjPosition(
                ch,
                cw,
                position,
                rectT,
                rectH,
                rectL,
                rectW,
                popH,
                popW
            )
            this.styleObj = Object.assign(
                { visibility: 'visible' },
                style,
                pObj
            )

            // 获取箭头的宽、高
            const arrowDom = this.$refs.arrow
            const {
                height: arrowH,
                width: arrowW
            } = arrowDom.getBoundingClientRect()
            // 获取气泡的fixed定位的位置 top,left,right,bottom
            const aObj = this.getObjPosition(
                ch,
                cw,
                position,
                rectT,
                rectH,
                rectL,
                rectW,
                arrowH,
                arrowW
            )
            switch (position) {
                case 'left':
                    aObj.transform = 'translateX(50%) rotate(45deg)'
                    aObj.borderTop = `${border}`
                    aObj.borderRight = `${border}`
                    break
                case 'right':
                    aObj.transform = 'translateX(-50%) rotate(45deg)'
                    aObj.borderLeft = `${border}`
                    aObj.borderBottom = `${border}`
                    break
                case 'top':
                    aObj.transform = 'translateY(50%) rotate(45deg)'
                    aObj.borderBottom = `${border}`
                    aObj.borderRight = `${border}`
                    break
                case 'bottom':
                    aObj.transform = 'translateY(-50%) rotate(45deg)'
                    aObj.borderTop = `${border}`
                    aObj.borderLeft = `${border}`
                    break
                default:
                    ''
                    break
            }
            aObj.background = background
            this.arrowStyleObj = aObj
        },

        // 设置气泡的显示方位
        reSetPosition(
            position,
            popW,
            rectL,
            rectR,
            popH,
            rectB,
            rectT,
            ch,
            cw
        ) {
            if (position === 'left' && popW + this.offset > rectL) {
                position = 'right'
            }
            if (position === 'right' && rectR + popW + this.offset > cw) {
                position = 'left'
            }
            if (position === 'top' && popH + this.offset > rectT) {
                position = 'bottom'
            }
            if (position === 'bottom' && rectB + popH + this.offset > ch) {
                position = 'top'
            }
            return position
        },

        // 获取气泡和箭头的fixed定位的位置，气泡必须始终显示在视窗内
        getObjPosition(
            ch,
            cw,
            position,
            rectT,
            rectH,
            rectL,
            rectW,
            popH,
            popW
        ) {
            // Y轴偏移量
            const ty = rectT - popH / 2 + rectH / 2
            const py = ty <= 0 ? 0 : ty > ch - popH ? ch - popH : ty
            // 在左侧显示
            const or = cw - rectL + this.offset
            const pLeft = {
                right: (or <= 0 ? 0 : or) + 'px',
                top: py + 'px'
            }
            // 在右侧显示
            const ol = rectL + rectW + this.offset
            const pRight = {
                left: (ol <= 0 ? 0 : ol) + 'px',
                top: py + 'px'
            }

            // X轴偏移量
            const tx = rectL - popW / 2 + rectW / 2
            const px = tx <= 0 ? 0 : tx > cw - popW ? cw - popW : tx
            // 在上方显示
            const ob = ch - rectT + this.offset
            const pTop = {
                bottom: (ob <= 0 ? 0 : ob) + 'px',
                left: px + 'px'
            }
            // 在下方显示
            const ot = rectT + rectH + this.offset
            const pBottom = {
                top: (ot <= 0 ? 0 : ot) + 'px',
                left: px + 'px'
            }

            let pObj

            switch (position) {
                case 'left':
                    pObj = pLeft
                    break
                case 'right':
                    pObj = pRight
                    break
                case 'top':
                    pObj = pTop
                    break
                case 'bottom':
                    pObj = pBottom
                    break
                default:
                    pObj = {}
                    break
            }

            return pObj
        },

        // 鼠标移出后，隐藏气泡和箭
        removeStyle() {
            this.timer = setTimeout(() => {
                this.styleObj = Object.assign({}, this.styleObj, {
                    visibility: 'hidden'
                })
                this.arrowStyleObj = Object.assign({}, this.arrowStyleObj, {
                    visibility: 'hidden'
                })
            }, 100)
        },
        // 务必使用element.parentNode获取父节点，因为offsetParent不能获取table
        getParentDoms(element) {
            let current = element.parentNode
            const parentDoms = []
            while (current !== null) {
                parentDoms.push(current)
                current = current.parentNode
            }
            return parentDoms
        }
    }
}
</script>
<style lang="scss" scoped>
.sl-popper {
    display: inline-block;
    .pop {
        display: table;
        position: fixed;
        z-index: 9000;
        padding: 10px;
        user-select: text;
    }
    .arrow {
        display: table;
        position: fixed;
        z-index: 9000;
        width: 8px;
        height: 8px;
        transform-origin: center center;
    }
}
</style>
