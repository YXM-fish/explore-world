<template>
    <div class="sl-table-wrap">
        <sl-loading :showLoad="showLoad"></sl-loading>
        <div class="top-panel">
            <div class="tools">
                <slot name="tools"></slot>
            </div>
            <div class="pagination">
                <SlPagination v-if="showPager && showPagerOnTop" :pageInfo="pageInfo" @change="pagechange"
                    :pageSizes="pageSizes" v-bind="$attrs"></SlPagination>
            </div>
        </div>
        <table :class="[{'table-border' : border}, className]">
            <thead>
                <tr>
                    <th v-if="isShowIndex && listIndex" style="min-width:40px;">{{numberTit}}</th>
                    <th v-if="canSelect" style="width: 50px;padding: 7px 18px">
                        <el-checkbox v-if="selectMode === 'MULTIPLE'" v-model="checkedAll" @change="checkAll()">
                        </el-checkbox>
                    </th>
                    <template v-for="(item,index) in columns">
                        <th v-if="item.noShow ? item.noShow() : true" @click="order(item)" v-bind:key="index"
                            :width="item.width" :style="item.thStyle ? item.thStyle : ''">
                            <template v-if="item.headerTemplate">
                                <v-runtime-template :template="item.headerTemplate()"></v-runtime-template>
                            </template>
                            <template v-else>{{item.title}}</template>
                        </th>
                    </template>
                    <th v-if="operations != null && operations.length > 0">
                        操作
                        <el-popover v-if="operationsPopover" popper-class="tinymce-popper"
                            style="font-size: 12px; vertical-align: middle;" placement="top" title="提示" width="320"
                            :close-delay="0" trigger="hover">
                            <div v-html="operationsPopover"></div>
                            <i slot="reference" class="el-icon-question"
                                style="font-size: 20px; cursor: pointer; vertical-align: middle; color: #000;"></i>
                        </el-popover>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-if="rows.length === 0 && !showLoad">
                    <tr>
                        <td :colspan="colspan" style="padding: 15px;">
                            <div class="el-table__empty-block">
                                <span class="el-table__empty-text">暂无数据</span>
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <template v-for="(row, rindex) in rows">
                        <tr @click.stop="selectedRow(row, rindex)"
                            :class="{ 'selected': isSelected(row), 'canSelect': canRowSelect}" :key="rindex">
                            <td :rowspan="oderTable ? 2 : 1" v-if="isShowIndex && listIndex">{{showIndexNumber(rindex)}}
                            </td>
                            <td style="width: 50px;padding:7px 18px;" :rowspan="oderTable ? 2 : 1" v-if="canSelect">
                                <el-checkbox v-if="selectMode == 'MULTIPLE'" v-model="row.checked"
                                    @change="checkRow(row)"></el-checkbox>
                                <el-radio v-else v-model="checkedRadio" :label="row[keyName]" @change="changeRadio">
                                </el-radio>
                            </td>
                            <template v-for="(col, ci) in columns">
                                <td :rowspan="oderTable && col.name != 'orderDetail' ? 2 : 1"
                                    v-if="col.noShow ? col.noShow() : true" :class="col.class ? col.class : col.type"
                                    v-bind:key="ci" :style="col.style ? col.style : ''">
                                    <template v-if="col.type =='image'">
                                        <div v-if="row[col.name]">
                                            <show-image :src="buildImageUrl(row, col)"></show-image>
                                        </div>
                                    </template>
                                    <template v-else-if="col.type =='innerRowTextArr'">
                                        <template v-if="col.supportComponent">
                                            <div v-for="(item, index) in col.fun(row).slice(0, col.maxShowRow)"
                                                @click.stop="col.onClick?col.onClick(row, rows,rindex, $event):''"
                                                :key="col.name + index" :class="[col.name, 'margin-bottom-8']">
                                                <v-runtime-template :template="item"></v-runtime-template>
                                            </div>
                                            <template v-if="rowsOfShowMore[rindex]">
                                                <div v-for="(item, index) in col.fun(row).slice(col.maxShowRow)"
                                                    @click.stop="col.onClick?col.onClick(row, rows,rindex, $event):''"
                                                    :key="col.name + '-more-' + index" class="margin-bottom-8">
                                                    <v-runtime-template :template="item"></v-runtime-template>
                                                </div>
                                            </template>
                                        </template>
                                        <template v-else>
                                            <div v-for="(item, index) in col.fun(row).slice(0, col.maxShowRow)"
                                                v-html="item" :key="col.name + index" class="margin-bottom-8"></div>
                                            <template v-if="rowsOfShowMore[rindex]">
                                                <div v-for="(item, index) in col.fun(row).slice(col.maxShowRow)"
                                                    v-html="item" :key="col.name + '-more-' + index"
                                                    class="margin-bottom-8"></div>
                                            </template>
                                        </template>

                                        <p v-if="col.fun(row).length > col.maxShowRow && col.triggerBtn"
                                            @click="triggerRowInnerShowMore(rindex)" class="margin-bottom-8">
                                            <span
                                                class="trigger-show-more-text">{{ rowsOfShowMore[rindex] | formatTriggerShowMore}}</span>
                                            &nbsp;[{{col.fun(row).slice(col.maxShowRow).length}}]
                                        </p>
                                    </template>

                                    <template v-else-if="col.type =='template'">
                                        <div v-html="col.fun(row)"
                                            @click.stop="col.onClick?col.onClick(row, rows,rindex, $event):''"></div>
                                    </template>
                                    <template v-else-if="col.type =='table'">
                                        <inner-table :columns="col.columns" :names="col.names ? col.names : []"
                                            :rows="col.fun(row)" :link="col.link"></inner-table>
                                    </template>
                                    <template v-else-if="col.type =='click'">
                                        <p v-for="opt in col.fun(row)" v-bind:key="opt.rindex" style="color: #448ACC;">
                                            <a @click.stop="opt.fun(opt, row, rindex)">{{opt.title}}</a>
                                        </p>
                                    </template>
                                    <template v-else-if="col.type =='component'">
                                        <div @click.stop="col.onClick?col.onClick(row, rows,rindex, $event):''">
                                            <v-runtime-template :template="col.fun(row)"></v-runtime-template>
                                        </div>
                                    </template>
                                    <template v-else-if="col.type == 'showMore'">
                                        <SlShowMore :list="col.fun(row)" :limit="col.limit || 10" :field="col.field" />
                                    </template>
                                    <template v-if="col.slotName">
                                        <slot :name="col.slotName" v-bind:row="row"></slot>
                                    </template>
                                    <template v-else>
                                        {{formatColVal(row, col)}}
                                    </template>
                                </td>
                            </template>

                            <td :rowspan="oderTable ? 2 : 1" v-if="operations != null && operations.length > 0"
                                class="vtbOperations" style="min-width: 55px;">

                                <template v-for="(opt,index) in operations">

                                    <p v-bind:key="index"
                                        v-if="opt.isShow === undefined || (typeof opt.isShow === 'function' && opt.isShow(row) ) "
                                        :style="opt.style ? opt.style : ''">
                                        <a @click.stop="opt.callback(row, rows, rindex, $event)"
                                            :style="opt.style ? opt.style : ''"
                                            :class="opt.class ? opt.class : []">{{opt.title}}</a>
                                    </p>

                                </template>
                            </td>
                        </tr>
                        <tr v-if="oderTable" :key="rindex+'_oderTable'">
                            <td v-if="isTemplate" :style="rowHeaderInfo.style">
                                <v-runtime-template :template="rowHeaderInfo.fun(row)"></v-runtime-template>
                            </td>
                            <td v-else>
                                <order-sku-detail :row="row" @sendEvent="sendEvent"></order-sku-detail>
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <SlPagination v-if="showPager" :pageInfo="pageInfo" @change="pagechange" :pageSizes="pageSizes" v-bind="$attrs">
        </SlPagination>
    </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import InnerTable from './inner_table'
