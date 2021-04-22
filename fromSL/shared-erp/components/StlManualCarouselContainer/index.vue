<template>
    <div ref="carouselContainer" class="stl-manual-carousel-container">
        <span v-if="showArrow" class="arrow-icon el-icon-arrow-left" @click="moveToRight"></span>
        <div ref="carouselInner" class="manual-carousel-inner">
            <slot></slot>
        </div>
        <span v-if="showArrow" class="arrow-icon el-icon-arrow-right" @click="moveToLeft"></span>
    </div>
</template>

<script>
export default {
    name: 'StlManualCarouselContainer',
    props: {
        moveStep: {
            type: Number,
            default: 50
        }
    },
    data() {
        return {
            showArrow: false
        }
    },
    computed: {},
    methods: {
        debounce(fn) {
            let timerId
            return (params) => {
                if (timerId) {
                    clearTimeout(timerId)
                }
                timerId = setTimeout(() => {
                    fn(params)
                }, 500)
            }
        },
        computedShowArrow() {
            let container = this.$refs.carouselContainer
            let inner = this.$refs.carouselInner
            if (container && inner) {
                this.showArrow = container.clientWidth < inner.clientWidth
                if (!this.showArrow) {
                    inner.style.left = 0
                }
            } else {
                this.showArrow = false
            }
        },
        resetCompute() {
            this.computedShowArrow()
            this.resetPosition()
        },
        resetPosition() {
            let inner = this.$refs.carouselInner
            if (inner) {
                inner.style.left = 0
            }
        },
        debounceResetCompute() {
            this.debounce(this.resetCompute)()
        },
        moveToLeft() {
            let inner = this.$refs.carouselInner
            let newLeft = parseFloat(inner.style.left) - this.moveStep
            inner.style.left =
                Math.abs(newLeft) < inner.clientWidth
                    ? newLeft + 'px'
                    : -(inner.clientWidth - 200) + 'px'
        },
        moveToRight() {
            let inner = this.$refs.carouselInner
            let newLeft = parseFloat(inner.style.left) + this.moveStep
            inner.style.left = newLeft > 0 ? 0 : newLeft + 'px'
        }
    },
    mounted() {
        window.addEventListener('resize', this.debounceResetCompute)
        this.$refs.carouselInner.style.left = 0
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.debounceResetCompute)
    }
}
</script>

<style lang="scss" scoped>
.stl-manual-carousel-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    .manual-carousel-inner {
        display: inline-block;
        position: relative;
        left: 0;
        white-space: nowrap;
        transition: left 0.5s;
    }

    .arrow-icon {
        position: absolute;
        top: 50%;
        height: 2em;
        width: 2em;
        line-height: 2em;
        border-radius: 100%;
        transform: translateY(-50%);
        text-align: center;
        color: #fff;
        background: #000;
        opacity: 0.6;
        z-index: 10;
        cursor: pointer;

        &.el-icon-arrow-left {
            left: 0;
        }

        &.el-icon-arrow-right {
            right: 0;
        }
    }
}
</style>
