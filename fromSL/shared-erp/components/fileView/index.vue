<template>
    <p class="item">
        <span class="file-name" :title="item[nameKey]">{{item[nameKey]}}</span>
        <el-popover v-if="/\.(jpg|jpeg|png|bmp|tif|gif)$/.test(item[nameKey])" popper-class="tinymce-popper"
            placement="top" :close-delay="0" trigger="click">
            <div>
                <img :src="sourceImage(item.url, 450, 450)" />
            </div>
            <a slot="reference" :data-src="item.url">查看</a>
        </el-popover>
        <!-- <a :href="item.url" v-if="!/\.(doc|docx|xls|xlsx|xlsm|ppt|pptx|pdf)$/.test(item[nameKey])" target="_blank">查看</a> -->
        <!-- <a :href="item.url" :download="item[nameKey]">下载</a> -->
        <a style="margin-right:0;" @click="download(item.url,item[nameKey])">下载</a>
    </p>
</template>

<script>
import uploadAPI from '@/api/basicData/upload'
import { sourceImageToCut } from 'utils/helper'
export default {
    name: 'SlFileView',
    props: {
        item: {
            type: Object,
            default: function () {
                return {}
            }
        },
        nameKey: {
            type: String,
            required: false,
            default: 'fileName'
        }
    },
    data() {
        return {}
    },
    methods: {
        download(url, fileName) {
            this.$message.success('正在下载中...')
            uploadAPI.download(url, fileName)
        },
        sourceImage(src, w, h) {
            return sourceImageToCut(src, w, h)
        }
    }
}
</script>

<style scoped>
.item {
    text-align: left;
}
.file-name {
    display: inline-block;
    width: 100px;
    line-height: 20px;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
a {
    color: #409eff;
    text-decoration: underline;
    font-size: 12px;
    margin-right: 10px;
}
</style>