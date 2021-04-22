<template>
    <div>
        <div class="order-detail-content-container">
            <el-row class="order-info">
                <el-col :span="13">
                    <label>订单号:</label>
                    <span style="white-space: pre;">{{data.virtualOrderNo}}</span>
                    <span class="parentheses" style="margin-left:5px">[ </span>
                    <order-source :order-data="data"></order-source>
                    <span class="parentheses">] </span>
                </el-col>
                <el-col :span="11">
                    <label>交易额:</label>
                    <span class="price">{{ amount(data.totalPrice) }}</span>
                    <span v-if="isCodShop" class="price currency">
                        {{ amount(data.totalPriceUsd, usdCurrency) }}
                    </span>
                    <span v-if="data.increaseAmount">
                        <label>(原始订单额:</label>
                        <span class="price">{{amount(data.platformOrderTotalPrice)}}</span>
                        <template>
                            <label>加单额:</label>
                            <span class="price">{{amount(data.increaseAmount)}}</span>
                        </template>
                        <label>)</label>
                        <el-popover placement="bottom" title="提示" width="240" trigger="hover" style="color:#AAAAAA">
                            <div class="hint-wrap">
                                原始订单额取自原始订单总金额，不会随拆单变化金额
                            </div>
                            <i slot="reference" class="el-icon-question"
                                style="font-size: 20px; cursor: pointer; vertical-align: middle;">
                            </i>
                        </el-popover>
                    </span>
                </el-col>
            </el-row>

            <el-row class="order-info">
                <el-col :span="7">
                    <label>包裹号:</label>
                    {{data.packageNumber}}
                </el-col>
                <el-col :span="6">
                    <label>折扣:</label>
                    <span class="price">{{amount(data.orderLevelDiscount)}}</span>
                    <span v-if="isCodShop" class="price currency">
                        {{amount(data.orderLevelDiscountUsd, usdCurrency)}}
                    </span>
                </el-col>
                <el-col :span="6">
                    <label style="float: left; width: 70px;">订单运费:</label>
                    <div style="margin-left: 78px;">
                        <span class="price">{{amount(data.totalShippingFee)}}</span>
                        <span v-if="isCodShop" class="price currency">
                            {{amount(data.totalShippingFeeUsd, usdCurrency)}}
                        </span>
                        <div v-if="data.refundShippingFee"
                            style="display: inline-block; white-space: nowrap;">
                            <label>(退款:</label>
                            <span class="price">{{amount(data.refundShippingFee)}}</span>
                            <span v-if="isCodShop" class="price currency">
                                {{amount(data.refundShippingFeeUsd, usdCurrency)}}
                            </span>
                            <label>)</label>
                        </div>
                    </div>
                </el-col>
                <el-col :span="5">
                    <label>税费:</label>
                    <span class="price">{{amount(data.totalTax)}}</span>
                    <span v-if="isCodShop" class="price currency">
                        {{amount(data.totalTaxUsd, usdCurrency)}}
                    </span>
                    <template v-if="data.refundTax">
                        <label>(退款:</label>
                        <span class="price">{{amount(data.refundTax)}}</span>
                        <span v-if="isCodShop" class="price currency">
                            {{amount(data.orderLevelDiscount, usdCurrency)}}
                        </span>
                        <label>)</label>
                    </template>
                </el-col>
            </el-row>

            <el-row class="order-info">
                <el-col :span="7">
                    <label>支付方式:</label>
                    <span>{{data.gatewaySet && data.gatewaySet.join('\n')}}</span>
                </el-col>
                <el-col :span="6">
                    <label>交易流水号:</label>
                    {{data.transactionIdSet && data.transactionIdSet.join('\n')}}
                </el-col>

                <el-col :span="6">
                    <label>优先发货:</label>
                    <template v-if="data.isPriorityInDelivery">
                        <i class="el-icon-circle-check list-icon"></i>
                    </template>
                </el-col>
                <el-col :span="5">
                    <label>站点类型:</label>
                    {{data.siteType}}
                </el-col>
            </el-row>
            <el-row class="order-info">
                <el-col :span="7">
                    <label>公司主体:</label>
                    {{data.companyBody}}
                </el-col>
                <el-col :span="6">
                    <label>异常:</label>
                    {{data.exceptionStatusName}}
                </el-col>
                <el-col :span="6">
                    <label>深圳ERP订单号:</label>
                    <span style="white-space: pre;">{{data.szOrderNumber || ''}}</span>
                </el-col>
            </el-row>

            <el-row class="order-info">
                <el-col :span="12">
                    <span v-if="data.isReissued">
                        <label>原始ERP订单号:</label>
                        {{data.isReissued ? data.parentReissueVirtualOrderNo.join('\n'):''}}
                    </span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import OrderSource from './../../components/OrderSource.vue'
export default {
    name: 'OrderInfo',
    components: {
        OrderSource
    },
    props: {
        data: {
            type: Object,
            require: true
        },
        isCodShop: Boolean,
        isCodOrder: Boolean
    },
    data() {
        return {
            orderData: {},
            usdCurrency: 'USD'
        }
    },
    methods: {
        // 金额
        amount(
            money,
            currency = this.data.currency,
            isShowZero = true
        ) {
            if (money) {
                return `${currency} ${money}`
            }
            return isShowZero ? `${currency} 0` : ''
        }
    },
    watch: {
        orderInfo: {
            handle(newVal) {
                this.orderData = JSON.parse(JSON.stringify(newVal))
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.parentheses {
    color: #cccccc;

    font-weight: normal;
}
a {
    color: #1592f1;
    font-size: 13px;
    text-decoration: underline;
}
label {
    color: #797979;
    margin-right: 8px;
}
.price {
    color: #f90000;
    white-space: nowrap;
}
.order-info {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    label {
        font-weight: normal;
        color: #797979;
    }
}
.currency {
    padding-left: 5px;
    white-space: nowrap;
}
</style>
