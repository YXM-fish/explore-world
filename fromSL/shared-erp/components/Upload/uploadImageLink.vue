<template>
    <div style="text-align:center">
        <showImage v-if="image.url" :src="image.url" :operation="true" :title="showImageTitle"
            @handleClick="handleClick" :params="params" :imageZoomSize="imageZoomSize">
        </showImage>
        <el-button type="text" class="editor-upload-btn" @click="handleClick" v-if="!image.url">{{promptText}}
        </el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogImgSelctorVisible" :append-to-body="true" width="60%"
            height="50%" :lock-scroll="false" :close-on-click-modal="false" center>
            <upload-image :initImgUrls="images" :presenceImages="presenceImages" :selectedImage="image"
                :multiSelect="false" placement="right" :sourceType="sourceType"
                @close="() => this.dialogImgSelctorVisible = false" @selectOk="imageSelectedCompleted"
                :isAddUploader="isAddUploader" :readOnly="readOnly" :oldImgCanDel="oldImgCanDel"
                :allowProportion="allowProportion" :limitSize="limitSize" :uploadByClient="uploadByClient"
                :scope="scope" :folder="folder">
            </upload-image>
        </el-dialog>
    </div>
</template>

<script>
import UploadImage from 'components/Upload/uploadMultiImages'
import ShowImage from 'components/StarLinkTable/show_image'
import { imageToBase64 } from 'utils'
export default {
    name: 'UploadImageLink',
    props: {
        data: String,
        image: {
            type: Object,
            required: false,
            default: () => ({
                url: undefined
            })
        },
        promptText: {
            type: String,
            required: true
        },
        initImages: {
            type: Array,
            required: false,
            default: () => {
                return []
            }
        },
        isAddUploader: {
            type: Boolean,
            required: false,
            default: true
        },
        sourceType: {
            type: String,
            required: false
        },
        presenceImages: {
            type: Array,
            required: false
        },
        readOnly: {
            type: Boolean,
            required: false,
            default: false
        },
        oldImgCanDel: {
            type: Boolean,
            required: false,
            default: false
        },
        imageIndex: {
            type: Number
        },
        params: {
            type: Object,
            required: false,
            default: () => {
                return {
                    width: 48,
                    height: 48
                }
            }
        },

        uploadByClient: {
            // 客户端上传
            type: Boolean,
            required: false,
            default: false
        },
        scope: {
            /**
             * 图片上传的服务器(客户端上传时有效)
             * 'WWW': 传到S3
             * 'INTERNAL': 传到腾讯
             */
            type: String,
            default: 'INTERNAL',
            validator: function (value) {
                return ['WWW', 'INTERNAL'].indexOf(value) !== -1
            }
        },
        folder: {
            /**
             * 图片在服务器上的路径(客户端上传时有效；前后端约定)
             */
            type: String,
            required: false,
            default: ''
        },

        allowProportion: {
            // 图片比例限制，不传为不限制
            type: Array,
            required: false,
            default: () => []
        },
        limitSize: {
            // 图片大小限制，单位为Mb，不传为不限制
            type: [String, Number],
            required: false,
            default: ''
        },
        requireBase64: {
            type: Boolean,
            default: false
        },
        imageZoomSize: {
            type: Object,
            default: () => ({ width: 320, height: 320 })
        }
    },
    data() {
        return {
            images: this.initImages,
            dialogImgSelctorVisible: false,
            clientUploadSourceType: ['PRODUCT', 'PRODUCT_SIZE_IMAGE']
        }
    },
    computed: {
        showImageTitle() {
            return this.readOnly ? '点击查看更多' : '点击更换图片'
        },
        dialogTitle() {
            return this.readOnly ? '查看图片' : '选择图片'
        }
    },
    methods: {
        async imageSelectedCompleted(selectImages, images) {
            let dImages = []
            for (let el of images) {
                dImages.push({
                    ...el,
                    base64: this.requireBase64
                        ? await imageToBase64(el.src)
                        : undefined
                })
            }
            this.dialogImgSelctorVisible = false
            this.image.url = selectImages[0]
            if (typeof this.imageIndex === 'undefined') {
                this.$emit('onCompleted', dImages, selectImages[0], this.data)
            } else {
                this.$emit('onCompleted', {
                    images: dImages,
                    selected: selectImages[0],
                    index: this.imageIndex
                })
            }
        },
        handleClick() {
            if (this.isAddUploader) {
                this.dialogImgSelctorVisible = true
            }
        }
    },
    watch: {
        initImages(val) {
            this.images = val
        },
        image(val) {
            this.image = val
        },
        isAddUploader(val) {
            this.isAddUploader = val
        }
    },
    components: {
        UploadImage,
        ShowImage
    }
}
</script>
