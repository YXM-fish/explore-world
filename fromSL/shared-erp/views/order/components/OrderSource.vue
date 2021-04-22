<template>
    <div style="display: inline-block;">
        <template v-if="orderData.manualOrder">
            <el-tag type="success" effect="dark" style="vertical-align: middle;">手工</el-tag>
            <span style="vertical-align: middle;">{{orderData.orderSource || ''}}</span>
        </template>
        <template v-else-if="orderData.platform">
            <img v-if="orderData.platform === 'SHOPIFY'" class="list-shopify-img" :src="shopifyTag" />
            <el-tag v-else type="success" effect="dark">{{orderData.platform}}</el-tag>
        </template>
        <span style="vertical-align: middle;">
            {{orderData.shopName ? orderData.shopName : ''}}
            <template v-if="orderData.platformId">
                ({{orderData.platformId}})
            </template>
        </span>
        <el-tooltip
            class="item"
            effect="dark"
            :content="orderData.leadingByName || '未知'"
            placement="right">
            <span class="el-icon-user user"></span>
        </el-tooltip>
    </div>
</template>

<script>
import shopifyTag from '@/assets/images/shopify.png'
export default {
    props: {
        orderData: {
            type: Object
        }
    },
    data() {
        return {
            shopifyTag,
            data: {}
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
