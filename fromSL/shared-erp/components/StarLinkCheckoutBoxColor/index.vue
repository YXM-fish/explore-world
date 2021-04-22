<template>
    <div class="checkoutbox" :class="isShowAll?'hidde':'show'" ref="checkoutbox">
        <ul class="radiobox" ref="ul">
            <li v-if="showAll" :class="{active: value == ''}" @click="allChecked({value: ''})">全部</li>
            <li v-if="isShowMulti">
                <el-checkbox v-model="isMulti">多选</el-checkbox>
            </li>
            <li :style="{background:item.checked?item.color:'#ffffff','text-decoration':item.status?'line-through':'blink'}"
                v-for="(item, index) in items" :key="index" :class="{active: item.checked}" @click="checked(item)">
                {{item.label}}</li>
        </ul>
        <div v-if="isMore" class="show-more">
            <a class="show-text" @click="toggleClick">{{isShowAll ? '更多' : '隐藏'}} </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SlCheckoutBoxColor',
    props: {
        value: {
            type: [String, Number],
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
        SingleSelection: {
            type: Boolean,
            default: true
        },
        showMore: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.initData()
        this.$nextTick(() => {
            this.maxWidth =
                this.$refs.checkoutbox && this.$refs.checkoutbox.clientWidth
        })
    },
    data() {
        return {
            isMulti: this.SingleSelection,
            items: [],
            values: [],
            maxWidth: 0,
            totalMaxWidth: 0,
            isShowAll: this.showMore // 展开全部
        }
    },
    computed: {
        isMore() {
            return this.showMore && this.maxWidth < this.totalMaxWidth
        }
    },
    methods: {
        toggleClick() {
            this.isShowAll = !this.isShowAll
        },
        initData() {
            this.items = []
            if (this.options) {
                for (let item of this.options) {
                    if (item === null) continue
                    if (typeof item === 'object') {
                        if (item.checked === undefined) {
                            item.checked = this.values.includes(item.value)
                        }
                        this.items.push(Object.assign({}, item))
                    } else {
                        this.items.push({
                            label: item,
                            value: item,
                            checked: item === this.value
                        })
                    }
                }
            }
        },
        allChecked(item) {
            this.items.forEach((opt) => (opt.checked = false))
            this.$emit('input', '')
            this.$emit('change', item)
        },
        checked(item) {
            if (!this.isMulti) {
                this.items.forEach((opt) => (opt.checked = false))
                item.checked = true
                this.$emit('input', item.value)
                this.$emit('change', item)
                return
            }
            item.checked = !item.checked
            this.values = []
            this.items.map((item) => {
                if (item.checked) {
                    this.values.push(item.value)
                }
            })
            this.$emit('input', this.values.join())
            this.$emit('change', item)
        }
    },

    components: {},
    watch: {
        items() {
            this.$nextTick(() => {
                let slidList = this.$refs.ul.children
                for (var i = 0; i < slidList.length; i++) {
                    let li = slidList[i]
                    if (li.clientWidth > 0) {
                        this.totalMaxWidth += li.clientWidth
                    }
                }
            })
        },
        options() {
            this.initData()
        },
        value(val) {
            if (val === '') {
                this.items.forEach((opt) => {
                    if (opt.value === val) {
                        opt.checked = true
                    } else {
                        opt.checked = false
                    }
                })
            } else {
                this.items.forEach((opt) => (opt.checked = false))
                this.values = String(val).split(',')
                this.values.map((item) => {
                    this.items.forEach((opt) => {
                        if (opt.value == item) {
                            opt.checked = true
                        }
                    })
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.show {
    height: auto;
}
.hidde {
    height: 30px;
    overflow: hidden;
}
.checkoutbox {
    display: flex;
    .radiobox {
        flex: 1;
    }
    .show-more {
        width: 50px;
        .show-text {
            color: #449dfc;
        }
    }
}
ul.radiobox {
    margin: 0px;
    padding: 0px;
    list-style: none;
    li {
        float: left;
        text-align: center;
        padding: 0px 10px;
        color: #333;
        margin: 0px 15px 5px 0px;
        border-radius: 2px;
        line-height: 30px;
        cursor: pointer;
        &:hover {
            color: blue;
        }
    }
    li.active {
        color: white;
        background: #449dfc;
    }
}

ul.radiobox::after {
    content: '';
    clear: both;
    display: table;
}
</style>