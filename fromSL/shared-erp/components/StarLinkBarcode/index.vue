<template>
    <div>
        <svg :id="idName" />
    </div>
</template>

<script>
import 'utils/JsBarcode.all.js'
export default {
    props: {
        width: {
            type: Number,
            default: 1.6
        },
        height: {
            type: Number,
            default: 112
        },
        text: {
            type: [Number, String]
        },
        idName: {
            type: String,
            default: 'qrcode'
        },
        textMargin: {
            type: Number,
            default: 6
        },
        fontSize: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {}
    },
    mounted() {
        this.getJsBarcode()
    },
    methods: {
        getJsBarcode() {
            this.$nextTick(() => {
                JsBarcode(`#${this.idName}`, this.text, {
                    height: this.height,
                    fontSize: this.fontSize,
                    width: this.width,
                    margin: 0,
                    textMargin: this.textMargin, // 设置条形码和文本之间的间距
                    textPosition: 'botton',
                    fontOptions: 'bold'// 使文字加粗体
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>