<template>
    <div>
        <div class="tab-pane-button">
            <el-button type="primary" @click="queryStock">查询库存</el-button>
        </div>
        <el-popover
            placement="bottom-start"
            width="450"
            :close-delay="0"
            style="margin-bottom: 10px;"
            trigger="hover">
            <div style="color: #949494;">
                <p>1. 可用库存：当前库存的可用数量。</p>
                <p>2. 需求数量：订单上有效数量。</p>
                <p>3. 预分配数量：为预分配明细中SKU对应的预分配数量。</p>
                <p>4. 是否充足：当可用数量≥需求数量-预分配数量时，充足；可用数量＜需求数量-预分配数量时，不充足。</p>
                <p>5. 缺货数量：不充足的SKU，缺货数量=可用数量-（需求数量-预分配数量）。</p>
            </div>
            <div slot="reference">
                说明
                <i class="el-icon-question" style="font-size:14px;cursor: pointer;"></i>
            </div>
        </el-popover>
        <el-table :data="stockList" border max-height="250" v-loading="listLoading">
            <el-table-column type="index" label="#" width="50">
            </el-table-column>
            <el-table-column prop="skuCode" label="SKU" width="200">
                <template slot-scope="scope">
                    <span :class="className(scope.row)">{{scope.row.skuCode}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="warehouseName" label="仓库"></el-table-column>
            <el-table-column prop="available" label="可用库存"></el-table-column>
            <el-table-column prop label="需求量">
                <template slot-scope="scope">{{skuQuantity[scope.row.skuCode]}}</template>
            </el-table-column>
            <el-table-column prop="preAllocated" label="预分配数量">
            </el-table-column>
            <el-table-column prop="skuCode" label="是否充足">
                <template slot-scope="scope">{{isEnough(scope.row, 'text')}}</template>
            </el-table-column>
            <el-table-column prop="skuCode" label="缺货数量">
                <template slot-scope="scope">
                    <span class="danger">{{isEnough(scope.row, 'quantity')}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import WarehouseApi from '@/shared/api/warehouse'
export default {
    name: 'StockDetail',
    props: {
        warehouseId: Number,
        skuIds: Array,
        skuQuantity: Object
    },
    data() {
        return {
            stockList: [],
            listLoading: false,
            skuInfo: []
        }
    },
    computed: {
        isOutOfStock() {
            return (skuCode) => {
                let ops = this.skuInfo.find((item) => item.skuCode === skuCode)
                return ops && ops.isOutOfStock
            }
        },
        className() {
            return (data) => {
                if (this.isEnough(data, 'quantity')) {
                    return 'danger'
                }
                return data.preAllocated ? 'success' : ''
            }
        }
    },
    methods: {
        // 备注
        // 查询库存
        queryStock() {
            const params = {
                warehouseId: this.warehouseId,
                skuIds: this.skuIds,
                virtualOrderId: this.virtualOrderId
            }
            this.listLoading = true
            WarehouseApi.getInventory(params).then((res) => {
                this.listLoading = false
                this.stockList = res.data
            })
        },
        isEnough(row, type) {
            const { available, preAllocated, skuCode } = row
            const skuQuantity = this.skuQuantity[skuCode]
            if (!skuQuantity) {
                return ''
            }
            let surpluStock = available - (skuQuantity - preAllocated)
            let isOutOfStock = surpluStock < 0
            if (type === 'text') {
                return isOutOfStock ? '不充足' : '充足'
            } else if (type === 'quantity') {
                let ops = this.skuInfo.find(item => item.skuCode === skuCode)
                if (ops) {
                    ops.isOutOfStock = isOutOfStock
                } else {
                    this.skuInfo.push({
                        skuCode,
                        isOutOfStock,
                        skuQuantity
                    })
                    this.$emit('getSkuInfo', this.skuInfo)
                }
                return isOutOfStock ? Math.abs(surpluStock) : ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-pane-button {
    text-align: right;
    margin-bottom: 10px;
}
</style>
