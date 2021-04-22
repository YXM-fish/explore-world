<template>
    <div>
        <div class="detail-order">
            <el-dialog
                ref="orderDetailDialog"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                @open="openDialog"
                @closed="closed"
                :lock-scroll="false"
                width="80%"
                top="10px"
                style="margin: 0 10px;"
                >
                <template slot="title">
                    <dialog-title :order-info="orderInfo"></dialog-title>
                </template>
                <order-info
                    :data="orderInfo"
                    :is-cod-shop="isCodShop"
                    :is-cod-order="isCodOrder">
                </order-info>
                <!-- 订单标签 -->
                <order-tag
                    ref="orderTag"
                    :virtual-order-id="virtualOrderId"
                    >
                </order-tag>
                <!-- 订单状态 -->
                <order-status
                    :statusName="statusName"
                    :statusBeforeStopName="statusBeforeStopName"
                ></order-status>
                <el-tabs tab-position="top" v-model="activeName">
                    <el-tab-pane
                        v-if="isShowAddress"
                        label="收货信息"
                        name="address"
                        class="tab-pane">
                        <address-info
                            :order-address="orderAddress"
                        ></address-info>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="isShowCustoms"
                        label="报关信息"
                        name="customs"
                        class="tab-pane">
                        <customs-clearance :declare-responses="declareResponses"></customs-clearance>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="isShowLogistic"
                        label="物流信息"
                        name="logistics"
                        class="tab-pane">
                        <logistics-info :order-info="orderInfo"></logistics-info>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="isShowSystemNote"
                        label="系统备注"
                        name="note"
                        class="tab-pane">
                        <system-note ref="systemNote" :virtual-order-id="virtualOrderId"></system-note>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="isShowCustomerNote"
                        label="客户留言"
                        name="orderNote"
                        class="tab-pane">
                        <customer-note :note-list="orderNoteList"></customer-note>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="isShowPlatformInfo"
                        label="平台信息"
                        name="platformInfo"
                        :lazy="true"
                        class="tab-pane" >
                        <platform-info :platform-info="platformInfo"></platform-info>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="isShowLog"
                        label="操作日志"
                        name="log"
                        class="tab-pane" >
                        <log-list ref="logList" :virtual-order-id="virtualOrderId"></log-list>
                    </el-tab-pane>
                    <el-tab-pane
                        v-if="isShowTrackingNumber"
                        label="跟踪号历史"
                        name="trackingNumber"
                        class="tab-pane">
                        <tracking-number :track-number-history="trackNumberHistory"></tracking-number>
                    </el-tab-pane>
                    <el-tab-pane
                        label="库存详情"
                        class="tab-pane"
                        name="stock"
                        v-if="isShowStock">
                        <stock-detail
                            ref="stockDetail"
                            :warehouse-id="warehouseId"
                            :sku-quantity="skuQuantity"
                            :sku-ids="skuIds"
                            @getSkuInfo="getSkuStockInfo"
                        ></stock-detail>
                    </el-tab-pane>
                </el-tabs>
                <!-- 平台+ SKU详情 -->
                <sku-detail
                    :order-info="orderInfo"
                    :is-cod-shop="isCodShop"
                    :is-cod-order="isCodOrder"
                    :sku-info="skuInfo"
                    >
                </sku-detail>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="close">{{$t('button.close')}}</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import DialogTitle from './modules/DialogTitle.vue'
import OrderInfo from './modules/OrderInfo.vue'
import OrderTag from './modules/ShowOrderTag.vue'
import OrderStatus from './modules/OrderStatus.vue'
import AddressInfo from './modules/AddressInfo.vue'
import CustomsClearance from './modules/CustomsClearance.vue'
import LogisticsInfo from './modules/LogisticsInfo.vue'
import SystemNote from './modules/SystemNote.vue'
import CustomerNote from './modules/CustomerNote.vue'
import PlatformInfo from './modules/PlatformInfo.vue'
import LogList from './modules/LogList.vue'
import TrackingNumber from './modules/TrackingNumber.vue'
import StockDetail from './modules/StockDetail.vue'
import SkuDetail from './modules/SkuDetail.vue'

