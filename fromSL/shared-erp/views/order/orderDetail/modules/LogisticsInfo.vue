<template>
    <div>
        <el-row>
            <el-col :span="8">
                <label>仓库:</label>
                {{orderInfo.warehouseName}}
            </el-col>
            <el-col :span="8">
                <label>物流商:</label>
                {{orderInfo.shippingProviderName}}
            </el-col>
            <el-col :span="8">
                <label>物流渠道:</label>
                {{orderInfo.shippingChannelName}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <label>跟踪号:</label>
                {{orderInfo.trackingNumber}}
            </el-col>
            <el-col :span="8">
                <label>重量(g):</label>
                {{orderInfo.totalWeight}}
            </el-col>
            <el-col :span="8">
                <label>预估运费:</label>
                <span class="price">CNY {{orderInfo.forecastTotalShippingFee}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <label>买家指定物流:</label>
                {{orderInfo.customerShippingChannel}}
            </el-col>
            <el-col :span="8">
                <label>核重发货(g):</label>
                {{orderInfo.shipWeight}}
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'LogisticsInfo',
    props: {
        orderInfo: Object
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
label{
    color: #797979;
    margin-right: 8px;
}
.price {
    color: #f90000;
    white-space: nowrap;
}
</style>
