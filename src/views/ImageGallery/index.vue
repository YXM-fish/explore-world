<template>
    <div style="padding-top: 300px;">
        <div class="wrapper">
            <YuImageGallery :list="list" :alwaysShowArrow="false" arrowPosition="outer" :arrowScale="1">
                <template v-slot="slotProps">
                    <div class="item" :style="{'background': colors[slotProps.index % 5]}">
                        {{slotProps.item}}
                    </div>
                </template>
            </YuImageGallery>
        </div>
        <el-input-number v-model="num" controls-position="right" :min="1"></el-input-number>
    </div>
</template>

<script>
import YuImageGallery from '@/components/YuImageGallery'
export default {
    data() {
        return {
            colors: ['#67C23A', '#E6A23C', '#F56C6C', '#909399', '#409EFF'],
            list: ['青', '青', '子', '衿', '悠'],
            num: 1
        }
    },
    components: {
        YuImageGallery
    },
    watch: {
        num(val, oldval) {
            let list = ['青', '青', '子', '衿', '悠', '悠', '我', '心', '呦', '呦', '鹿', '鸣', '食', '野', '之', '萍', '东', '临', '碣', '石', '以', '观', '沧', '海']
            if (val > oldval) {
                let index = Math.floor(Math.random() * list.length % list.length)
                this.list.push(list[index])
            } else {
                this.list.splice(0, 1)
            }
        }
    },
    mounted() {},
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 100%;
}
.item {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin: 0 2px;
    font-size: 50px;
    color: white;
    line-height: 100px;
    text-align: center;
}
</style>
