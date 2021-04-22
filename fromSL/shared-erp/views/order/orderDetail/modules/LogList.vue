<template>
    <div>
        <el-table :data="logsData" border v-loading.body="listLoading" max-height="250" :lock-scroll="false">
            <el-table-column label="操作内容">
                <template slot-scope="scope">
                    <div v-html="scope.row.operationDesc" />
                </template>
            </el-table-column>
            <el-table-column property="createdByName" label="操作人" width="180"></el-table-column>
            <el-table-column property="createdAt" label="操作时间" width="180"></el-table-column>
        </el-table>
        <div v-show="logsData.length > 0" class="pagination-container">
            <el-pagination @current-change="handleLogsCurrentChange" :current-page.sync="logslist.pageIndex"
                :page-size="logslist.pageSize" layout="total, prev, pager, next" :total="logsTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import VirtualOrder from '@/shared/api/order/virtualOrder'
export default {
    props: {
        virtualOrderId: Number
    },
    data() {
        return {
            // dialogLogsVisible: false,
            listLoading: false,
            logsTotal: undefined,
            logsData: [],
            logslist: {
                pageIndex: 1,
                pageSize: 10,
                virtualOrderId: undefined
            }
        }
    },
    methods: {
        handleLogsCurrentChange(val) {
            this.logslist.pageIndex = val
            this.listLoading = true
            VirtualOrder.logsList(this.logslist).then((res) => {
                this.logsData = res.data.list
                this.listLoading = false
            })
        },
        getList(val) {
            this.listLoading = true
            this.logslist.virtualOrderId = val
            VirtualOrder.logsList(this.logslist).then((res) => {
                this.logsData = res.data.list
                this.logsTotal = res.data.total
                this.listLoading = false
                this.logslist.pageIndex = res.data.pageNum
            })
        }
    },
    watch: {
        virtualOrderId: {
            immediate: true,
            handler(val) {
                this.virtualOrderId = val
            }
        }
    }
}
</script>
