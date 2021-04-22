<template>
    <el-dialog :title="title" custom-class="stl-confirm-dialog" :visible.sync="dialogVisible" :width="width"
        :show-close="showClose" @open="open" @close="close" :before-close="handleClose" :close-on-press-escape="false"
        :destroy-on-close="destroyOnClose" :close-on-click-modal="false" :lock-scroll="false" :append-to-body="true">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="toDo">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'StlConfirmDialog',
    components: {},
    props: {
        title: {
            type: String,
            default: '确认'
        },
        width: {
            type: String,
            default: '40%'
        },
        showConfirmDialog: {
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
        }
    },
    data() {
        return {
            dialogVisible: false,
            cancelFn: null,
            acceptFn: null
        }
    },
    watch: {
        showConfirmDialog: {
            handler: function (val, oldVal) {
                if (oldVal !== val) {
                    this.dialogVisible = val
                }
            },
            immediate: true
        },
        dialogVisible(val) {
            this.$emit('update:showConfirmDialog', val)
        }
    },
    computed: {},
    methods: {
        show(accept, cancel) {
            this.dialogVisible = true
            this.cancelFn = cancel
            this.acceptFn = accept
        },
        handleClose(done) {
            this.$emit('before-close', done)
        },
        open() {
            this.$emit('open')
        },
        close() {
            this.$emit('close')
        },
        cancel() {
            this.dialogVisible = false
            if (typeof this.cancelFn === 'function') {
                this.cancelFn()
            }
            this.$emit('cancel')
        },
        toDo() {
            this.dialogVisible = false
            if (typeof this.acceptFn === 'function') {
                this.acceptFn()
            }
            this.$emit('accept')
        }
    }
}
</script>

<style lang="scss">
.stl-confirm-dialog {
    margin-top: 30vh !important;
}
</style>

<style lang="scss" scoped>
</style>
