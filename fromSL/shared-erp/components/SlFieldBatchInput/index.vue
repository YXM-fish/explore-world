<template>
    <div class="sku-container" :style="{width: width ? width + 'px' : '100%'}">
        <el-input ref="input" :placeholder="`请输入${label}`" @input="handleInput" v-model="skuCodesCopy" clearable>
            <el-button v-if="showBatchButton" slot="append" type="primary" @click="multipleSku">批量</el-button>
        </el-input>
        <SkuBatchDialog ref="skuBatchDialog" :maxLen="maxLen" :label="label" @submit="onSubmit" v-bind="$attrs">
        </SkuBatchDialog>
    </div>
</template>

<script>
import SkuBatchDialog from './skuBatchDialog'

export default {
    name: 'SlFieldBatchInput',
    model: {
        prop: 'skuCodes',
        event: 'confirm'
    },
    props: {
        skuCodes: {
            type: String,
            default: ''
        },
        maxLen: {
            type: Number,
            default: 200
        },
        label: {
            type: String,
            default: 'SKU'
        },
        width: {
            type: Number,
            default: 0
        },
        showBatchButton: {
            type: Boolean,
            default: true
        }
    },
    components: {
        SkuBatchDialog
    },
    data() {
        return {
            skuCodesCopy: '',
            multipleSkuVisible: false
        }
    },
    watch: {
        skuCodes(val) {
            this.skuCodesCopy = val
        }
    },
    methods: {
        handleInput(value) {
            this.skuCodesCopy = this.formatLen(this.skuCodesCopy)
            this.onEmit(this.skuCodesCopy)
        },
        multipleSku() {
            if (this.disabled) return
            this.$refs.skuBatchDialog.show(this.skuCodesCopy)
        },
        onSubmit(skucode) {
            this.onEmit(skucode)
        },
        onEmit(skuCodes) {
            this.$emit('confirm', skuCodes)
        },
        formatLen(skuCodes) {
            let skuArr = skuCodes.split(',')
            if (skuArr.length > this.maxLen) {
                this.$message.warning(
                    `超出允许输入最大数量${this.maxLen}个，已自动截取！`
                )
                skuArr.length = this.maxLen
                return skuArr.join(',')
            }
            return skuCodes
        }
    }
}
</script>

<style lang="scss" scoped>
.sku-container {
    display: inline-block;
}
</style>
