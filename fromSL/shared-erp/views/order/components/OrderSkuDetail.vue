<template>
    <div>
        <p style="margin: 5px 2px; text-align: left;">
            <label class="label">订单标签: </label>
            <template v-if="row.tags && row.tags.length">
                <el-tag v-for="item in row.tags" :key="item.id" size="small" :color="item.colorNumber"
                    :style="{'text-decoration': !item.status ? 'line-through' : 'blink', 'color':'#ffffff'}">
                    {{item.name}}
                </el-tag>
            </template>
        </p>
        <div v-for="(ele, index) in row.itemListResponses" :key="index">
            <div class="platform-item" :class="{'border-box': index > 0}">
                <p style="margin: 1px 2px; text-align: left;"><label class="label">平台订单号: </label>
                    <a @click="handleClick(ele)">{{ele.platformOrderNumber}}</a>
                    <span style="padding-left: 15px;"><label>支付方式：</label>
                        {{orderGatway(ele)}}
                    </span>
                </p>
                <inner-table :rows="proInfoItem(ele)" slotName="skuDetails">
                    <template v-slot:skuDetails="{ item }">
                        <div class="item">
                            <div v-if="item.erpImage" class="image-box">
                                <show-image :src="item.erpImage" :params="imgParams"></show-image>
                            </div>
                            <div v-else class="no-imgages-box"><img src="~/static/no-picture.png" /></div>
                            <ul>
                                <template v-if="item.type !== '赠品' && item.type !== '加单'">
                                    <li>
                                        <label class="label">平台SKU</label>
                                        <template v-if="item.platformSku">
                                            <a v-if="item.platformHandle" :href="item.platformHandle" target="_blank" style="text-decoration: none;">{{item.platformSku}}</a>
                                            <span v-else>{{item.platformSku}}</span>
                                        </template>
                                        <template v-if="item.platformVariants">
                                            <span class="slpit-inline"> / </span> <span style="color:#bfbaba;">{{item.platformVariants}}</span>
                                        </template>
                                    </li>
                                </template>
                                <li>
                                    <label class="label">SKU</label>
                                    <template v-if="item.skuCode">
                                        {{item.skuCode}} * <span class="quantity">{{item.quantity}}</span>
                                        <template v-if="item.variants && item.variants.length">
                                            <span class="slpit-inline"> / </span> <span style="color:#ccc;">{{item.variants.join(' - ')}}</span>
                                        </template>
                                    </template>
                                </li>
                                <li v-if="item.type === '加单'" style="color:#f90000;">加单SKU</li>
                                <li>
                                    <template v-if="item.type === '赠品'">
                                        赠品
                                    </template>
                                    <template v-else>
                                        <label class="label">SKU折后单价</label>
                                        <span style="color:#f90000;">{{formatPrice(item.skuAfterCapitationDiscountPrice, true)}}</span>
                                        <span v-if="isCodShop" style="color:#f90000; padding-left: 15px;">
                                            {{formatPrice(item.skuAfterCapitationDiscountPriceUsd, true, usdCurrency)}}
                                        </span>
                                        <span v-if="item.promotionProduct">
                                            <svg-icon icon-class="promotions" style="margin-left:10px; color:#F44336; font-size:18px;" />
                                        </span>
                                    </template>
                                    <label style="padding-left: 30px;">折扣金额</label>
                                    <span style="color:#f90000;">{{formatPrice(item.skuDiscountPrice)}}</span>
                                    <span v-if="isCodShop" style="color:#f90000; padding-left: 15px;">
                                        {{formatPrice(item.skuDiscountPriceUsd, false, usdCurrency)}}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </template>
                </inner-table>
            </div>
        </div>
    </div>
</template>

<script>
import InnerTable from '@/shared/components/StarLinkTable/inner_table'
import ShowImage from '@/shared/components/StarLinkTable/show_image'
import {
    usdCurrency,
    orderTypeOps
} from '@/shared/utils/order'
export default {
    name: 'OrderSkuDetail',
    components: {
        InnerTable,
        ShowImage
    },
    props: {
        row: Object
    },
    data() {
        return {
            imgParams: {
                width: 68,
                height: 68
            },
            usdCurrency,
            orderTypeOps
        }
    },
    computed: {
        orderGatway() {
            return (ele) => {
                if (!ele.plugin && !ele.gateway) {
                    return '无'
                } else {
                    return `${ele.plugin ? '插件' : ''} ${
                        ele.plugin && ele.gateway ? '-' : ''
                    } ${ele.gateway}`
                }
            }
        },
        proInfoItem() {
            return (ele) => {
                let data = ele.prodInfoItemListResponses.map(item => [item])
                return data
            }
        },
        isCodShop() {
            return this.row.shopType === this.orderTypeOps.COD
        },
        isCodOrder() {
            return this.row.orderType === this.orderTypeOps.COD
        }
    },
    methods: {
        handleClick(ele) {
            this.$emit('sendEvent', 'showPlatformOrderDetail', ele.orderId)
        },
        formatPrice(price, isShowZero, currency = this.row.currency) {
            return price ? `${currency} ${price}` : isShowZero ? `${currency} 0` : ''
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
