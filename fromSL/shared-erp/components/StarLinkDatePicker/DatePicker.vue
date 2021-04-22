<template>
    <div :class="[asListFilterItem ? 'sl-date-picker-as-filter' : 'sl-data-picker']" class="sl-data-picker">
        <el-date-picker :style="pickerStyle" v-model="timeValue" :type="type" :align="align" unlink-panels
            :default-time="defaultTimeVal" :default-value="defaultValue" :format="format" :value-format="valueFormat"
            range-separator="-" :placeholder="placeholder" :start-placeholder="placeholder"
            :end-placeholder="endPlaceholder" @change="changeDate" :popper-class="popperClass"
            :picker-options="pickerOptions" :clearable="clearable" :disabled="disabled" ref="date">
        </el-date-picker>
    </div>
</template>

<script>
import { parseTime } from 'utils/index'
export default {
    name: 'SlDatePicker',
    props: {
        value: {
            type: String,
            default: ''
        },
        endValue: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'datetimerange'
        }, // year/month/week/date/datetime/datetimerange/daterange/monthrange
        /**
         * optDaterangeType：限制可选时间范围
         * 使用string: pastTime---过去的日期 futureTime---未来的日期 all---所有日期
         * 使用Array时（传空数组或数组长度大于2为默认值）
         * [number, '']---当前日期前number天
         * ['', number]---当前日期后number天
         * [date1, date2]---date1到date2
         * */
        optDaterangeType: {
            type: [String, Array],
            default: 'pastTime'
        },
        valueFormat: {
            type: String,
            default: 'yyyy-MM-dd HH:mm:ss'
        },
        defaultTime: {
            type: [String, Array]
        },
        format: {
            type: String
        }, // 显示在输入框中的格式
        align: {
            type: String,
            default: 'center'
        }, // 对齐方式 left, center, right
        popperClass: {
            type: String
        }, // DatePicker 下拉框的类名
        placeholder: {
            type: String,
            default: '开始日期'
        },
        endPlaceholder: {
            type: String,
            default: '结束日期'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        pickerStyle: Object, // 时间组件样式
        asListFilterItem: {
            type: Boolean,
            default: true // 用作列表筛选
        },
        clearable: {
            type: Boolean,
            default: true
        },
        shortcuts: {
            type: Boolean,
            default: true
        },
        disabledDateHandler: Function,
        setTimeHandler: Function,
        defaultValue: {
            type: String,
            default: parseTime(new Date(), '{y}-{m}-{d}')
        },
        // 选择具体日期时，时分秒显示为当前时间
        nowCurrentTime: Boolean
    },
    data() {
        const _this = this
        const { optDaterangeType } = this
        const isDaterange =
            this.type === 'datetimerange' ||
            this.type === 'daterange' ||
            this.type === 'monthrange'
        let defaultTime = ''
        if (!this.defaultTime) {
            if (!isDaterange) {
                let myDate = new Date()
                let h = myDate.getHours() // 获取当前小时数(0-23)
                let m = myDate.getMinutes() // 获取当前分钟数(0-59)
                let s = myDate.getSeconds() // 获取当前秒数(0-59)
                defaultTime = `${h}:${m}:${s}`
            } else {
                defaultTime = ['00:00:00', '23:59:59']
            }
        }
        return {
            timeValue: undefined,
            defaultTimeVal: this.defaultTime || defaultTime,
            isDaterange, // 是否取的是时间范围
            pickerOptions: {
                disabledDate(time) {
                    if (_this.disabledDateHandler) {
                        return _this.disabledDateHandler(time)
                    } else {
                        let dataTime = new Date()
                        // 无论时间限制为未来或过去，可选择今天
                        if (optDaterangeType === 'futureTime') {
                            dataTime.setHours(0)
                            dataTime.setMinutes(0)
                            dataTime.setSeconds(0)
                            dataTime.setMilliseconds(0)
                            return time < dataTime
                        } else if (optDaterangeType === 'pastTime') {
                            dataTime.setHours(23)
                            dataTime.setMinutes(59)
                            dataTime.setSeconds(59)
                            return time > dataTime
                        } else if (Array.isArray(optDaterangeType)) {
                            if (
                                !optDaterangeType.length ||
                                optDaterangeType.length > 2 ||
                                (!optDaterangeType[0] && !optDaterangeType[1])
                            )
                                return false

                            // 2个日期
                            if (optDaterangeType[0] && optDaterangeType[1]) {
                                return (
                                    new Date(optDaterangeType[0]) > time ||
                                    new Date(optDaterangeType[1]) < time
                                )
                            }

                            // 单个值
                            let isZero = !optDaterangeType[0]
                            dataTime.setHours(isZero ? 0 : 23)
                            dataTime.setMinutes(isZero ? 0 : 59)
                            dataTime.setSeconds(isZero ? 0 : 59)

                            let times =
                                (optDaterangeType[0] || optDaterangeType[1]) *
                                24 *
                                3600 *
                                1000

                            if (optDaterangeType[0]) {
                                // 今天之前
                                return (
                                    dataTime - times > time || dataTime < time
                                )
                            } else {
                                // 今天之後
                                return (
                                    dataTime + times < time || dataTime > time
                                )
                            }
                        }
                        return false
                    }
                }
            }
        }
    },
    created() {
        this.changeTypeOrDateVal()
        if (this.shortcuts) {
            if (this.type === 'month' || this.type === 'monthrange') {
                this.setMonthShortcuts()
            } else if (this.type !== 'year' && this.type !== 'week') {
                this.setPickerOptions()
            }
        }
    },
    mounted() {
        if (
            this.nowCurrentTime &&
            (this.type === 'datetimerange' ||
                this.type === 'daterange' ||
                this.type === 'datetime')
        ) {
            const handleRangeClick = this.$refs.date.handleRangeClick
            const dateRef = this.$refs.date
            this.$refs.date.handleRangeClick = function (val) {
                handleRangeClick(val)
                const picker = dateRef.picker
                const handleRangePick = picker.handleRangePick
                picker.handleRangePick = function (val) {
                    const date = new Date()
                    const isCurDate = val.maxDate
                        ? parseTime(val.maxDate, '{y}:{m}:{d}') ===
                          parseTime(date, '{y}:{m}:{d}')
                        : false

                    picker.defaultTime = [
                        '00:00:00',
                        isCurDate ? parseTime(date, '{h}:{i}:{s}') : '23:59:59'
                    ]
                    handleRangePick(val)
                }
            }
        }
    },
    methods: {
        setTime(picker, day, endDay) {
            if (this.setTimeHandler) {
                this.setTimeHandler(picker, day, endDay)
                return
            }
            const now = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * day)
            if (this.isDaterange) {
                const end = new Date()
                start.setHours(0)
                start.setMinutes(0)
                start.setSeconds(0)
                if (endDay) {
                    end.setTime(end.getTime() - 3600 * 1000 * 24 * endDay)
                }
                let istoday =
                    parseTime(end, '{y}:{m}:{d}') ===
                    parseTime(now, '{y}:{m}:{d}')
                if (!(this.nowCurrentTime && istoday)) {
                    end.setHours(23)
                    end.setMinutes(59)
                    end.setSeconds(59)
                }
                picker.$emit('pick', [start, end])
            } else {
                picker.$emit('pick', start)
            }
        },
        setPickerOptions() {
            const { setTime } = this
            const shortcuts = [
                {
                    text: '今天',
                    onClick(picker) {
                        setTime(picker, 0)
                    }
                },
                {
                    text: '昨天',
                    onClick(picker) {
                        setTime(picker, 1, 1)
                    }
                },
                {
                    text: '最近3天',
                    onClick(picker) {
                        setTime(picker, 2)
                    }
                },
                {
                    text: '最近7天',
                    onClick(picker) {
                        setTime(picker, 6)
                    }
                },
                {
                    text: '最近15天',
                    onClick(picker) {
                        setTime(picker, 14)
                    }
                },
                {
                    text: '最近30天',
                    onClick(picker) {
                        setTime(picker, 29)
                    }
                },
                {
                    text: '最近90天',
                    onClick(picker) {
                        setTime(picker, 89)
                    }
                }
            ]
            this.pickerOptions.shortcuts = shortcuts
        },
        setMonthTime(picker, month, endMonth = 0) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - month)
            if (this.isDaterange) {
                if (endMonth) {
                    end.setMonth(end.getMonth() - endMonth)
                }
                picker.$emit('pick', [start, end])
            } else {
                picker.$emit('pick', start)
            }
        },
        setMonthShortcuts() {
            const { setMonthTime } = this
            const monthShortcuts = [
                {
                    text: '上个月',
                    onClick(picker) {
                        setMonthTime(picker, 1, 1)
                    }
                },
                {
                    text: '今年至今',
                    onClick(picker) {
                        let month = new Date().getMonth()
                        setMonthTime(picker, month)
                    }
                },
                {
                    text: '最近3个月',
                    onClick(picker) {
                        setMonthTime(picker, 3)
                    }
                },
                {
                    text: '最近6个月',
                    onClick(picker) {
                        setMonthTime(picker, 6)
                    }
                },
                {
                    text: '最近12个月',
                    onClick(picker) {
                        setMonthTime(picker, 12)
                    }
                }
            ]
            this.pickerOptions.shortcuts = monthShortcuts
        },
        changeTypeOrDateVal() {
            if (this.isDaterange) {
                this.timeValue = [this.value, this.endValue]
            } else {
                this.timeValue = this.value
            }
        },
        changeDate(val) {
            if (this.isDaterange) {
                this.$emit('input', val ? val[0] : '')
                this.$emit('update:endValue', val ? val[1] : '')
                this.$emit('change', val)
            } else {
                this.$emit('input', val || '')
                this.$emit('change', val)
            }
        },
        reset() {
            this.timeValue = []
            this.changeDate()
        }
    },
    watch: {
        value(newValue, oldValue) {
            this.changeTypeOrDateVal()
        },
        endValue(newValue) {
            this.changeTypeOrDateVal()
        }
    }
}
</script>

<style lang="scss" scoped>
.sl-data-picker {
    .el-date-editor.el-input {
        width: 190px;
    }
    .el-date-editor--daterange.el-input__inner {
        width: 100%;
    }
    .el-date-editor--datetimerange.el-input,
    .el-date-editor--datetimerange.el-input__inner {
        width: 100%;
    }
    /deep/ .el-date-editor .el-range__icon {
        height: auto;
    }
}
</style>
