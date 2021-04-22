<template>
    <div>
        <div class="status-box">
            <el-steps :space="220" :active="successStep" finish-status="success">
                <template v-for="(label, index) in statusOps">
                    <el-step :key="index" :title="label"></el-step>
                </template>
            </el-steps>
        </div>
    </div>
</template>

<script>
import {
    statusLabelOps
} from '@/shared/utils/order'
export default {
    name: 'OrderStatus',
    props: {
        statusName: {
            type: String
        },
        statusBeforeStopName: {
            type: String
        }
    },
    data() {
        return {
            successStep: 0,
            statusLabelOps,
            statusIndex: undefined,
            beforeStatusIndex: undefined
        }
    },
    computed: {
        statusOps() {
            if (this.statusIndex === -1) {
                let orderStatusOps = this.statusLabelOps.slice(0, this.beforeStatusIndex + 1)
                orderStatusOps.push(this.statusName)
                return orderStatusOps
            }
            return this.statusLabelOps
        }
    },
    watch: {
        statusName(newVal) {
            if (!newVal) {
                return
            }
            let index = this.statusLabelOps.indexOf(this.statusName)
            this.statusIndex = index
            if (index > -1) {
                this.successStep = index + 1
            } else {
                let beforeStatusIndex = this.statusLabelOps.indexOf(this.statusBeforeStopName)
                this.beforeStatusIndex = beforeStatusIndex
                this.successStep = beforeStatusIndex + 2
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .status-box {
        margin: 15px;
        border: solid 1px #dcd7d7;
        padding: 13px 15px 10px;
        border-radius: 4px;
        z-index: 100;
        /deep/ .el-step__head.is-process {
            color: #c0c4cc;
            border-color: #c0c4cc;
        }
        /deep/ .el-step__title.is-process {
            color: #c0c4cc;
            font-weight: 500;
        }
    }
</style>
