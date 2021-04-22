<template>
    <!-- 收件人地址信息 -->
    <div>
        <div class="tab-pane-button">
            <el-button
                class="copy-btn"
                type="primary"
                plain
                @click="copyAddressInfo"
                v-clipboard:copy="clipboardAddress"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError">
                一键复制
            </el-button>
        </div>
        <el-row>
            <el-col :span="6">
                <label>收件人:</label>
                {{orderAddress.contactName}}
            </el-col>
            <el-col :span="6">
                <label>联系电话:</label>
                {{orderAddress.phone}}
            </el-col>
            <el-col :span="6">
                <label>联系电话2:</label>
                {{orderAddress.phone2}}
            </el-col>
            <el-col :span="6">
                <label>买家邮箱:</label>
                {{orderAddress.custormerPayAccount}}
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <label>国家/省份:</label>
                {{orderAddress.country}}
                <span style="color: #c0c4cc; padding:0 5px;">
                    <span v-if="orderAddress.country">/</span>
                    {{orderAddress.province || ''}}
                </span>
            </el-col>
            <el-col :span="6">
                <label>城市:</label>
                {{orderAddress.city}}
            </el-col>
            <el-col :span="6">
                <label>邮编:</label>
                {{orderAddress.zipCode}}
            </el-col>
            <el-col :span="4">
                <label>税号:</label>
                {{orderAddress.taxNo}}
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <label>身份证号:</label>
                {{orderAddress.idCard}}
            </el-col>
        </el-row>
        <el-row>
            <label>地址1:</label>
            {{orderAddress.address1}}
        </el-row>
        <el-row>
            <label>地址2:</label>
            {{orderAddress.address2}}
        </el-row>
    </div>
</template>

<script>
import {
    addressData
} from '@/shared/utils/order'
export default {
    name: 'AddressInfo',
    props: {
        orderAddress: Object
    },
    data() {
        return {
            addressInfo: {},
            clipboardAddress: ''
        }
    },
    computed: {},
    methods: {
        copyAddressInfo() {
            const clipBoardContent = []
            addressData.forEach(item => {
                let value = this.addressInfo[item.value]
                if (value) {
                    if (item.label === 'province') {
                        value += ' / ' + this.addressInfo.city
                    }
                    clipBoardContent.push(`${item.label}: ${value}`)
                }
            })
            this.clipboardAddress = clipBoardContent.join('\n')
        },
        // 复制成功时的回调函数
        onCopy(e) {
            this.$message.success('内容已复制到剪切板！')
        },
        // 复制失败时的回调函数
        onError(e) {
            this.$message.error('抱歉，复制失败！')
        }
    },
    watch: {
        orderAddress: {
            handler(newValu) {
                this.addressInfo = newValu
            },
            deep: true
        }
    }
}
</script>

<style lang="scss" scoped>
.tab-pane-button {
    text-align: right;
    margin-bottom: 10px;
}
label{
    color: #797979;
    margin-right: 8px;
}
</style>
