<template>
    <!-- 报关信息 -->
    <div>
        <el-table :data="declareResponses" border max-height="250">
            <el-table-column prop="skuCode" label="SKU" width="200"></el-table-column>
            <el-table-column prop="declareChineseName" label="报关中文名称"></el-table-column>
            <el-table-column prop="declareEnglishName" label="报关英文名称"></el-table-column>
            <el-table-column prop="declareValue" label="申报金额"></el-table-column>
            <el-table-column prop="declareWeight" label="申报重量(g)*"></el-table-column>
            <el-table-column prop="declareHsCode" label="海关编码"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'CustomsClearance',
    props: {
        declareResponses: {
            type: Array
        }
    },
    data() {
        return {
            data: []
        }
    },
    watch: {
        declareResponses: {
            handler(newVal) {
                this.data = newVal
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
