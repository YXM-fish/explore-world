<template>
    <div>
        <ul class="radiobox">
            <li v-if="showAll" :class="{active: value == ''}" @click="allChecked({value: ''})">全部</li>
            <li v-if="isShowMulti && options.length > 1">
                <el-checkbox v-model="isMulti">多选</el-checkbox>
            </li>
            <li v-for="(item, index) in options" :key="index" :class="{'active': isChecked(item[valKey])}"
                @click="checked(item)">{{item[labelKey]}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SlCheckoutBox',
    props: {
        value: {
            type: [String, Number, Array],
            required: true,
            default: ''
        },
        options: {
            type: Array,
            default: undefined
        },
        showAll: {
            type: Boolean,
            default: true
        },
        isShowMulti: {
            type: Boolean,
            default: true
        },
        valKey: {
            type: String,
            default: 'value',
            required: false
        },
        labelKey: {
            type: String,
            default: 'label',
            required: false
        }
    },
    computed: {
        isChecked() {
            return (value) =>
                this.isMulti
                    ? this.values.includes(value)
                    : this.value === value
        }
    },
    mounted() {
        // this.initData()
    },
    data() {
        return {
            isMulti: true,
            items: [],
            values: []
        }
    },
    methods: {
        allChecked(item) {
            this.values = []
            this.$emit('input', '')
            this.$emit('change', item)
        },
        checked(item) {
            let value = String(item[this.valKey])
            if (!this.isMulti) {
                this.$emit('input', value)
                this.$emit('change', item)
                return
            }
            let index = this.values.findIndex((ele) => value === ele)
            if (index > -1) {
                this.values.splice(index, 1)
            } else {
                this.values.push(value)
            }
            this.$emit('input', this.values.join())
            this.$emit('change', item)
        }
    },
    components: {},
    watch: {
        options() {
            this.values = []
        },
        value(val) {
            if (val) {
                this.values = String(val).split(',')
            } else {
                this.values = []
            }
        }
    }
}
</script>
<style lang="scss" scoped>
ul.radiobox {
    margin: 0px;
    padding: 0px;
    list-style: none;
    li {
        float: left;
        text-align: center;
        padding: 0px 10px;
        margin: 0px 15px 5px 0px;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
            color: blue;
        }
    }
    li.active {
        background-color: #449dfc;
        color: white;
    }
}
ul.radiobox::after {
    content: '';
    clear: both;
    display: table;
}
</style>
