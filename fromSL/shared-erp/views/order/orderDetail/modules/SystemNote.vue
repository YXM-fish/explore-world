<template>
    <div>
        <el-table :data="noteList" border v-loading="listLoading" max-height="250">
            <el-table-column property="note" label="备注内容"></el-table-column>
            <el-table-column property="skuCode" label="平台SKU" width="200"></el-table-column>
            <el-table-column property="createdByName" label="备注人" width="180"></el-table-column>
            <el-table-column property="createdAt" label="备注时间" width="180"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import VirtualOrderApi from '@/shared/api/order/virtualOrder'
export default {
    name: 'SystemNote',
    props: {
        virtualOrderId: Number
    },
    data() {
        return {
            noteList: [],
            listLoading: false
        }
    },
    methods: {
        // 备注
        getNote() {
            this.listLoading = true
            VirtualOrderApi.getNoteList(this.virtualOrderId).then((res) => {
                this.listLoading = false
                this.noteList = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
