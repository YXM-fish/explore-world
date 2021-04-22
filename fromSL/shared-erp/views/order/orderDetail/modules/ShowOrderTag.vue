<template>
    <!-- 处理订单已经添加的Tag -->
    <div>
        <el-tag
            :color="item.colorNumber"
            size="medium" v-for="(item,index) in tagList"
            :key="index"
            :style="{'text-decoration': !item.status ? 'line-through': 'blink','color': '#ffffff'}"
            >
            {{ item.name}}
        </el-tag>
    </div>
</template>

<script>
import TagManageApi from '@/shared/api/order/virtualOrder/tag'
export default {
    name: 'ShowOrderTag',
    props: {
        virtualOrderId: Number
    },
    data() {
        return {
            tagList: []
        }
    },
    methods: {
        getCurTag() {
            TagManageApi.getHasTag(this.virtualOrderId).then((res) => {
                if (res.data) this.tagList = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
