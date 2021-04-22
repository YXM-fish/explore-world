<template>
    <div>
        <span class="el-dialog__title">
            ERP订单详情
            <el-tag type="danger" effect="dark">{{getSplitInfo}}</el-tag>
        </span>
        <span
            class="order-label"
            v-if="orderInfo.stopType">
            {{stopTypeOps[orderInfo.stopType]}}
        </span>
        <template v-for="item in interceptTagOps">
            <el-button v-if="orderInfo.interceptStatus === item.value" :key="item.value"
                :type="item.type" plain style="float: right; margin-right: 45px; margin-top: -3px;">
                {{item.label}}
            </el-button>
        </template>
        <template v-if="isShowCodOrderStatus">
            <template v-for="item in codStatusOps">
                <el-button v-if="orderInfo.codStatus === item.value" :key="item.value" :type="item.type"
                    plain style="float: right; margin-right: 45px; margin-top: -3px;">
                    {{item.label}}
                </el-button>
            </template>
        </template>
    </div>
</template>

<script>
export default {
    name: 'DialogTitle',
    props: {
        orderInfo: Object,
        isCodOrder: Boolean
    },
    data() {
        let dict = this.$dictionary
        return {
            interceptTagOps: dict.get('interceptTagOps'),
            orderSplitUnion: dict.get('orderSplitUnionOps'),
            stopTypeOps: dict.get('stopTypeOps')
        }
    },
    computed: {
        isShowCodOrderStatus() {
            const { codStatus, status } = this.orderInfo
            if (this.isCodOrder && codStatus) {
                return codStatus === 'NOT_AUDIT'
                    ? status === 'APPROVED'
                        ? true
                        : false
                    : true
            }
            return false
        },
        getSplitInfo() {
            const enumItem = this.orderSplitUnion.find(
                (m) => m.value === this.orderInfo.splitOrUnion
            )
            if (enumItem) {
                return enumItem.label
            }
            return '普通'
        }
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

</style>
