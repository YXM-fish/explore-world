<template>
    <div style="text-align:center">
        <el-button :type="buttonType" class="editor-upload-btn" @click="handleClick" :disabled="disabled">{{promptText}}
        </el-button>
        <el-dialog :close-on-click-modal="false" title="选择图片" :visible.sync="dialogImgSelctorVisible" width="60%"
            height="50%">
            <UploadMultiImage :initImgUrls="images" :multiSelect="multiSelect"
                @close="() => this.dialogImgSelctorVisible = false" @selectOk="imageSelectedCompleted">
            </UploadMultiImage>
        </el-dialog>
    </div>
</template>

<script>
import UploadMultiImage from 'components/Upload/uploadMultiImages'
import { Message } from 'element-ui'
export default {
    props: {
        promptText: {
            type: String,
            required: true
        },
        initImages: {
            type: Array,
            required: false
        },
        buttonType: {
            type: String,
            required: false,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        multiSelect: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data() {
        return {
            // images: ['//erp-image-dev-1255302958.piccd.myqcloud.com/2b4af850-62e0-11e8-a7d8-dd84c07f247f-p2457872646.jpg'],
            images: this.initImages || [],
            dialogImgSelctorVisible: false
        }
    },
    methods: {
        imageSelectedCompleted(urls) {
            if (urls && urls.length > 0) {
                this.dialogImgSelctorVisible = false
                this.$emit('onCompleted', urls)
            } else {
                Message({
                    message: '请选择图片',
                    type: 'warning'
                })
            }
        },
        handleClick() {
            if (!this.disabled) {
                this.dialogImgSelctorVisible = true
            }
        }
    },
    watch: {
        initImages(val) {
            this.images = val
        }
    },
    components: {
        UploadMultiImage
    }
}
</script>
