<template>
    <div class="merge-warp">
        <sl-loading :showLoad="showLoad"></sl-loading>
        <pagination v-if="showPager && showPagerOnTop" :showAllData="showAllData" :pageInfo="pageInfo"
            @change="pagechange" :pageSizes="pageSizes" @handleAllPage="handleAllPage" :allPageChecked="allPageChecked">
        </pagination>
        <table :class="className">
            <thead>
                <tr>
                    <th v-if="!isMergeOrder">
                        <el-checkbox class="group-checkout" @change="handleCheckAllChange(checkedAll)"
                            v-model="checkedAll"></el-checkbox>
                    </th>
                    <th v-else :style="{'display':pageInfo.total && pageInfo.total>0?'block':'none'}"
                        style="width: 53px; border-right: none;border-bottom: none;">
                        <p>选择组</p>
                        <el-checkbox class="group-checkout" @change="handleCheckAllChange(checkedAll)"
                            v-model="checkedAll"></el-checkbox>
                    </th>
                    <th v-if="!isMergeOrder" style="width: 200px;">
                        <el-checkbox @change="handleCheckAllChange(checkedAll)" v-model="checkedAll"></el-checkbox>
                    </th>
                    <th v-else style="width: 50px;">
                        <el-checkbox v-if="secondAll" @change="handleCheckAllChange(checkedAll)" v-model="checkedAll">
                        </el-checkbox>
                        <span>选择订单</span>
                    </th>
                    <template v-for="(item,index) in columns">
                        <th v-if="item.noShow ? item.noShow() : true" @click="order(item)" v-bind:key="index"
                            :width="item.width">
                            {{item.title}}
                            <span class="wrapper">
                                <i v-if="item.sortable"
                                    :class="{'fa fa-sort-desc': true, 'isDesc': orderBy == item.name && orderDirect === 'desc' }" />
                                <i v-if="item.sortable"
                                    :class="{'fa fa-sort-up': true, 'isAsc': orderBy == item.name && orderDirect === 'asc' }" />
                            </span>
                        </th>
                    </template>
                    <th v-if="operations != null && operations.length > 0">操作</th>
                </tr>
            </thead>
            <tbody>
                <template v-if="rows.length === 0 && !showLoad">
                    <tr>
                        <td :colspan="colspan" style="padding-bottom: 30px;">
                            <div class="el-table__empty-block">
                                <span class="el-table__empty-text">暂无数据</span>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <template v-for="itemList in rows">
                        <template v-for="(row, index) in itemList.virtualOrderListResponses">
                            <tr v-bind:key="row.id" :class="{selected: itemList.checked, canSelect: canRowSelect}">
                                <td :rowspan="itemList.virtualOrderListResponses.length * 2" v-if="index === 0"
                                    style="vertical-align: middle;border-right: solid 1px #caccd0">
                                    <el-checkbox class="group-checkout"
                                        @change="handleCheckedGroupChange(itemList.checked, itemList)"
                                        v-model="itemList.checked" :label="itemList.unionGroupId"></el-checkbox>
                                </td>
                                <td style="width: 50px;padding:7px 18px;" :rowspan="2" v-if="canSelect">
                                    <el-checkbox @change="checkRow(row.checked, row, itemList)" v-model="row.checked">
                                    </el-checkbox>
                                </td>
                                <template v-for="(col, ci) in columns">
                                    <td :rowspan="col.name != 'orderDetail' ? 2 : 1"
                                        v-if="col.noShow ? col.noShow() : true"
                                        :class="col.class ? col.class : col.type" :key="ci"
                                        :style="col.style ? col.style : ''">
                                        <template
                                            v-if="col.type !=='image' && col.type !=='template' && col.type !== 'table' && col.type !== 'component'">{{formatColVal(row, col)}}</template>
                                        <template v-else-if="col.type =='image'">
                                            <img :src="buildImageUrl(row, col)" v-if="row[col.name]"
                                                style="cursor:pointer" @click.stop="showImage(row, col)" />
                                        </template>
                                        <template v-else-if="col.type =='template'">
                                            <div v-html="col.fun(row)" />
                                        </template>
                                        <template v-else-if="col.type =='table'">
                                            <InnerTable :columns="col.columns" :rows="col.fun(row)" :link="col.link">
                                            </InnerTable>
                                        </template>
                                        <template v-else-if="col.type =='component'">
                                            <v-runtime-template :template="col.fun(row)"></v-runtime-template>
                                        </template>
                                    </td>
                                </template>
                                <td :rowspan="2" v-if="operations != null && operations.length > 0"
                                    class="vtbOperations">
                                    <template v-for="opt in operations">
                                        <p v-bind:key="opt.title" v-if="opt.isShow === undefined || opt.isShow(row)">
                                            <a
                                                @click.stop="opt.callback(row, itemList.virtualOrderListResponses, index)">{{opt.title}}</a>
                                        </p>
                                    </template>
                                </td>
                            </tr>
                            <tr v-bind:key="row.id+'_tr'">
                                <td :style="rowHeaderInfo.style">
                                    <v-runtime-template :template="rowHeaderInfo.fun(row)"></v-runtime-template>
                                </td>
                            </tr>
                        </template>
                    </template>
                </template>
            </tbody>
        </table>
        <pagination v-if="showPager" :pageInfo="pageInfo" @change="pagechange" :pageSizes="pageSizes"></pagination>
        <div class="backToTop" v-if="isFloatOpt && showBackTop" @click="backToTop" title="回到顶部">
            <i class="el-icon-arrow-up" />
        </div>
    </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import Pagination from './vue-pagination'
