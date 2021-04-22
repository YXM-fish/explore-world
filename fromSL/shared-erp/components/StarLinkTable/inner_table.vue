<template>
    <div>
        <table class="innerTable">
            <thead>
                <tr>
                    <th v-for="name in columns" :key="name" style="color: #666;">
                        <template v-if="name == '自动下架日期'">
                            {{name}}
                            <el-popover popper-class="tinymce-popper" style="font-size: 12px;" placement="bottom"
                                title="提示" width="420" :close-delay="0" trigger="hover">
                                <div>
                                    <p>1、当日23:59自动下架。</p>
                                    <p style="margin: 8px 0">2、此处为采购设置了商品停售时间而导致的自动下架。下架后你将无法再手动上架，如果需要再次上架请联系采购。</p>
                                </div>
                                <i slot="reference" class="el-icon-question"
                                    style="font-size: 20px; cursor: pointer; vertical-align: top;"></i>
                            </el-popover>
                        </template>
                        <template v-else-if="name == '自动停售日期'">
                            {{name}}
                            <el-popover popper-class="tinymce-popper" style="font-size: 12px;" placement="bottom"
                                title="提示" width="420" :close-delay="0" trigger="hover">
                                <div>
                                    <p>1、当日23:59自动停售。对应SKU的库存将更改为无货或0，商城将显示为SOLD OUT。</p>
                                    <p style="margin: 8px 0">2、此处为采购设置了商品停售时间而导致的SOLD
                                        OUT。你将无法再手动更改为有货或大于0，如果需要继续售卖请联系采购。</p>
                                </div>
                                <i slot="reference" class="el-icon-question"
                                    style="font-size: 20px; cursor: pointer; vertical-align: top;"></i>
                            </el-popover>
                        </template>
                        <div v-else v-html="name"></div>
                    </th>
                </tr>
            </thead>
            <tbody v-if="dataRows.length > 0">
                <tr v-for="(item, rowIndex) in dataRows" :key="rowIndex" v-show="item.show">
                    <td v-for="(opt, colIndex) in item.row" :key="colIndex">
                        <template v-if="Object.prototype.toString.call(opt) =='[object Object]'">
                            <template v-if="opt.slotName || slotName">
                                <slot :name="opt.slotName || slotName" v-bind:item="opt"></slot>
                            </template>
                            <div v-else v-html="opt.val" :title="opt.val" :style="opt.style ? opt.style : ''"></div>
                        </template>
                        <div v-else v-html="opt"></div>
                    </td>
                </tr>
                <tr v-if="dataRows.length > showMaxRows">
                    <td :colspan="columns.length"><a @click.stop="showMore">{{showMoreBtnText}}</a>
                        [{{dataRows.length}}]</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const SHOW_MAX = 4
export default {
    name: 'SlInnerTable',
    props: {
        tdStyle: String,
        columns: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        rows: {
            type: Array,
            required: true
        },
        showOverOne: {
            type: Boolean,
            required: false,
            default: true
        },
        slotName: {
            type: String,
            required: false
        }
    },
    mounted() {
        this.refreshData()
    },
    data() {
        let max = this.showOverOne ? SHOW_MAX + 1 : SHOW_MAX
        return {
            dataRows: [],
            showMaxRows: max
        }
    },
    computed: {
        showMoreBtnText() {
            let items = this.dataRows.filter((item) => item.show)
            return items.length === SHOW_MAX ? '显示更多' : '隐藏'
        }
    },
    methods: {
        refreshData() {
            this.dataRows = []
            this.rows.forEach((item, index) => {
                if (this.showOverOne && this.rows.length == this.showMaxRows) {
                    this.dataRows.push({
                        show: true,
                        row: item
                    })
                    return
                }
                if (index < SHOW_MAX) {
                    this.dataRows.push({
                        show: true,
                        row: item
                    })
                } else {
                    this.dataRows.push({
                        show: false,
                        row: item
                    })
                }
            })
        },
        showMore() {
            let items = this.dataRows.filter((item) => item.show)
            if (items.length === SHOW_MAX) {
                this.dataRows.forEach((item) => (item.show = true))
            } else {
                this.dataRows.forEach((item, index) => {
                    if (index < SHOW_MAX) {
                        item.show = true
                    } else {
                        item.show = false
                    }
                })
            }
        }
    },
    watch: {
        rows(val) {
            this.rows = val
            this.refreshData()
        },
        showOverOne(val) {
            this.showMaxRows = val ? SHOW_MAX + 1 : SHOW_MAX
        }
    }
}
</script>
<style lang="scss" scoped>
table {
    width: 100%;
    label {
        color: #a4a7ab;
        &::after {
            content: ': ';
        }
    }
    .label {
        color: #0c0c0c;
    }
    td {
        padding: 5px 8px;
        text-align: left;
        border: none;
        a {
            color: #1592f1;
            text-decoration: underline;
        }
    }
}
</style>
