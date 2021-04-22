<template>
    <div>
        <el-table :data="noteList" border max-height="250">
            <el-table-column property="platformOrderNumber" label="平台订单号" width="180"></el-table-column>
            <el-table-column property="note" label="备注内容"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'CustomerNote',
    props: {
        noteList: Array
    }
}
</script>

<style lang="scss" scoped>

</style>
