<template>
    <WarehouseSelect v-model="innerValue" :type="type" :options="warehouses" :multiple="multiple" :clearable="clearable"
        :filterable="filterable" :showAll="showAll" :props="props" @change="onChange">
    </WarehouseSelect>
</template>
<script>
import WarehouseApi from '@/api/warehouse'
import WarehouseSelect from './WarehouseSelect'
import mixin from 'utils/mixin'
export default {
    name: 'SlWarehouseSelect',
    components: {
        WarehouseSelect
    },
    mixins: [mixin],
    props: {
        type: {
            type: String,
            default: 'select'
        },
        value: [String, Number, Array],
        multiple: Boolean,
        clearable: Boolean,
        filterable: Boolean,
        showAll: Boolean,
        immediate: {
            type: Boolean,
            default: true
        },
        props: {
            type: Object,
            default: () => {
                return {
                    label: 'label',
                    value: 'value'
                }
            }
        },
        params: Object
    },
    data() {
        return {
            innerValue: this.value || this.getDefaultWarehouseId(),
            warehouses: []
        }
    },
    mounted() {
        this.immediate && this.getWareList()
    },
    created() {
        this.$emit('input', this.innerValue)
    },
    methods: {
        getWareList() {
            return WarehouseApi.warehouseList(this.params).then((res) => {
                const { success, data } = res
                if (success) {
                    this.warehouses = data.map((item) => {
                        return {
                            [this.props.label]: item.warehouseName,
                            [this.props.value]: item.warehouseId
                        }
                    })
                }
                const isExistInnerValue = () => {
                    if (this.innerValue) {
                        const item = this.warehouses.find(
                            (m) => m[this.props.value] === this.innerValue
                        )

                        if (item) return true
                    }
                    return false
                }
                // 判断是否有回显数据
                if (!isExistInnerValue()) {
                    const defaultWarehouseId = this.getDefaultWarehouseId()
                    // 1、没有默认仓库  2、radio-select类型且有全选  3、当不确定类型时是select
                    if (!defaultWarehouseId && !this.showAll && this.type) {
                        this.innerValue = this.warehouses[0][this.props.value]
                    }
                    // 处理默认仓库不在数据源时
                    if (defaultWarehouseId) {
                        const item = this.warehouses.find(
                            (m) => m[this.props.value] === defaultWarehouseId
                        )
                        if (!item) {
                            this.innerValue = this.warehouses[0][
                                this.props.value
                            ]
                        }
                    }
                }

                this.$nextTick(() => {
                    this.$emit(
                        'load-success',
                        this.warehouses.slice(),
                        this.props
                    )
                })
            })
        },
        onChange(val) {
            this.innerValue = val
            this.$emit('change', val, this.getItem(val), this.props)
        },
        loadData() {
            return this.getWareList()
        },
        setData(data) {
            this.warehouses = data
        },
        getItem(val) {
            return this.warehouses.find((m) => m[this.props.value] === val)
        }
    },
    watch: {
        value(val) {
            this.innerValue = val
        },
        innerValue: {
            handler: function (newVal, oldVal) {
                this.$emit('input', newVal)
            },
            deep: true
        }
    }
}
</script>
