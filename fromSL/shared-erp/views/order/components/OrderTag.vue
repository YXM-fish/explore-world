<template>
    <el-dropdown class="filter-item" style="margin: 0px 15px 0px 15px" placement="top-start" trigger="click">
        <el-button type="primary" :disabled="disabled">
            订单标签
            <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
            <div class="tag-wrap">
                <el-dropdown-item style="padding:5px 10px" v-for="(item,index) in tagArr" :key="index">
                    <div class="span-wrap">
                        <el-tag size="medium"
                            v-bind:style="{ 'background-color': item.colorNumber,'color':'#ffffff','border-color': item.colorNumber}"
                            effect="dark">
                            {{item.name}}{{!item.status?' (已禁用)':''}}
                        </el-tag>
                        <el-button @click="deleteFlag(item)" style="float:right;" type="danger" icon="el-icon-delete"
                            circle size="mini"></el-button>
                        <el-button @click="addFlag(item)" :disabled="!item.status"
                            style="float:right;margin-right:20px;margin-left:20px;" type="success" icon="el-icon-check"
                            circle size="mini"></el-button>
                    </div>
                </el-dropdown-item>
            </div>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
import TagManageApi from '@/shared/api/order/virtualOrder/tag'
export default {
    name: 'OrderTag',
    props: {
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
        multipleSelections: {
            type: Array,
            default: () => [],
            required: true
        }
    },
    created() {
        this.getAllTag()
    },
    data() {
        return {
            tagArr: []
        }
    },
    methods: {
        getAllTag() {
            TagManageApi.getAllTag().then((res) => {
                if (res.data) {
                    this.tagArr = res.data
                }
            })
        },
        deleteFlag(item) {
            const virtualOrderIdArray = this.multipleSelections.map((item) => {
                return item.id
            })
            if (this.multipleSelections.length === 0) {
                this.$message.error('请选择订单')
                return
            }
            tagManage
                .amountForbidByOrder(item.id, virtualOrderIdArray)
                .then((res) => {
                    this.$message.success('批量删除订单标签成功！')
                    this.$emit('reload')
                })
        },
        addFlag(item) {
            const virtualOrderIdArray = this.multipleSelections.map((item) => {
                return item.id
            })
            if (this.multipleSelections.length === 0) {
                this.$message.error('请选择订单')
                return
            }
            tagManage
                .amountEnabledByOrder(item.id, virtualOrderIdArray)
                .then((res) => {
                    this.$message.success('批量添加订单标签成功！')
                    this.$emit('reload')
                })
        }
    },
    watch: {
        disabled(newValue, oldValue) {
            this.disabled = newValue
        }
    }
}
</script>

<style lang="scss" scoped>
.tag-wrap{
    max-height: 600px;
    overflow-y: auto;
}
</style>
