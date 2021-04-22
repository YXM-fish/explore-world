<template>
    <div>
        <ul class="radiobox">
            <li
                v-for="(item, index) in items"
                :key="index"
                :class="{ active: item[valKey] === value }"
                @click="checked(item)"
            >{{item[labelKey]}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SlRadioBox',
    props: {
        value: {
            type: [String, Number, Boolean],
            required: false,
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
    mounted() {
        this.initData()
    },
    data() {
        return {
            items: []
        }
    },
    methods: {
        initData() {
            this.items = []
            if (this.options) {
                this.items = this.options.map(item => {
                    if (typeof item === 'object') {
                        return item
                    } else {
                        let obj = {}
                        this.$set(obj, this.labelKey, item)
                        this.$set(obj, this.valKey, item)
                        return obj
                    }
                })
                if (this.showAll && !this.items.find(item => item[this.labelKey] === '全部')) {
                    this.items.unshift({
                        [this.labelKey]: '全部',
                        [this.valKey]: ''
                    })
                }
            }
        },
        checked(item) {
            this.$emit('input', item[this.valKey])
            this.$emit('change', item, item[this.labelKey])
        }
    },
    components: {},
    watch: {
        options() {
            this.initData()
        },
        value(val) {
            this.value = val
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
        margin: 0px 15px 0px 0px;
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
    content: "";
    clear: both;
    display: table;
}
</style>
