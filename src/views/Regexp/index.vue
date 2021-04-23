<template>
    <div>
        <el-input v-model="val" v-validate="{integer: 5, decimal: 3, negative: false, max: 99999, min: -10000, fillin: true}"></el-input>
        {{val}}
        <el-input v-model="val1" v-formate></el-input>
        {{val1}}
        <div class="block">
            <span class="demonstration">带快捷选项</span>
            <!-- <el-date-picker
                v-model="value2"
                type="monthrange"
                align="right"
                unlink-panels
                range-separator="-"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                value-format="yyyy-MM-dd HH:mm:ss"
                :default-time="['00:00:00', '23:59:59']"
                :picker-options="pickerOptions"
                @change="dateChange">
            </el-date-picker> -->
            <MonthRangePicker v-model="startMonth" :endValue.sync="endMonth"></MonthRangePicker>
            {{startMonth + ' - ' + endMonth}}
            <el-button @click="setModel">设置月份</el-button>
        </div>
    </div>
</template>
<script>
import MonthRangePicker from './monthRangePicker'
export default {
    components: {
        MonthRangePicker
    },
    data() {
        return {
            val: '',
            pre: '',
            val1: '',
            pickerOptions: {},
            value1: '',
            value2: '',
            flag: false,
            startMonth: undefined,
            endMonth: undefined
        }
    },
    created() {
        this.setOpts()
    },
    mounted() { },
    directives: {
        validate(el, binding) {
            let { integer = 16, decimal = 2, negative = false, max = Number.MAX_SAFE_INTEGER, min = 0, fillin = false } = binding.value
            let _input = el.querySelector('input')
            let preValue = ''
            // let reg = /^(?:(0)(\.\d{0,6})?|([1-9]\d{0,4})(\.\d{0,6})?)$/
            // let reg = new RegExp(
            //     '^(([0](\\.{' + (decimal === 0 ? 0 : 1) + '}\\d{0,' + decimal + '})?)|(([1-9]\\d{0,' + (integer <= 1 ? 0 : integer - 1) + '})(\\.{' + (decimal === 0 ? 0 : 1) + '}\\d{0,' + decimal + '})?))$'
            // )
            let reg = new RegExp(
                '^(((-){' + (negative ? 1 : 0) + '}([0](\\.{' + (decimal === 0 ? 0 : 1) + '}\\d{0,' + decimal + '})?)?)|((-){' + (negative ? 1 : 0) + '}(([1-9]\\d{0,' + (integer <= 1 ? 0 : integer - 1) + '})(\\.{' + (decimal === 0 ? 0 : 1) + '}\\d{0,' + decimal + '})?)?))$'
            )
            _input.addEventListener('input', function(e) {
                let curValue = _input.value
                let result = reg.exec(curValue)
                let newValue = ''
                if (result) {
                    newValue = result[0]
                    preValue = result[0]
                } else {
                    if (curValue.length === 0) {
                        newValue = ''
                        preValue = ''
                    } else {
                        newValue = preValue
                    }
                }
                if (newValue !== curValue) {
                    _input.value = newValue
                    _input.dispatchEvent(new Event('compositionend'))
                    _input.dispatchEvent(new Event('input'))
                }
            })
            _input.addEventListener('change', function(e) {
                let curValue = _input.value
                let newValue = curValue
                if (Number(curValue) > max) {
                    newValue = max.toString()
                }
                if (Number(curValue) < min) {
                    newValue = min.toString()
                }
                if (fillin) {
                    let hasPoint = newValue.includes('.')
                    if (newValue === '') {
                        newValue = ''
                    } else {
                        if (!hasPoint) {
                            newValue += `${newValue === '-' ? '0' : ''}.${'0'.repeat(decimal)}`
                        } else {
                            let len = newValue.split('.')[1].length
                            newValue += `${'0'.repeat(decimal - len)}`
                        }
                    }
                } else {
                    let hasPoint = newValue.includes('.')
                    if (hasPoint && !newValue.split('.')[1].length) {
                        newValue = newValue.split('.')[0]
                    }
                }
                if (newValue !== curValue) {
                    _input.value = newValue
                    _input.dispatchEvent(new Event('compositionend'))
                    _input.dispatchEvent(new Event('input'))
                }
            })
        },
        formate(el, binding) {
            const input$ = el.getElementsByTagName('input')[0]
            const param = binding.value || {}
            const onInput = () => {
                const valuePrev = input$.value
                const valueNext = compare(
                    param,
                    goldChange(input$.value, param.decimalPlaces || 2)
                )
                console.log(valuePrev, valueNext)
                if (valueNext !== valuePrev) {
                    input$.value = valueNext
                    input$.dispatchEvent(new Event('compositionend'))
                    input$.dispatchEvent(new Event('input'))
                }
            }
            const onChange = () => {
                const valuePrev = input$.value
                const valueNext = compare(
                    param,
                    goldBlur(input$.value, param.includeZero)
                )
                if (valueNext !== valuePrev) {
                    input$.value = valueNext
                    input$.dispatchEvent(new Event('compositionend'))
                    input$.dispatchEvent(new Event('input'))
                }
            }
            input$.addEventListener('input', onInput)
            input$.addEventListener('change', onChange)

            function goldChange(v, decimalPlaces = 2) {
                let newValue = v.toString()
                let decimalPlacesReg = '^(-)*(\\d+)\\.('
                for (let index = 0; index < decimalPlaces; index++) {
                    decimalPlacesReg += '\\d'
                }
                decimalPlacesReg += ').*$'
                decimalPlacesReg = new RegExp(decimalPlacesReg)
                newValue = v
                    .replace(/[^\d.]/g, '')
                    .replace(/\.{2,}/g, '.')
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')
                    .replace(decimalPlacesReg, '$1$2.$3')
                    .replace(/[-|+]/g, '')
                if (
                    newValue.length > 1 &&
                    newValue.indexOf('.') !== 1 &&
                    newValue.indexOf('0') === 0
                ) {
                    newValue = newValue.toString().substring(1)
                }

                return newValue
            }
            function goldBlur(v, includeZero) {
                let nv = v.replace(/\.$/, '')
                if (!includeZero) {
                    return nv
                } else {
                    if (nv.indexOf('.') === -1) {
                        return nv + '.00'
                    } else {
                        return nv.split('.')[1].length === 1 ? nv + '0' : nv
                    }
                }
            }
            function compare(param, value) {
                let result = value
                if (!isNull(param.max) && compareMax(value, param.max)) {
                    if (param.compareLength) {
                        result = generateValue(value, param.max)
                    } else {
                        result = param.max
                    }
                } else if (!isNull(param.min) && compareMin(value, param.min)) {
                    result = param.min
                }
                return result
            }
            function generateValue(value, maxValue) {
                const _origin = parseInt(value).toString()
                const maxLength = maxValue.toString().length
                if (_origin.length > maxLength) {
                    return _origin.substr(0, maxLength)
                }
                return _origin
            }
            function compareMax(origin, dest) {
                const _origin = parseInt(origin)
                return _origin >= dest
            }
            function compareMin(origin, dest) {
                const _origin = parseInt(origin)
                return _origin <= dest
            }
            function isNull(val) {
                return val === undefined || val === null
            }
        }
    },
    methods: {
        checkReg(v) {
            let reg = /^(?:(0)(\.\d{0,6})?|([1-9]\d{0,4})(\.\d{0,6})?)$/
            let nv = ''
            let result = reg.exec(v)
            if (!v.length) {
                nv = ''
            } else if (v.length && !result) {
                nv = this.pre
            } else {
                nv = result[0]
            }
            this.val = this.pre = nv
        },
        dateChange(v) {
            console.log(v, this.flag)
            if (!this.flag) {
                let end = new Date(this.value2[1])
                let month = end.getMonth() + 1
                let year = end.getFullYear()
                let isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))
                let monthArr = [31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
                let endDate = monthArr[month - 1]
                end.setDate(endDate)
                this.$set(this.value2, 1, `${year}-${month > 9 ? month : '0' + month}-${endDate > 9 ? endDate : '0' + endDate} 23:59:59`)
            }
            this.flag = false
        },
        setModel() {
            this.startMonth = '2020-12-10 23:12:11'
            this.endMonth = '2021-02-10 07:02:01'
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
    }
}
</script>
<style lang="scss" scoped>
</style>
