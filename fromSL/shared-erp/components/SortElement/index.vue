<template>
    <div class="sore-wrap">
        <template v-for="item in sortOpt">
            <a v-if="item.isShow ? item.isShow(item) : true" :key="item.value"
                :class="item.checked ?  'primary' : 'text'" @click="handleSore(item)">
                {{item.label}}
                <template v-if="item.checked && currentOrderDirect === 'asc'">
                    <i class="el-icon-caret-top el-icon--right"></i>
                </template>
                <template v-if="item.checked && currentOrderDirect === 'desc'">
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </template>
            </a>
        </template>
    </div>
</template>

<script>
export default {
    name: 'SlSortElement',
    props: {
        sortOpt: {
            type: Array,
            required: true
        },
        defaultSort: {
            type: String,
            required: false,
            default: ''
        },
        orderDirect: {
            type: String,
            required: false,
            default: 'desc'
        }
    },
    data() {
        return {
            currentOrderDirect: this.orderDirect
        }
    },
    methods: {
        handleSore(item) {
            if (!item.checked) {
                this.currentOrderDirect = this.orderDirect
            } else {
                this.currentOrderDirect =
                    this.currentOrderDirect === 'desc' ? 'asc' : 'desc'
            }
            this.sortOpt.map((item) => {
                item.checked = false
            })
            item.checked = true
            this.$emit('handleClick', item.value, this.currentOrderDirect)
        },
        handleDefaultSort() {
            this.currentOrderDirect = this.orderDirect
            this.sortOpt.map((item) => {
                item.checked = false
                if (item.value === this.defaultSort) {
                    item.checked = true
                }
            })
        }
    },
    components: {},
    watch: {
        orderDirect(val) {
            this.currentOrderDirect = val
        }
    }
}
</script>
<style lang="scss" scoped>
.primary {
    background-color: #449dfc;
    color: white;
    border-radius: 2px;
}
.text {
    background-color: none;
    border-radius: 2px;
}
.sore-wrap {
    a {
        min-width: 100px;
        padding: 0 10px;
        display: inline-block;
        text-align: center;
    }
}
</style>