import InnerTable from './inner_table'
import HTTP from 'utils/fetch'
import SlLoading from 'components/Loading/index'
const IMAGE_VIEW_SUFFIX = '?imageView2/1/w/80/h/80'
export default {
    name: 'SlMergeTable',
    components: {
        Pagination,
        InnerTable,
        VRuntimeTemplate,
        SlLoading
    },
    props: {
        immediate: {
            type: Boolean,
            default: true
        },
        columns: {
            type: Array,
            required: true
        },
        rowsList: {
            type: Array,
            required: false
        },
        fetchUrl: {
            type: String,
            required: true
        },
        params: {
            type: Object,
            required: false
        },
        rowHeaderInfo: {
            type: Object,
            required: false
        },
        className: {
            type: String,
            required: false,
            default: 'table is-striped starlinkTable'
        },
        showPager: {
            type: Boolean,
            required: false
        },
        showPagerOnTop: {
            type: Boolean,
            required: false,
            default: false
        },
        secondAll: {
            type: Boolean,
            required: false,
            default: true
        },
        isMergeOrder: {
            type: Boolean,
            required: false,
            default: false
        },
        operations: {
            type: Array,
            required: false
        },
        isFloatOpt: {
            type: Boolean,
            required: false,
            default: true
        },
        canSelect: {
            type: Boolean,
            required: false
        },
        canRowSelect: {
            type: Boolean,
            required: false,
            default: false
        },
        selectMode: {
            type: String,
            required: false,
            default: 'MULTIPLE'
        },
        selectedItems: {
            type: Array,
            required: false
        },
        pageSizes: {
            type: Array,
            required: false,
            default: function () {
                return [10, 20, 50, 100, 200]
            }
        },
        showAllData: {
            type: Boolean,
            required: false,
            default: false
        },
        allPageChecked: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            showBackTop: false,
            rows: this.rowsList || [],
            orderBy: '',
            orderDirect: '',
            pageInfo: {},
            showLoad: false,
            checkedAll: false,
            unionGroupIds: [],
            headerColspan: 0
        }
    },
    created() {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    mounted() {
        this.immediate && this.loadData()
    },
    methods: {
        loadData(queryParams) {
            if (this.fetchUrl) {
                this.showLoad = true
                const params = {
                    ...this.params,
                    ...queryParams
                }
                HTTP.get(this.fetchUrl, {
                    params
                })
                    .then((dt) => {
                        this.showLoad = false
                        this.rows = dt.data.list
                        this.rows.forEach((item) => {
                            this.$set(item, 'checked', false)
                            item.virtualOrderListResponses.forEach((ele) => {
                                this.$set(ele, 'checked', false)
                            })
                        })
                        this.pageInfo = {
                            total: dt.data.total,
                            current: dt.data.pageNum || dt.data.number + 1,
                            pagenum: dt.data.pageSize || dt.data.size,
                            page: dt.data.pages || dt.data.totalPages,
                            pagegroup: 8,
                            skin: '#00D1B2'
                        }
                        if (this.canMultipleSel) {
                            this.checkedAll = false
                        }
                        this.$emit('onDataLoadCompeleted', dt.data)
                    })
                    .catch(() => {
                        this.showLoad = false
                    })
            } else {
                this.rows = []
            }
        },
        order(col) {
            if (!col.sortable) {
                return
            }
            let colname = col.name
            let direct = 'asc'
            if (colname === this.orderBy && this.orderDirect === 'asc') {
                direct = 'desc'
            }
            this.params.orderBy = colname
            this.params.orderDirect = direct
            this.loadData()
            this.$emit('onDataChange')
        },
        backToTop() {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        handleScroll() {
            let scrollHeight =
                document.body.scrollTop || document.documentElement.scrollTop
            if (scrollHeight > 300) {
                this.showBackTop = true
            } else {
                this.showBackTop = false
            }
        },
        handleAllPage(checkAll) {
            this.$emit('handleCheckAll', checkAll)
        },
        formatColVal(row, col) {
            if (col.type) {
                switch (col.type) {
                    case 'function':
                        return col.fun(row)
                        break
                }
            } else {
                return row[col.name]
            }
        },
        pagechange(pageInfo) {
            let { pageIndex, pageSize } = pageInfo
            this.pageInfo.pagenum = pageSize
            let params = {
                pageIndex,
                pageSize
            }
            this.loadData(params)
        },
        handleCheckAllChange(checked) {
            this.selectedItems.splice(0, this.selectedItems.length)
            this.rows.forEach((item) => {
                this.$set(item, 'checked', checked)
                const ids = item.virtualOrderListResponses.map((ele) => {
                    this.$set(ele, 'checked', checked)
                    return ele.id
                })
                if (checked) {
                    this.selectedItems.push({
                        unionGroupId: item.unionGroupId,
                        virtualOrderIds: ids
                    })
                }
            })
        },
        singleCheck() {
            if (this.selectMode === 'SINGLE') {
                this.rows.forEach((item) => {
                    item.checked = false
                    item.virtualOrderListResponses.map((ele) => {
                        ele.checked = false
                    })
                })
            }
        },
        handleCheckedGroupChange(checked, val) {
            val.virtualOrderListResponses = val.virtualOrderListResponses.map(
                (ele) => {
                    this.$set(ele, 'checked', checked)
                    return ele
                }
            )
            if (checked) {
                const ids = val.virtualOrderListResponses.map((ele) => {
                    return ele.id
                })
                this.selectedItems.push({
                    unionGroupId: val.unionGroupId,
                    virtualOrderIds: ids
                })
            } else {
                this.checkedAll = false
                this.selectedItems.map((item, index) => {
                    if (item.unionGroupId == val.unionGroupId) {
                        this.selectedItems.splice(index, 1)
                    }
                })
            }
        },
        checkRow(checked, row, itemList) {
            const checkedAll = itemList.virtualOrderListResponses.every(
                (item) => {
                    return item.checked
                }
            )
            this.$set(itemList, 'checked', checkedAll)
            if (checked) {
                const isExistence = this.selectedItems.some((item) => {
                    return item.unionGroupId === itemList.unionGroupId
                })
                if (isExistence) {
                    this.selectedItems.map((item) => {
                        if (item.unionGroupId === itemList.unionGroupId) {
                            item.virtualOrderIds.push(row.id)
                        }
                    })
                } else {
                    this.selectedItems.push({
                        unionGroupId: itemList.unionGroupId,
                        virtualOrderIds: [row.id]
                    })
                }
            } else {
                this.selectedItems.map((item) => {
                    if (item.unionGroupId === itemList.unionGroupId) {
                        item.virtualOrderIds.map((ele, index) => {
                            if (ele.id === row.id) {
                                item.virtualOrderIds.splice(index, 1)
                            }
                        })
                    }
                })
            }
        },
        buildImageUrl(row, col) {
            if (row[col.name].source.match('myqcloud.com')) {
                return `${row[col.name].source}${IMAGE_VIEW_SUFFIX}`
            } else {
                return `${row[col.name].source}`
            }
        },
        showImage(row, col) {
            let url = this.buildImageUrl(row, col)
            url = url.replace(IMAGE_VIEW_SUFFIX, '')
            window.open(url)
        },
        getRows() {
            return JSON.parse(JSON.stringify(this.rows))
        },
        showIndexNumber(rindex) {
            if (this.pageInfo) {
                return (
                    this.pageInfo.pagenum * (this.pageInfo.current - 1) +
                    rindex +
                    1
                )
            } else {
                return rindex + 1
            }
        },
        sendEvent(eventName, args) {
            if (eventName) {
                this.$emit(eventName, args)
            }
        }
    },
    computed: {
        colspan() {
            let colspan = this.columns.length
            this.headerColspan = colspan
            if (this.canSelect) {
                colspan += 2
            }
            if (this.operations.length !== 0) {
                colspan++
                this.headerColspan++
            }
            return colspan
        }
    },
    watch: {
        fetchUrl() {
            this.loadData()
            this.$emit('onDataChange')
        }
    }
}
</script>

<style lang="scss" scoped>
$blue: #409eff;
table {
    width: 100%;
}
table th:hover {
    cursor: pointer;
}
table th .wrapper {
    position: relative;
    margin-left: 5px;
    height: 30px;
}
table th .wrapper > .fa-sort-desc {
    position: absolute;
    bottom: 3px;
    left: 0px;
}
table th .wrapper > .fa-sort-up {
    position: absolute;
    top: 3px;
    left: 0px;
}
table th > span > i {
    color: silver;
}
table td,
th {
    padding: 7px 5px;
    text-align: center;
}
table td.holder {
    text-align: left;
}
table td.attention {
    font-size: 13px;
}
table td.attention > a {
    color: grey;
}
table td.attention > a:hover {
    color: red;
}
table td.amount,
td.numeric,
td.buy,
td.sold {
    text-align: right;
}
td.image {
    img {
        height: 80px;
        width: 80px;
    }
}
table td.vtbOperations {
    > span {
        padding: 0px 5px;
    }
    a {
        color: #1592f1;
    }
}
.fa {
    font-size: 14px;
    cursor: pointer;
}
.fa-heart {
    color: #ec3b3f;
    &:hover {
        color: grey;
    }
}
.fa-heart-o {
    &:hover {
        font-size: 16px;
        color: #ec3b3f;
    }
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
    // border-top: solid 1px #f1eded;
    border: solid 1px #caccd0;
}
.table > tbody > tr.selected {
    background-color: #f5eee6;
}
.table > tbody > tr.canSelect {
    cursor: pointer;
}
.isDesc,
.isAsc {
    color: blue;
}
</style>

<style lang="scss">
table td.template,
td.component {
    p {
        text-align: left;
        color: black;
    }
    label {
        color: #a4a7ab;
    }
    div > table {
        width: 100%;
        height: 100%;
        border-collapse: collapse;
        td,
        th {
            padding: 5px;
            border: solid 1px #e2dddd;
            label::after {
                content: '：';
            }
        }
        th {
            color: #565454;
        }
    }
}
.merge-warp {
    .el-checkbox__label {
        display: none;
    }
    .group-checkout {
        .el-checkbox__input.is-checked .el-checkbox__inner {
            border: 1px solid #f50707;
            background-color: #f50707;
        }
        .el-checkbox__inner {
            border: 1px solid #f50707;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border: 1px solid #f50707;
        }
        .el-checkbox__input.is-focus .el-checkbox__inner {
            border: 1px solid #f50707;
        }
    }
}
</style>
