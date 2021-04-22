<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :width="width" :show-close="showClose" @open="open"
        @close="close" :before-close="handleClose" :close-on-press-escape="false" :destroy-on-close="destroyOnClose"
        :close-on-click-modal="false">
        <div class="stl-dialog-progress-bar--top" :style="topStyle">
            <slot name="top" :topData="inData"></slot>
        </div>
        <StlProgress :percentage="inData.percentage?inData.percentage:0" :color="color"></StlProgress>
        <div class="stl-dialog-progress-bar--bottom align-right" :style="bottomStyle">
            <slot name="bottom" :bottomData="inData"></slot>
        </div>
    </el-dialog>
</template>

<script>
import StlProgress from 'components/StlProgress'
export default {
    name: 'StlDialogProgressBar',
    components: {
        StlProgress
    },
    props: {
        title: {
            type: String,
            default: '进度提示'
        },
        width: {
            type: String,
            default: '40%'
        },
        dialogVisible: {
            type: Boolean,
            default: false
        },
        showClose: {
            type: Boolean,
            default: false
        },
        destroyOnClose: {
            type: Boolean,
            default: false
        },
        topStyle: {
            type: Object,
            default: () => ({})
        },
        bottomStyle: {
            type: Object,
            default: () => ({})
        },
        color: {
            type: [String, Function, Array],
            default: '#409eff'
        },
        inData: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {}
    },
    computed: {},
    methods: {
        handleClose(done) {
            this.$emit('before-close', done)
        },
        open() {
            this.$emit('open')
        },
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style lang="scss" scoped>
.stl-dialog-progress-bar--top {
    padding: 0 0 0.5em 0;
}

.stl-dialog-progress-bar--bottom {
    padding: 2em 0 1em 0;
    &.align-right {
        text-align: right;
    }
}
</style>
