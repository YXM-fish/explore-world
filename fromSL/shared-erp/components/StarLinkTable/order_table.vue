<template>
    <div>
        <div class="sl-loading" v-if="showLoad">
            <div class="sl-modal" tabindex="0"></div>
            <div class="loading-box" v-loading="showLoad" element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"></div>
        </div>
        <pagination v-if="showPager && showPagerOnTop" :pageInfo="pageInfo" @change="pagechange" :pageSizes="pageSizes">
        </pagination>
        <table :class="className">
            <thead>
                <tr>
                    <th v-if="isShowIndex && listIndex" style="width:50px;padding:7px 18px;">#</th>
                    <th v-if="canSelect" style="width: 50px;padding:7px 18px;">
                        <input type="checkbox" @change.stop="checkAll()" v-model="checkedAll"
                            v-if="selectMode === 'MULTIPLE'" />
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
                    <th v-if="operations != null && operations.length > 0"></th>
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
                    <template v-for="(row, rindex) in rows">
                        <tr :key="rindex">
                            <td style="width: 50px;padding:7px 18px;" :rowspan="2" v-if="isShowIndex && listIndex">
                                {{showIndexNumber(rindex)}}</td>
                            <td style="width: 50px;padding:7px 18px;" :rowspan="2" v-if="canSelect">
                                <input type="checkbox" @change.stop="checkRow(row)" v-model="row.checked" />
                            </td>
                            <td :colspan="headerColspan" :style="rowHeaderInfo.style">
                                <div v-html="rowHeaderInfo.fun(row)"></div>
                            </td>
                        </tr>
                        <tr :key="rindex+'_tr2'" @click.stop="selectedRow(row, rindex)"
                            :class="{selected: row.checked, canSelect: canRowSelect}">
                            <template v-for="(col, ci) in columns">
                                <td v-if="col.noShow ? col.noShow() : true" :class="col.class ? col.class : col.type"
                                    v-bind:key="ci" :style="col.style ? col.style : ''">
                                    <template
                                        v-if="col.type !=='image' && col.type !=='template' && col.type !== 'table' && col.type !== 'component' && col.type !== 'click'">{{formatColVal(row, col)}}</template>
                                    <template v-else-if="col.type =='image'">
                                        <div v-if="row[col.name]">
                                            <show-image :src="buildImageUrl(row, col)"></show-image>
                                        </div>
                                    </template>
                                    <template v-else-if="col.type =='template'">
                                        <div v-html="col.fun(row)" :style="col.style" />
                                    </template>
                                    <template v-else-if="col.type =='table'">
                                        <InnerTable :columns="col.columns" :rows="col.fun(row)" :link="col.link">
                                        </InnerTable>
                                    </template>
                                    <template v-else-if="col.type =='click'">
                                        <p v-for="opt in col.fun(row)" v-bind:key="opt.title" style="color: #448ACC;">
                                            <a @click.stop="opt.fun(opt, row, rindex)">{{opt.title}}</a>
                                        </p>
                                    </template>
                                    <template v-else-if="col.type =='component'">
                                        <v-runtime-template :template="col.fun(row)"></v-runtime-template>
                                    </template>
                                </td>
                            </template>
                            <td v-if="operations != null && operations.length > 0" class="vtbOperations"
                                style="width: 55px;">
                                <template v-for="opt in operations">
                                    <p v-bind:key="opt.title" v-if="opt.isShow === undefined || opt.isShow(row)"
                                        :style="opt.style ? opt.style : ''">
                                        <a @click.stop="opt.callback(row, rows, rindex, $event)">{{opt.title}}</a>
                                    </p>
                                </template>
                            </td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
        <pagination v-if="showPager" :pageInfo="pageInfo" @change="pagechange" :pageSizes="pageSizes"></pagination>
    </div>
</template>

<script>
import VRuntimeTemplate from 'v-runtime-template'
import Pagination from './vue-pagination'
import InnerTable from './inner_table'
import HTTP from 'utils/fetch'
import ShowImage from './show_image'

