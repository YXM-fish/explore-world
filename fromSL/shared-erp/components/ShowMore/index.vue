<template>
    <div class="align">
        <p v-for="(item, index) in filterList()" :key="index">
            {{returnItemText(item)}}
        </p>
        <p v-if="showMore" class="show-more">
            <a class="show-text" @click="toggleClick">{{showAll ? '隐藏' : '显示更多'}}</a>
            ({{list.length}})
        </p>
    </div>
</template>

<script>
export default {
    name: 'SlShowMore',
    props: {
        field: {
            type: String
        },
        list: {
            type: Array,
            default: () => []
        },
        limit: {
            type: Number,
            default: 10
        }
    },
    computed: {
        showMore() {
            return this.list.length > this.limit
        }
    },
    data() {
        return {
            showAll: false // 全部展示
        }
    },
    methods: {
        // 如果需要，可以考虑传入解析模板进来
        returnItemText(item) {
            let result = ''
            if (typeof item === 'string') {
                result = item
            } else if (
                Object.prototype.toString.call(item) === '[object Object]'
            ) {
                result = item[this.field] || 'field undefined'
            }
            return result
        },
        filterList() {
            const list = this.list || []
            if (!(this.showMore || list.length)) {
                return list
            }
            return this.showAll ? list : list.slice(0, this.limit)
        },
        toggleClick() {
            this.showAll = !this.showAll
            this.filterList()
        }
    }
}
</script>

<style lang="scss" scoped>
.align {
    text-align: left;
}
.show-more {
    text-align: right;
    .show-text {
        color: #1592f1;
        font-size: 13px;
        text-decoration: underline;
    }
}
</style>
