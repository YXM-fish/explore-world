<template>
    <div>
        <div class="goods-info">
            <el-row style="padding: 3px 0;">
                <el-col :xs="24" :sm="16" :md="15"  style="text-align: left;" class="ellipsis">
                    <label>订单号：</label>
                    <span style="white-space: pre-wrap;">{{item.virtualOrderNo}}</span>
                    <span class="sl-tag"  style="padding:0 4px;">
                        <el-tag :type="item.splitOrUnion !== 'NORMAL' ? 'danger' : '' ">
                            {{splitOrUnionOps[item.splitOrUnion]}}
                        </el-tag>
                    </span>
                    <span v-if="item.virtualOrderTypeName" class="sl-tag">
                        <el-tag>{{item.virtualOrderTypeName}}</el-tag>
                    </span>
                </el-col>
                <el-col :xs="24" :sm="8" :md="9" style="text-align: left;" class="ellipsis">
                    <label>总金额：</label>
                    <span style="color: #f90000;">
                        {{formatPrice(item.totalPrice, item.currency, true)}}
                    </span>
                    <span v-if="isCodShop" style="color: #f90000; padding-left: 15px;">
                        {{formatPrice(item.totalPriceUsd, usdCurrency, true)}}
                    </span>
                </el-col>
            </el-row>
            <el-row style="padding: 3px 0; text-align: left;">
                <el-col :xs="24" :sm="12" :md="15" class="ellipsis">
                    <label>来源：</label>
                    <order-source :order-data="item"></order-source>
                </el-col>
                <el-col :xs="24" :sm="12" :md="9" class="ellipsis">
                    <label title="SKU种类：计算该订单中不同的SKU &#10;SKU数量：SKU数量累加">所含SKU</label>：
                    <span style="padding-right: 5px;" :title="item.includeSku">{{item.includeSku}}</span>
                </el-col>
            </el-row>
            <el-row style="padding: 3px 0; text-align: left;">
                <el-col :xs="24" :sm="12" :md="15" class="ellipsis">
                    <label>目的地：</label>
                    <span :title="`${item.destinationAddress || ''} (邮编：${item.zipCode || ''})`">
                        {{item.destinationAddress || ''}}
                    </span>
                    (邮编：{{item.zipCode || ''}})
                </el-col>
                <el-col :xs="24" :sm="12" :md="9" class="ellipsis">
                    <label>买家指定物流：</label>
                    <span :title="item.customerShippingChannel || '' ">{{item.customerShippingChannel || ""}}</span>
                </el-col>
            </el-row>
            <el-row style="padding: 3px 0; text-align: left;">
                <el-col
                    v-if="item.szOrderNumber"
                    :xs="24" :sm="24" :md="15" class="ellipsis">
                    <label>深圳ERP订单号：</label>
                    <span style="white-space:pre-wrap;" :title="item.szOrderNumber || '' ">{{item.szOrderNumber || ''}}</span>
                </el-col>
                <el-col :xs="24" :sm="24" :md="9" class="ellipsis">
                    <label>站点类型：</label>
                    <span style="white-space:pre-wrap;" :title="item.siteType || '' ">{{item.siteType || ''}}</span>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {
    splitOrUnionOps,
    usdCurrency,
    orderTypeOps
} from 'utils/order'
import OrderSource from './OrderSource.vue'
export default {
    name: 'ListOrderInfo',
    components: {
        OrderSource
    },
    props: {
        item: {
            type: Object
        }
    },
    data() {
        return {
            splitOrUnionOps,
            orderTypeOps,
            usdCurrency
        }
    },
    methods: {
        formatPrice(price, currency, isShowZero) {
            return price || (isShowZero && price === 0)
                ? `${currency} ${price}`
                : `${currency} 0`
        }
    },
    computed: {
        isCodShop() {
            return this.item.shopType === this.orderTypeOps.COD
        },
        isCodOrder() {
            return this.item.orderType === this.orderTypeOps.COD
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