import ShowImage from './show_image'
import HTTP from 'utils/fetch'
import resource from 'utils/axios-resources'
import SlLoading from 'components/Loading/index'
import { scrollback } from 'utils/index'
import OrderSkuDetail from './OrderSkuDetail'
export default {
    name: 'SlTable',
    components: {
        InnerTable,
        VRuntimeTemplate,
        ShowImage,
        SlLoading,
        OrderSkuDetail
    },
    props: {
        numberTit: {
            type: String,
            required: false,
            default: '#'
        },
        immediate: {
            type: Boolean,
            default: true
        },
        columns: {
            type: Array,
            required: true,
            default: []
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
        className: {
            type: String,
            required: false,
            default: 'table is-striped starlinkTable word-break'
        },
        border: {
            type: Boolean,
            required: false,
            default: false
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
        operations: {
            type: Array,
            required: false
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
        checked: {
            type: [String, Number],
            required: false
        },
        selectedItems: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        listIndex: {
            type: Boolean,
            required: false,
            default: true
        },
        highLightProps: {
            type: String,
            required: false,
            default: undefined
        },
        oderTable: {
            type: Boolean,
            required: false,
            default: false
        },
        isTemplate: {
            type: Boolean,
            required: false,
            default: false
        },
        rowHeaderInfo: {
            type: Object,
            required: false
        },
        pageSizes: {
            type: Array,
            required: false,
            default: function () {
                return [10, 20, 50, 100, 200]
            }
        },
        allPageChecked: {
            type: Boolean,
            required: false,
            default: false
        },
        formatDataFun: {
            type: Function,
            default: null
        },
        keyName: {
            type: String,
            required: false,
            default: 'id'
        },
        handleArrayParamsByIndex: {
            type: Boolean,
            default: false
        },
        operationsPopover: {
            type: String,
            default: ''
        }
    },
    mounted() {
        this.immediate && this.loadData()
    },
    data() {
        return {
            rows: this.rowsList || [],
            orderBy: '',
            orderDirect: '',
            pageInfo: {},
            showLoad: false,
            checkedAll: false,
            headerColspan: 0,
            total: 0,
            oldParams: {},
            doNotFilter: false,
            checkedRadio: '', // 单选框选中的值
            data: {},
            rowsOfShowMore: {}
        }
    },
    methods: {
        resetData() {
            this.rows = []
            this.showLoad = false
            this.pageInfo = {}
            this.checkedAll = false
            this.headerColspan = 0
            this.total = 0
            this.data = {}
            this.rowsOfShowMore = {}
        },
        loadData(params, isSaveScroll) {
            if (this.selectedItems) {
                this.selectedItems.splice(0, this.selectedItems.length)
            }
            this.showLoad = true
            if (!this.fetchUrl) {
                this.rows = []
                this.showLoad = false
                return
            }
            let queryParams
            if (this.doNotFilter) {
                queryParams = {
                    ...this.oldParams,
                    ...params
                }
                this.doNotFilter = false
            } else {
                queryParams = {
                    ...this.params,
                    ...params
                }
            }
            let query = JSON.parse(JSON.stringify(queryParams))
            for (let key in query) {
                if (query[key] === '' || query[key] === undefined) {
                    delete query[key]
                }
                if (query[key] instanceof Array) {
                    if (query[key].length === 0) {
                        delete query[key]
                    } else {
                        query[key] = query[key].join(',')
                    }
                }
            }
            this.oldParams = JSON.parse(JSON.stringify(query))
            resource(this.fetchUrl, HTTP)
                .query(query)
                .then((res) => {
                    this.showLoad = false
                    let { data } = res

                    this.data = data
                    let list = data.list || data.content || []
                    if (this.formatDataFun) {
                        this.rows = this.formatDataFun(data)
                    } else {
                        this.rows = list

                        if (this.canSelect) {
                            let checkedNum = 0
                            this.checkedAll = false
                            if (list.length > 0) {
                                this.rows = list.map((item) => {
                                    let index = this.selectedItems.findIndex(
                                        (ele) =>
                                            ele[this.keyName] ===
                                            item[this.keyName]
                                    )
                                    if (index > -1) {
                                        this.$set(item, 'checked', true)
                                        checkedNum++
                                    } else {
                                        this.$set(item, 'checked', false)
                                    }
                                    return item
                                })
                                if (checkedNum === this.rows.length) {
                                    this.checkedAll = true
                                }
                            }
                        } else {
                            this.rows = list
                        }
                    }
                    this.orderBy = data.orderBy
                    this.orderDirect = data.orderDirect
                    this.total = data.totalElements
                        ? data.totalElements
                        : data.total
                    this.pageInfo = {
                        total: data.totalElements
                            ? data.totalElements
                            : data.total,
                        current: data.pageNum || data.number + 1,
                        pagenum: data.pageSize || data.size,
                        page: data.pages,
                        pagegroup: 6,
                        skin: '#00D1B2'
                    }
                    this.$emit('onDataLoadCompeleted', data)
                    setTimeout(() => {
                        this.showLoad = false
                        if (isSaveScroll) {
                            scrollback()
                        }
                    }, 1000)
                })
                .catch(() => {
                    this.showLoad = false
                })
        },
        order(col) {
            if (!col.sortable) {
                return
            }
            let colname = col.name
            let direct = ''
            if (colname === this.orderBy) {
                if (this.orderDirect === 'asc') {
                    direct = 'desc'
                } else {
                    direct = 'asc'
                }
            } else {
                direct = 'asc'
            }
            // this.loadData('orderBy=' + colname + '&orderDirect=' + direct)
            this.loadData({ orderBy: colname, orderDirect: direct })
            this.$emit('onDataChange')
        },
        selectedRow(row) {
            if (this.canSelect && this.canRowSelect) {
                if (this.selectMode === 'MULTIPLE') {
                    row.checked = !row.checked
                    this.checkRow(row)
                    this.$emit('onRowSelected', row)
                } else {
                    this.checkedRadio = row[this.keyName]
                    this.$emit('changeRadio', row[this.keyName])
                }
            }
        },
        triggerRowInnerShowMore(index) {
            let currentStatus = this.rowsOfShowMore[index]
            this.$set(this.rowsOfShowMore, index, !currentStatus)
        },
        createArrayWith(length, value) {
            return new Array(length).map(function () {
                return value
            })
        },
        formatColVal(row, col) {
            if (col.type) {
                switch (col.type) {
                    case 'function':
                        return col.fun(row)
                }
            } else {
                return row[col.name]
            }
        },
        pagechange(pageInfo) {
            this.doNotFilter = true
            let { pageIndex, pageSize } = pageInfo
            this.pageInfo.pagenum = pageSize
            this.$set(this.params, 'pageSize', pageSize)
            let params = {
                pageIndex,
                pageSize
            }
            this.loadData(params)
            this.$emit('onDataChange')
        },
        checkAll() {
            this.rows.forEach((item) => {
                this.$set(item, 'checked', this.checkedAll)
                let index = this.selectedItems.findIndex(
                    (ele) => ele[this.keyName] === item[this.keyName]
                )
                if (this.checkedAll) {
                    if (index === -1) {
                        this.selectedItems.push(
                            JSON.parse(JSON.stringify(item))
                        )
                    }
                } else {
                    if (index > -1) {
                        this.selectedItems.splice(index, 1)
                    }
                }
            })
        },
        checkRow(row) {
            if (!this.selectedItems) {
                return
            }
            if (row.checked) {
                this.selectedItems.push(JSON.parse(JSON.stringify(row)))
            } else {
                let delIndex
                this.selectedItems.forEach((item, index) => {
                    if (item[this.keyName] === row[this.keyName]) {
                        delIndex = index
                    }
                })
                this.selectedItems.splice(delIndex, 1)
            }
        },
        changeRadio(val) {
            this.$emit('changeRadio', val)
        },
        buildImageUrl(row, col) {
            return row[col.name].source ? row[col.name].source : row[col.name]
        },
        showImage(row, col) {
            const url = `${row[col.name].source}`
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
        },
        setHighLight() {
            this.$el.querySelectorAll('td').forEach((item) => {
                item.classList.remove('highlight')
            })
            if (this.highLightProps) {
                setTimeout(() => {
                    this.$el.querySelectorAll('td').forEach((item) => {
                        if (
                            item.textContent.trim() ===
                            this.highLightProps.trim()
                        ) {
                            item.classList.add('highlight')
                        }
                    })
                }, 200)
            }
        }
    },
    computed: {
        isShowIndex() {
            return !this.canSelect
        },
        colspan() {
            if (!this.columns || !this.columns instanceof Array) {
                this.columns = []
            }
            let colspan = (this.columns && this.columns.length) || 0
            this.headerColspan = colspan
            if (this.canSelect || this.listIndex) {
                colspan++
            }
            if (this.operations && this.operations.length !== 0) {
                colspan++
                this.headerColspan++
            }
            return colspan
        },
        isSelected() {
            return (row) => {
                if (!this.canSelect) {
                    return false
                }
                return row.checked || this.checkedRadio === row[this.keyName]
            }
        }
    },
    watch: {
        fetchUrl(newValue) {
            this.fetchUrl = newValue
            this.loadData()
            this.$emit('onDataChange')
        },
        checked(val) {
            this.checkedRadio = val
        },
        border(val) {
            this.border = val
        },
        selectMode(val) {
            this.selectMode = val
        },
        selectedItems(val) {
            this.selectedItems = val
            let checkedNum = 0
            this.checkedAll = false
            if (this.rows.length > 0) {
                this.rows.forEach((item) => {
                    let index = this.selectedItems.findIndex(
                        (ele) => ele[this.keyName] === item[this.keyName]
                    )
                    if (index > -1) {
                        checkedNum++
                        this.$set(item, 'checked', true)
                    } else {
                        this.$set(item, 'checked', false)
                    }
                })
                if (checkedNum === this.rows.length) {
                    this.checkedAll = true
                }
            }
        },
        keyName(val) {
            this.keyName = val
        },
        rows(newVal) {
            this.rowsOfShowMore = this.createArrayWith(newVal.length, false)
        }
    },
    filters: {
        formatTriggerShowMore(status) {
            return status ? '隐藏' : '显示更多'
        }
    }
}
</script>

<style lang="scss" scoped>
$blue: #409eff;
table {
    width: 100%;
    position: relative;
}
.fixed-table {
    table-layout: fixed;
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
    p {
        margin-bottom: 10px;
    }
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

.table-border > thead > tr > th,
.table-border > tbody > tr > td,
.table-border > tfoot > tr > td {
    border: solid 1px #caccd0;
    word-break: break-all;
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
.loadingBox {
    position: absolute;
    top: 100px;
    left: 42%;
    img {
        width: 80px;
        height: 80px;
    }
    padding: 50px 80px;
    background-color: white;
    z-index: 100000;
    border-radius: 5px; // border: solid 1px #F2F2F2;
    opacity: 1;
}

.margin-bottom-8 {
    margin-bottom: 8px;
    min-height: 14px;
}
.trigger-show-more-text {
    color: #1592f1;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
}
</style>

<style lang="scss">
table td.template,
td.component {
    p {
        text-align: left;
        color: black;
        margin-bottom: 8px;
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
table td.highlight {
    color: red;
    background-color: #f3edd1;
}
.sl-table-wrap {
    .el-radio__label {
        display: none;
    }
    .top-panel {
        display: flex;
        display: -webkit-flex;
        display: -moz-flex;
        .tools {
            margin: 10px 0px;
        }
        .pagination {
            flex: 1;
            -webkit-flex: 1;
            -moz-flex: 1;
        }
    }
}
</style>