export default {
    name: 'SlOrderTable',
    components: {
        Pagination,
        InnerTable,
        VRuntimeTemplate,
        ShowImage
    },
    props: {
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
        selectedItems: {
            type: Array,
            required: false
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
        pageSizes: {
            type: Array,
            required: false,
            default: function () {
                return [10, 20, 50, 100, 200]
            }
        },
        rowHeaderInfo: {
            type: Object,
            required: false
        }
    },
    mounted() {
        this.loadData()
    },
    data() {
        return {
            rows: this.rowsList || [],
            orderBy: '',
            orderDirect: '',
            pageInfo: {},
            showLoad: false,
            checkedAll: false,
            headerColspan: 0
        }
    },
    methods: {
        //金额
        amount(money) {
            const currency = this.virtualOrderInfo.currency
            if (money) {
                return `${money} ${currency}`
            }
            return ''
        },
        loadData(queryParams) {
            if (this.fetchUrl && this.fetchUrl !== '') {
                if (typeof queryParams === 'undefined') {
                    queryParams = ''
                }
                let params = Object.assign({}, this.params) || {}
                let targetUrl = this.fetchUrl
                if (queryParams !== '') {
                    if (targetUrl.indexOf('?') >= 0) {
                        targetUrl = `${targetUrl}&${queryParams}`
                    } else {
                        targetUrl = `${targetUrl}?${queryParams}`
                    }
                }
                if (targetUrl.indexOf('pageIndex') >= 0) {
                    delete params.pageIndex
                }
                if (targetUrl.indexOf('pageSize') >= 0) {
                    delete params.pageSize
                }
                if (targetUrl.indexOf('orderBy') >= 0) {
                    delete params.orderBy
                }
                if (targetUrl.indexOf('orderDirect') >= 0) {
                    delete params.orderDirect
                }
                for (let key in queryParams) {
                    if (queryParams[key] == '') {
                        delete queryParams[key]
                    }
                }
                this.showLoad = true
                HTTP.get(targetUrl, {
                    params
                })
                    .then((dt) => {
                        this.orderBy = queryParams.orderBy || dt.data.orderBy
                        this.orderDirect =
                            queryParams.orderDirect || dt.data.orderDirect
                        this.rows = dt.data.list || dt.data.content || []
                        this.pageInfo = {
                            total: dt.data.total || dt.data.totalElements,
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
                        setTimeout(() => {
                            this.showLoad = false
                        }, 400)
                        this.setHighLight()
                    })
                    .catch((err) => {
                        this.showLoad = false
                    })
            } else {
                this.rows = []
            }
        },
        order(col) {
            if (typeof col.sortable === 'undefined' || col.sortable === false) {
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
            this.loadData('orderBy=' + colname + '&orderDirect=' + direct)
            this.$emit('onDataChange')
        },
        selectedRow(row) {
            if (this.canSelect && this.canRowSelect) {
                row.checked = !row.checked
                this.checkRow(row)
            }
            this.$emit('onRowSelected', row)
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
            let params = ''
            for (let i in pageInfo) {
                params += `&${i}=${pageInfo[i]}`
            }
            this.loadData(
                'orderBy=' +
                    (this.orderBy || '') +
                    '&orderDirect=' +
                    (this.orderDirect || '') +
                    params
            )
            this.$emit('onDataChange')
        },
        checkAll() {
            if (this.selectMode === 'MULTIPLE' && this.selectedItems) {
                this.rows.forEach((item) => (item.checked = this.checkedAll))
                this.selectedItems.splice(0, this.selectedItems.length)
                if (this.checkedAll) {
                    this.rows.forEach((item) => {
                        this.selectedItems.push(
                            JSON.parse(JSON.stringify(item))
                        )
                    })
                }
            }
        },
        checkRow(row) {
            if (this.selectedItems) {
                this.selectedItems.splice(0, this.selectedItems.length)
                switch (this.selectMode) {
                    case 'MULTIPLE':
                        this.rows.forEach((item) => {
                            if (item.checked === true) {
                                this.selectedItems.push(
                                    JSON.parse(JSON.stringify(item))
                                )
                            }
                        })
                        this.rows = JSON.parse(JSON.stringify(this.rows))
                        break
                    case 'SINGLE':
                        this.rows.forEach((item) => {
                            if (row !== item) {
                                item.checked = false
                            }
                        })
                        if (row.checked) {
                            this.selectedItems.push(
                                JSON.parse(JSON.stringify(row))
                            )
                        }
                        this.rows = JSON.parse(JSON.stringify(this.rows))
                        break
                }
            }
        },
        buildImageUrl(row, col) {
            const source = row[col.name].source
                ? row[col.name].source
                : row[col.name]
            return `${source}`
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
    position: relative;
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
    border-radius: 5px;
    opacity: 1;
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
table td.highlight {
    color: red;
    background-color: #f3edd1;
}
</style>
