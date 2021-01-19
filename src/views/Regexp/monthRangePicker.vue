<template>
    <el-date-picker
        v-model="model"
        type="monthrange"
        :align="align"
        :size="size"
        :readonly="readonly"
        :disabled="disabled"
        :editable="editable"
        :clearable="clearable"
        unlink-panels
        :range-separator="rangeSeparator"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :value-format="valueFormat"
        :format="format"
        :default-time="['00:00:00', '23:59:59']"
        :picker-options="pickerOptions"
        @change="dateChange">
    </el-date-picker>
</template>
<script>
export default {
    model: {
        prop: 'startValue',
        event: 'input'
    },
    props: {
        startValue: {
            type: String,
            default: ''
        },
        endValue: {
            type: String,
            default: ''
        },
        clearable: {
            type: Boolean,
            default: true
        },
        editable: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        },
        size: String,
        startPlaceholder: {
            type: String,
            default: '开始月份'
        },
        endPlaceholder: {
            type: String,
            default: '结束月份'
        },
        format: {
            type: String,
            default: 'yyyy-MM-dd'
        },
        align: {
            type: String,
            default: 'left'
        },
        rangeSeparator: {
            type: String,
            default: '-'
        },
        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd HH:mm:ss'
        }
    },
    data() {
        return {
            pickerOptions: {},
            model: ['', ''],
            flag: false
        }
    },
    created() {
        this.model = [this.startValue, this.endValue]
        this.setOpts()
    },
    mounted() {
        
    },
    methods: {
        dateChange(v) {
            if (!this.flag && v) {
                let end = new Date(this.model[1])
                let month = end.getMonth() + 1
                let year = end.getFullYear()
                let isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
                let monthArr = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                let endDate = monthArr[month - 1]
                end.setDate(endDate)
                this.$set(this.model, 1, `${year}-${month > 9 ? month : '0' + month}-${endDate > 9 ? endDate : '0' + endDate} 23:59:59`)
            }
            this.flag = false
            this.model = v || ['', '']
            this.$emit('input', this.model[0])
            this.$emit('update:endValue', this.model[1])
        },
        setStart(d = new Date()) {
            const start = new Date(d)
            start.setDate(1)
            start.setHours(0)
            start.setMinutes(0)
            start.setSeconds(0)
            return start
        },
        setEnd(d = new Date()) {
            const end = new Date(d)
            end.setHours(23)
            end.setMinutes(59)
            end.setSeconds(59)
            return end
        },
        setModel() {

        },
        setOpts() {
            let vm = this
            this.pickerOptions = {
                shortcuts: [
                    {
                        text: '本月',
                        onClick(picker) {
                            const end = vm.setEnd()
                            const start = vm.setStart()
                            vm.flag = true
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            const end = vm.setEnd()
                            const start = vm.setStart(new Date(new Date().getFullYear(), 0))
                            vm.flag = true
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近3个月',
                        onClick(picker) {
                            const end = vm.setEnd()
                            const start = vm.setStart()
                            start.setMonth(start.getMonth() - 3)
                            vm.flag = true
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近6个月',
                        onClick(picker) {
                            const end = vm.setEnd()
                            const start = vm.setStart()
                            start.setMonth(start.getMonth() - 6)
                            vm.flag = true
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            }
        }
    },
    watch: {
        startValue(nv) {
            !this.model && (this.model = ['', ''])
            this.$set(this.model, 0, nv || '')
        },
        endValue(nv) {
            !this.model && (this.model = ['', ''])
            this.$set(this.model, 1, nv || '')
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
