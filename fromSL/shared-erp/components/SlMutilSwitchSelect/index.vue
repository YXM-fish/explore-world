<template>
    <div class="erp-mutil-switch-select">
        <div class="sl-component-wrapper" v-if="optionsCopy.length < switchLength">
            <!-- 多选 -->
            <sl-checkout-box v-if="type === 'sl-checkbox'" v-model="innerValue" :options="optionsCopy"
                :showAll="showAll" :isShowMulti="innerMultiple" @change="onChange"></sl-checkout-box>
            <!-- 单选 -->
            <sl-radio-box v-if="type === 'sl-radiobox'" v-model="innerValue" :options="optionsCopy" :showAll="showAll"
                @change="onChange"></sl-radio-box>
        </div>
        <el-select v-else v-model="innerValue" @change="onChange" :multiple="innerMultiple" filterable clearable
            :placeholder="placeholder" :style="{width: typeof selectWidth === 'string'?selectWidth:selectWidth + 'px'}"
            @filter-method="onFilter">
            <el-option v-for="(item,index) in optionsCopy" :key="index"
                :label="`${item.label}${labelShowExtendDesc ? `(${item.id || item.value})` : ''}`" :value="item.value">
                <span
                    style="float:left">{{`${item.label}${labelShowExtendDesc ? `(${item.id || item.value})` : ''}`}}</span>
                <span v-if="item.labelExt" style="float:right;margin-right:20px">{{item.labelExt}}</span>
            </el-option>
        </el-select>
    </div>
</template>
<script>
import SlCheckoutBox from 'components/StarLinkCheckoutBox'
import SlRadioBox from 'components/StarLinkRadioBox'
export default {
    name: 'SlMutilSwitchSelect',
    components: {
        SlCheckoutBox,
        SlRadioBox
    },
    props: {
        value: [String, Number, Array],
        type: {
            type: String,
            default: 'sl-checkbox'
        },
        options: Array,
        multiple: Boolean,
        switchLength: {
            type: Number,
            default: 10
        },
        selectWidth: {
            type: [Number, String],
            default: 300
        },
        placeholder: {
            type: String,
            default: '请选择店铺'
        },
        showAll: {
            type: Boolean,
            default: true
        },
        labelShowExtendDesc: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            innerValue: this.value
        }
    },
    computed: {
        innerMultiple() {
            if (this.type === 'sl-radiobox') {
                return false
            }
            return this.multiple
        },
        optionsCopy() {
            return JSON.parse(JSON.stringify(this.options))
        }
    },
    methods: {
        onChange() {
            // TODO
            // console.log('onChange')
        },
        onFilter(val) {
            if (val) {
                this.optionsCopy = this.options.filter((m) => {
                    if (
                        m.label.indexOf(val) > -1 ||
                        m.value.toString().indexOf(val) > -1
                    ) {
                        return true
                    }
                })
            } else {
                this.optionsCopy = this.options
            }
        }
    },
    watch: {
        value(val, oldVal) {
            this.innerValue = val
        },
        innerValue(val, oldVal) {
            // console.log(val, oldVal)
            function truthy(value) {
                // array、string都有length属性
                return value && value.length
            }
            // jll: 矛盾点备注（同时维护全部订单和原始订单）
            // 1、外部手动触发change，修改内部数据也会触发change;
            // 2、MutilSwitchSelect.vue内部又要根据length修改value的值，触发change;
            // 3、外部赋值之前给与判断，没有修改且是有效值的时候才去重置赋值;
            // 4、顺序问题：切换渠道，店铺组件data更新触发watch，getShops接口还没回来;
            const type = typeof val
            // console.log(type)
            if (type === typeof oldVal) {
                if (
                    (type === 'string' && val === oldVal) ||
                    (type === 'object' && !val.length && !oldVal.length)
                ) {
                    return
                }
            }
            if (typeof val !== typeof oldVal) {
                if (!truthy(val) && !truthy(oldVal)) {
                    return
                }
            }
            this.$emit('input', val)
            this.$emit('change')
        }
    }
}
</script>
<style lang="scss" scoped>
.erp-mutil-switch-select {
    display: inline;
    .sl-component-wrapper {
        display: inline;
    }
}
</style>
