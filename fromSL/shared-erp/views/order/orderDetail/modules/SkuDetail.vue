<template>
    <div>
        <el-card
            class="box-card overflow-card"
            v-for="(item, index) in orderData.platformOrderList"
            :key="`box-card${index}`">
            <div slot="header" class="clearfix header">
                <el-col :span="8">
                    <label>平台订单号:</label>
                    <a @click="handlePlatformDetails(item.orderId)"
                        style="text-decoration: none;">{{item.platformOrderNumber}}</a>
                </el-col>
                <el-col :span="10">
                    <label>外部订单号:</label>
                    {{orderInfo.platformOrderId}}
                </el-col>
                <el-col :span="6">
                    <label>下单时间:</label>
                    {{item.createdAt}}
                </el-col>
            </div>
            <div
                v-for="(commodity, index) in item.prodInfoItemList"
                :key="`prodInfoItem${index}`"
                class="text item">
                <div :class="{'border-item': index+1 !== item.prodInfoItemList.length, 'order-list': true}">
                    <div style="margin-bottom: 10px;">
                        {{commodity.erpProductName}}
                    </div>
                    <div class="image">
                        <template v-if="commodity.erpImage">
                            <el-badge :value="isOutOfStock(commodity.skuCode) ? '缺' : ''" class="item">
                                <show-image :src="commodity.erpImage" :params="imgParams"></show-image>
                            </el-badge>
                        </template>
                        <template v-else>
                            <img src="~/static/no-picture.png" width="70px" height="70px" />
                        </template>
                    </div>
                    <!-- <el-row style="margin-left:95px;">
                        <el-col :span="20">
                            <div class="flex-container">
                                <div class="flex-item">
                                    <label>SKU</label>
                                    <template v-if="commodity.skuCode">
                                        {{commodity.skuCode}}
                                        <span class="quantity">
                                            {{commodity.quantity}}
                                        </span>
                                        <template v-if="commodity.variants && commodity.variants.length">
                                            <span class="slpit-inline">/</span>
                                            <span style="color: #ccc;">{{commodity.variants.join(' - ')}}</span>
                                        </template>
                                    </template>
                                </div>
                            </div>
                        </el-col>
                    </el-row> -->
                    <el-row style="margin-left: 90px;">
                        <el-col :span="20">
                            <div class="flex-container">
                                <div v-for="(column,_index) in gridColumns" :key="`column${_index}`"
                                    class="flex-item">
                                    <div class="innerText">
                                        <label
                                            v-if="!noShowLabel(commodity.type, column.noShow)">{{column.name}}:</label>
                                        <span v-if="column.fun" v-html="column.fun(commodity)"></span>
                                        <span v-else>{{commodity[column.key]}}</span>
                                        <template v-if="column.key=='skuPrice' && commodity.promotionProduct">
                                            <svg-icon icon-class="promotions"
                                                style="margin-left: 10px; color: #F44336; font-size: 18px;" />
                                        </template>
                                    </div>
                                </div>
                                <div class="flex-item">
                                    <template v-if="!orderInfo.isReissued">
                                        <el-col v-for="(item, _index) in commodity.discounts"
                                            :key="`discounts${_index}`">
                                            <div class="innerText">
                                                <label>{{item.valueType.toLowerCase() == 'fixed_amount' ? '折扣金额' : '折扣'}}:</label>
                                                <template v-if="item.valueType.toLowerCase() == 'fixed_amount'">
                                                    <span
                                                        style="color: #f90000;">{{amount(item.value, orderInfo.currency, false)}}</span>
                                                    <span v-if="isCodShop"
                                                        style="color: #f90000; padding-left: 15px;">{{amount(item.valueUsd, usdCurrency, false)}}</span>
                                                </template>
                                                <span v-else>{{item.value}}%</span>
                                            </div>
                                        </el-col>
                                    </template>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="4">
                            <div class="sale-info">
                                <div v-if="commodity.refundQuantity || commodity.refundAmount">
                                    <div class="innerText">
                                        <label>退款数量:</label>
                                        <span>{{ commodity.refundQuantity }}</span>
                                    </div>
                                    <div class="innerText">
                                        <label>退款金额:</label>
                                        <span class="red-color">{{amount(commodity.refundAmount)}}</span>
                                        <span v-if="isCodShop"
                                            class="red-color curency">{{amount(commodity.refundAmountUsd, usdCurrency)}}</span>
                                    </div>
                                </div>
                                <div v-if="commodity.reissueQuantity != 0">
                                    <div class="innerText">
                                        <label>补发数量:</label>
                                        <span>{{ commodity.reissueQuantity }}</span>
                                    </div>
                                    <div class="innerText">
                                        <label>补发ERP订单号:</label>
                                        <span class="red-color autoSubstr"
                                            :title="commodity.reissueVirtualOrderNo.join()">{{ commodity.reissueVirtualOrderNo.join() }}</span>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import ShowImage from '@/shared/components/StarLinkTable/show_image'
