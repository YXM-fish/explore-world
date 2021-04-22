<template>
    <div>
        <el-table :data="trackNumberHistory" border max-height="250">
            <el-table-column type="index" label="#" width="50"></el-table-column>
            <el-table-column property="trackingNumber" label="跟踪号"></el-table-column>
            <el-table-column label="跟踪号类型">
                <template slot-scope="scope">{{ scope.$index == 0 ? '跟踪号' : '参考号' }}</template>
            </el-table-column>
            <el-table-column property="fetchTrackingNumberAt" label="获取时间"></el-table-column>
            <el-table-column property="operatorByName" label="操作人"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'TrackingNumber',
    props: {
        trackNumberHistory: Array
    }
}
</script>

<style lang="scss" scoped>

</style>
