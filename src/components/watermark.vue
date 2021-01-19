<template>
    <div class="wrap">
        <div ref="watermark" class="watermark" :style="{background: 'url(' + watermark + ') left top repeat'}"></div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'watermark',
    props: {
        content: {
            type: String,
            default: '于小明 2020-5-29'
        },
        deg: {
            type: Number,
            default: 20
        },
        width: {
            type: Number,
            default: 260
        },
        height: {
            type: Number,
            default: 260
        },
        fillStyle: {
            type: String,
            default: 'rgba(200, 200, 200, 0.40)'
        },
        font: {
            type: String,
            default: '300 16px Vedana'
        }
    },
    data() {
        return {
            watermark: ''
        }
    },
    mounted() {
        this.setWatermark()
    },
    methods: {
        setWatermark() {
            let can = document.createElement('canvas')
            can.width = this.width
            can.height = this.height
            let ctx = can.getContext('2d')
            ctx.translate(can.width / 2, 0)
            ctx.rotate((this.deg * Math.PI) / 180)
            ctx.font = this.font
            ctx.fillStyle = this.fillStyle
            ctx.textAlign = 'center'
            ctx.textBaseline = 'Middle'
            ctx.fillText(this.content, can.width / 8, can.height / 2)
            this.watermark = can.toDataURL('image/png')
        }
    }
}
</script>
<style lang="scss" scoped>
.wrap {
    min-height: calc(100vh - 50px);
    position: relative;
}
.watermark {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    width: 100%;
    height: 100%;
    z-index: 9000;
}
</style>
