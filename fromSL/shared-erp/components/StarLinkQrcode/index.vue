<template>
    <div>
        <div :id="idName"></div>
    </div>
</template>

<script>
import QRCode from 'qrcodejs2'  // 引入qrcode
export default {
    props: {
        width: {
            type: Number,
            default: 142
        },
        height: {
            type: Number,
            default: 142
        },
        text: {
            type: [Number, String]
        },
        idName: {
            type: String,
            default: 'qrcode'
        }
    },
    data() {
        return {}
    },
    mounted() {
        this.qrcode()
    },
    methods: {
        qrcode() {
            this.$nextTick(() => {
                let qrcode = new QRCode(this.idName, {
                    width: this.width,
                    height: this.height,
                    text: this.text, // 二维码地址
                    colorDark: '#000',
                    colorLight: '#fff'
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
