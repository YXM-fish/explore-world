<template>
    <div>
        <el-table :data="platformInfo" border max-height="250">
            <el-table-column prop="type" label="类型" width="180"></el-table-column>
            <el-table-column prop="content" label="内容"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'PlatformInfo',
    props: {
        platformInfo: Array
    }
}
</script>

<style lang="scss" scoped>

</style>
