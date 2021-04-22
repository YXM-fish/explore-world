<template>
    <div class="erp-warehouse-container">
        <sl-radio-box v-if="type=='radio-block'" v-model="innerValue" :options="options" :showAll="showAll"
            :valKey="props.value" :labelKey="props.label" @change="onChange"></sl-radio-box>

        <el-select v-if="type=='select'" :clearable="clearable" :multiple="multiple" :filterable="filterable"
            v-model="innerValue" @change="onChange" style="width:100%">
            <el-option v-for="(item,index) in options" :label="item[props.label]" :value="item[props.value]"
                :key="index" placeholder="请选择仓库"></el-option>
        </el-select>
    </div>
</template>
<script>
import SlRadioBox from 'components/StarLinkRadioBox'
// import SlCheckoutBox from 'components/StarLinkCheckoutBox'
export default {
    name: 'WarehouseSelect',
    components: {
        SlRadioBox
    },
    props: {
        value: [String, Number, Array],
        // block -> StarlinkCheckoutBox
        // select ->  el-select
        type: {
            type: String,
            default: 'select'
        },
        options: {
            type: Array,
            required: true
        },
        multiple: Boolean,
        clearable: Boolean,
        filterable: Boolean,
        showAll: Boolean,
        props: {
            type: Object,
            default: () => {
                return {
                    label: 'label',
                    value: 'value'
                }
            }
        }
    },
    data() {
        return {
            innerValue: this.value
        }
    },
    methods: {
        onChange(val) {
            const _value = this.getValue(val)
            this.innerValue = _value
            // this.$nextTick(() => {
            //     this.$emit('change', _value)
            // })
        },
        getValue(val) {
            return this.type == 'radio-block' && this.innerValue
                ? val[this.props.value]
                : this.innerValue
        }
    },
    watch: {
        value(val) {
            this.innerValue = val
        },
        innerValue(val) {
            this.$emit('input', this.innerValue)
            // fix value改变即触发change
            this.$nextTick(() => {
                this.$emit('change', val)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.erp-warehouse-container {
    display: inline-block;
    -webkit-display: inline-block;
    -moz-display: inline-block;
}
</style>