import VirtualOrderApi from '@/shared/api/order/virtualOrder'
import { scrollback } from '@/shared/utils/index'
export default {
    components: {
        OrderInfo,
        DialogTitle,
        OrderTag,
        OrderStatus,
        AddressInfo,
        CustomsClearance,
        LogisticsInfo,
        SystemNote,
        CustomerNote,
        PlatformInfo,
        LogList,
        TrackingNumber,
        StockDetail,
        SkuDetail
    },
    props: {
        virtualOrderId: Number,
        activeTabName: {
            type: String,
            default: 'address'
        },
        isShowAddress: {
            type: Boolean,
            default: true
        },
        isShowCustoms: {
            type: Boolean,
            default: true
        },
        isShowLogistic: {
            type: Boolean,
            default: true
        },
        isShowSystemNote: {
            type: Boolean,
            default: true
        },
        isShowCustomerNote: {
            type: Boolean,
            default: true
        },
        isShowPlatformInfo: {
            type: Boolean,
            default: true
        },
        isShowLog: {
            type: Boolean,
            default: true
        },
        isShowTrackingNumber: {
            type: Boolean,
            default: true
        },
        isShowTabStock: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dialogVisible: false,
            orderInfo: {},
            orderTypeOps: this.$dictionary.get('orderTypeOps'),
            statusName: '',
            statusBeforeStopName: '',
            disabledStop: false,
            activeName: 'address',
            orderAddress: {}, // 收件人地址
            declareResponses: [], // 报关信息
            systemNotes: [],
            orderNoteList: [],
            platformInfo: [],
            trackNumberHistory: [],
            skuIds: [],
            skuQuantity: {},
            warehouseId: undefined,
            platformOrderList: [],
            skuInfo: []
        }
    },
    computed: {
        isCodShop() {
            return this.orderInfo.shopType === this.orderTypeOps.COD
        },
        isCodOrder() {
            return this.orderInfo.orderType === this.orderTypeOps.COD
        },
        isShowStock() {
            if (this.isShowTabStock) {
                let { status, exceptionStatus } = this.orderInfo
                let statusArr = ['ORDERED', 'APPROVED', 'GETTED']
                if (statusArr.includes(status)) {
                    if (exceptionStatus !== 'SKU_MATCHED_FAIL' && this.skuIds.length) {
                        return true
                    }
                }
            }
            return false
        }
    },
    created() {
    },
    methods: {
        openDialog() {
            this.getVirtualOrder()
            this.$nextTick(() => {
                this.$refs.orderTag.getCurTag()
                this.isShowSystemNote && this.$refs.systemNote.getNote()
                this.isShowLog && this.$refs.logList.getList(this.virtualOrderId)
            })
        },
        getVirtualOrder(cb) {
            // 按钮状态恢复初始值
            VirtualOrderApi.get(this.virtualOrderId, {
                showLoad: true
            }).then((res) => {
                let { data, data: {
                    statusName,
                    statusBeforeStopName,
                    orderShippingAddress,
                    declareResponses,
                    orderNoteList,
                    platformInfo,
                    platformOrderList,
                    trackNumberHistorySet,
                    warehouseId
                }} = res
                this.orderInfo = data
                this.statusName = statusName
                this.statusBeforeStopName = statusBeforeStopName
                this.orderAddress = orderShippingAddress
                this.declareResponses = declareResponses
                this.orderNoteList = orderNoteList
                this.trackNumberHistory = trackNumberHistorySet
                this.warehouseId = warehouseId
                this.platformOrderList = platformOrderList
                // 平台信息
                this.platformInfo = platformInfo.filter(
                    (item) => item.content
                )
                platformOrderList.forEach(ele => {
                    ele.prodInfoItemList.forEach(item => {
                        if (item.skuId) {
                            let { skuCode, quantity } = item
                            this.skuIds.push(item.skuId)
                            if (this.skuQuantity[skuCode]) {
                                const count = this.skuQuantity[skuCode] + quantity
                                this.$set(this.skuQuantity, skuCode, count)
                            } else {
                                this.$set(
                                    this.skuQuantity,
                                    skuCode,
                                    quantity
                                )
                            }
                        }
                    })
                })
                cb && cb()
                this.$nextTick(() => {
                    if (this.isShowStock) {
                        this.$refs.stockDetail.queryStock()
                    }
                })
            })
        },
        getSkuStockInfo(data) {
            this.$set(this, 'skuInfo', data)
        },
        close() {
            this.dialogVisible = false
        },
        closed() {
            if (this.isBackBeforeHeight) {
                scrollback()
            }
        }
    },
    watch: {
        activeTabName(newVal) {
            this.activeName = newVal
        }
    }
}
</script>

<style lang="scss" scoped>
    .tab-pane{
        margin: 10px 20px;
        .tab-pane-button {
            text-align: right;
            margin-bottom: 10px;
        }
        /deep/ .el-row{
            margin: 10px 0;
        }
    }
</style>
