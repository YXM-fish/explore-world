<template>
    <div class="gallery" ref="gallery">
        <span v-if="showArrow" class="arrow arrow-left" :class="{'arrow-disabled': atHead}" :style="{'transform': `translateY(-50%) scale(${arrowScale})`}" @click="scrollLeft">
            <i class="el-icon-arrow-left"></i>
        </span>
        <div class="body" ref="body" :style="{'border-width': arrowPosition === 'outer' && showArrow ? 50 * arrowScale + 'px' : ''}" @scroll="handleScroll($event)">
            <div class="list" ref="list">
                <template v-for="(item, index) in list">
                    <div :key="index" class="item" @click.stop="moveItemToCenter($event, item, index)">
                        <slot :item="item" :index="index"></slot>
                    </div>
                </template>
            </div>
        </div>
        <span v-if="showArrow" class="arrow arrow-right" :class="{'arrow-disabled': atEnd}" :style="{'transform': `translateY(-50%) scale(${arrowScale})`}" @click="scrollRight">
            <i class="el-icon-arrow-right"></i>
        </span>
        <span class="center-line"></span>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: function() {
                return []
            }
        },
        alwaysShowArrow: {
            type: Boolean,
            default: false
        },
        arrowPosition: {
            type: String,
            default: 'outer' // inner:内部箭头, outer：外部箭头
        },
        arrowScale: {
            type: Number,
            default: 1
        },
        step: {
            type: Number,
            default: 3
        }
    },
    data() {
        return {
            colors: ['#67C23A', '#E6A23C', '#F56C6C', '#909399', '#409EFF'],
            showArrow: false,
            atHead: true,
            atEnd: false
        }
    },
    watch: {
        list: {
            handler(val) {
                this.$nextTick(() => {
                    let body = this.$refs.body
                    let list = this.$refs.list
                    if (body && list) {
                        let { width: gw } = body.getBoundingClientRect()
                        let { width: lw } = list.getBoundingClientRect()
                        this.showArrow = this.alwaysShowArrow || lw > gw
                    }
                })
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
    },
    methods: {
        scrollLeft() {
            let body = this.$refs.body
            let item = body.getElementsByClassName('item')
            if (item) {
                let w = Number(item[0].getBoundingClientRect().width)
                body.scrollLeft -= w * this.step
            }
        },
        scrollRight() {
            let body = this.$refs.body
            let item = body.getElementsByClassName('item')
            if (item) {
                let w = Number(item[0].getBoundingClientRect().width)
                body.scrollLeft += w * this.step
            }
        },
        handleScroll(e) {
            let { scrollLeft, scrollWidth } = e.target
            let { width: gw } = e.target.getBoundingClientRect()
            this.atHead = scrollLeft === 0
            this.atEnd = scrollLeft + gw - 2 * 50 * this.arrowScale >= scrollWidth
        },
        moveItemToCenter(e, item, index) {
            let body = this.$refs.body
            let target = e.target
            let { width: bw, left: bl } = body.getBoundingClientRect()
            let { width: tw, left: tl } = target.getBoundingClientRect()
            let distance = tl - bl
            body.scrollLeft = body.scrollLeft + distance - bw / 2 + tw / 2
        }
    }
}
</script>
<style lang="scss" scoped>
.gallery {
    display: inline-block;
    max-width: 100%;
    position: relative;
    border: 1px solid black;
}
.arrow {
    position: absolute;
    top: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 20px;
    border-radius: 50%;
    color: #409EFF;
    border: 1px solid  #409EFF;
    background-color: white;
    cursor: pointer;
    user-select: none;
}
.arrow-left {
    left: 0;
    transform-origin: left center;
}
.arrow-right {
    right: 0;
    transform-origin: right center;
}
.arrow-disabled {
    color: #EBEEF5;
    border: 1px solid #EBEEF5;
    background-color: white;
    cursor: not-allowed;
}
.center-line {
    position: absolute;
    left: 50%;
    top: -50%;
    width: 0;
    height: 200%;
    border-left: 1px solid black;
}
.body {
    display: inline-block;
    width: auto;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    overflow-x: auto;
    border: 1px solid white;
    border-top: none;
    border-bottom: none;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        display: none;
    }
}
.list {
    display: inline-block;
    white-space: nowrap;
    width: auto;
}
.item {
    display: inline-block;
    cursor: pointer;
}
</style>