export default {
    name: 'CustomerNote',
    components: {
        ShowImage
    },
    props: {
        orderInfo: Object,
        isCodShop: Boolean,
        isCodOrder: Boolean,
        skuInfo: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            orderData: {},
            platformOrderList: [],
            usdCurrency: 'USD',
            imgParams: {
                width: 76,
                height: 76,
                boderWidth: 78,
                boderHeight: 78
            },
            gridColumns: [
                {
                    name: 'SKU',
                    key: 'skuCode',
                    fun: (commodity) => {
                        if (commodity.skuCode) {
                            const variant =
                                commodity.variants.length !== 0
                                    ? `<span class="slpit-inline">/</span> <span style="color: #ccc;">${commodity.variants.join(
                                        ' - '
                                    )}</span>`
                                    : ''
                            return `${commodity.skuCode} * <span class="quantity">${commodity.quantity}</span> ${variant}`
                        }
                    }
                },
                {
                    name: '报关中文/英文名',
                    key: 'skuCode',
                    fun: (commodity) => {
                        let {
                            declareChineseName,
                            declareEnglishName
                        } = commodity
                        if (declareChineseName && declareEnglishName) {
                            return `${declareChineseName}<span class="slpit-inline"> / </span>${declareEnglishName}`
                        }
                    }
                },
                {
                    name: '平台SKU',
                    key: 'platformSku',
                    noShow: true,
                    fun: (commodity) => {
                        let {
                            type,
                            platformSku,
                            platformHandle,
                            platformVariants
                        } = commodity
                        if (type === '赠品') {
                            return '赠品'
                        } else if (type === '加单') {
                            return `<span style="color: #f90000;">加单SKU</span>`
                        } else if (platformSku) {
                            const platformSkuHtml = platformHandle
                                ? `<a href="${platformHandle}" target="_blank" style="color:#1592f1">${platformSku}</a>`
                                : platformSku
                            const platformVariantsHtml = platformVariants
                                ? `<span class="slpit-inline"> / </span> <span style="color: #bfbaba;">${platformVariants}</span>`
                                : ''
                            return `${platformSkuHtml} ${platformVariantsHtml}`
                        }
                    }
                },
                {
                    name: '报关价格/重量(g)',
                    key: 'skuCode',
                    fun: (commodity) => {
                        let { declareValue, declareWeight } = commodity
                        const declareValueHtml = declareValue
                            ? `<span style="color: #f90000;">USD ${declareValue}</span>`
                            : ''
                        const declareWeightHtml = declareWeight
                            ? `<span class="slpit-inline"> / </span> ${declareWeight}`
                            : ''
                        return `${declareValueHtml} ${declareWeightHtml}`
                    }
                },
                {
                    name: 'SKU折后单价',
                    key: 'skuPrice',
                    noShow: true,
                    fun: (commodity) => {
                        if (commodity.type === '赠品') {
                            return ''
                        }
                        let priceHtml = `<span style="color: #f90000;">0</span>`
                        if (!this.orderInfo.isReissue) {
                            priceHtml = `<span style="color: #f90000;">${this.amount(
                                commodity.skuAfterCapitationDiscountPrice
                            )}</span>`
                            if (this.isCodShop) {
                                priceHtml += `<span style="color: #f90000; padding-left: 15px;">${this.amount(
                                    commodity.skuAfterCapitationDiscountPriceUsd,
                                    this.usdCurrency
                                )}</span>`
                            }
                        }
                        return priceHtml
                    }
                },
                {
                    name: 'SKU尺寸(cm)/重量(g)',
                    key: 'dimension',
                    fun: (commodity) => {
                        let { length, width, height, weight } = commodity
                        const size =
                            length && width && height
                                ? `${length} * ${width} * ${height}`
                                : ''
                        const weightHtml = weight
                            ? `<span class="slpit-inline"> / </span> ${weight}`
                            : ''
                        return size + weightHtml
                    }
                }
            ]
        }
    },
    computed: {
        isOutOfStock() {
            return (skuCode) => {
                let ops = this.skuInfo.find((item) => item.skuCode === skuCode)
                return ops && ops.isOutOfStock
            }
        },
        noShowLabel() {
            return (type, noShow) => {
                return (type === '赠品' || type === '加单') && noShow
            }
        }
    },
    methods: {
        // 金额
        amount(
            money,
            currency = this.orderData.currency,
            isShowZero = true
        ) {
            if (money) {
                return `${currency} ${money}`
            }
            return isShowZero ? `${currency} 0` : ''
        },
        handlePlatformDetails(orderId) {
            this.$emit('handlePlatformDetails', orderId)
        }
    },
    watch: {
        orderInfo: {
            handler(newVal) {
                this.orderData = newVal
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.box-card {
    overflow: visible;
    .header {
        font-weight: 600;
        label {
            font-weight: 600;
            vertical-align: top;
        }
        a {
            color: #1592f1;
            font-size: 13px;
        }
    }
}
.order-list {
    position: relative;
    .sale-info {
        font-weight: bold;
        text-align: left;
        z-index: 9;
        .red-color {
            color: #f44336;
        }
        .autoSubstr {
            display: inline-block;
            max-width: 200px;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    .flex-container {
        display: flex;
        flex-wrap: wrap;
        .flex-item {
            flex-basis: 50%;
            line-height: 25px;
        }
    }
}
label {
    color: #797979;
    margin-right: 8px;
}
</style>
