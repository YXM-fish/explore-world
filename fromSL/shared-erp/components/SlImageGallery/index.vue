<template>
    <div class="gallery" ref="gallery">
        <span v-if="showArrow" class="arrow arrow-left" :class="{'arrow-disabled': atHead}"
            :style="{'transform': `translateY(-50%) scale(${arrowScale})`}" @click="scrollLeft">
            <i class="el-icon-arrow-left"></i>
        </span>
        <div class="body" ref="body"
            :style="{'border-width': arrowPosition === 'outer' && showArrow ? 50 * arrowScale + 'px' : ''}"
            @scroll="handleScroll($event)">
            <div class="list" ref="list">
                <template v-for="(item, index) in list">
                    <div :key="index" class="item">
                        <slot :item="item" :index="index"></slot>
                    </div>
                </template>
            </div>
        </div>
        <span v-if="showArrow" class="arrow arrow-right" :class="{'arrow-disabled': atEnd}"
            :style="{'transform': `translateY(-50%) scale(${arrowScale})`}" @click="scrollRight">
            <i class="el-icon-arrow-right"></i>
        </span>
    </div>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: function () {
                return []
            }
        },
        alwaysShowArrow: {
            type: Boolean,
            default: false
        },
        // inner:内部箭头, outer：外部箭头
        arrowPosition: {
            type: String,
            default: 'outer'
        },
        // 箭头大小
        arrowScale: {
            type: Number,
            default: 1
        },
        // 滚动步数
        step: {
            type: Number,
            default: 300
        }
    },
    data() {
        return {
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
    computed: {},
    methods: {
        scrollLeft() {
            let body = this.$refs.body
            body.scrollLeft -= this.step
        },
        scrollRight() {
            let body = this.$refs.body
            body.scrollLeft += this.step
        },
        handleScroll(e) {
            let { scrollLeft, scrollWidth } = e.target
            let { width: gw } = e.target.getBoundingClientRect()
            this.atHead = scrollLeft === 0
            this.atEnd =
                scrollLeft + gw - 2 * 50 * this.arrowScale >= scrollWidth
        }
    }
}
</script>
<style lang="scss" scoped>
.gallery {
    display: inline-block;
    max-width: 100%;
    position: relative;
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
    color: #409eff;
    border: 1px solid #409eff;
    background-color: white;
    cursor: pointer;
    user-select: none;
    &:hover {
        animation: shadow 1s infinite ease-in-out;
    }
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
    color: #dbdbdb;
    border: 1px solid #dbdbdb;
    background-color: white;
    cursor: not-allowed;
    &:hover {
        animation: none;
    }
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
        width: 0;
        height: 0;
    }
}
.list {
    display: inline-block;
    white-space: nowrap;
    width: auto;
}
.item {
    display: inline-block;
}
@keyframes shadow {
    0% {
        box-shadow: 0 0 3px #409eff;
    }
    30% {
        box-shadow: 0 0 6px #409eff;
    }
    60% {
        box-shadow: 0 0 3px #409eff;
    }
    100% {
        box-shadow: none;
    }
}
</style>
