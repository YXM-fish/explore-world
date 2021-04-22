<template>
    <div class="upload-container" :class="{'surport-carousel':canSurportCarousel}">
        <ul>
            <draggable v-model="localImageUrls" :disabled="disableDrag" @end="dragEnded">
                <template v-if="sourceType">
                    <li v-for="(item, index) in imageUrls" v-bind:key="index" class="draggable-li">
                        <slot name="imgOutSideHeader" v-bind:index="index"></slot>
                        <div class="preview cell" :style="customStyle"
                            :class="{'highlight-pick': pickedUrl === item.src && pickStyleType === 'border', 'selected-imgs': pickedUrl === item.src && pickStyleType === 'check'}"
                            @click="pick(item.src)">
                            <slot name="imgInnerHeader" v-bind:index="index"></slot>
                            <showImage :src="item.src" :params="params" :direction="placement"
                                :imageZoomSize="imageZoomSize" ref="showZoomImg">
                            </showImage>

                            <slot name="imgInnerContent" v-bind:index="index">
                                <div class="mask-layer">
                                    <i @click.stop="rmImage(index)" class="el-icon-delete"></i>
                                    <a class="el-icon-download" @click="downloadFile(item.src)"></a>
                                    <i class="el-icon-zoom-in" @mouseenter="showZoomImg(index)"
                                        @mouseleave="hideZoomImg(index)"></i>
                                </div>
                            </slot>

                        </div>
                        <slot name="imgOutSideFooter" v-bind:index="index"></slot>
                    </li>
                </template>
                <template v-else>
                    <li v-for="(url, index) in imageUrls" v-bind:key="index" class="draggable-li">
                        <slot name="imgOutSideHeader" v-bind:index="index"></slot>
                        <div class="preview cell" :style="customStyle"
                            :class="{'highlight-pick': pickedUrl === url && pickStyleType === 'border', 'selected-imgs': pickedUrl === url && pickStyleType === 'check'}"
                            @click="pick(url)">
                            <showImage :src="url" :params="params" :direction="placement" :imageZoomSize="imageZoomSize"
                                ref="showZoomImg">
                                <slot name="imgInnerHeader" v-bind:index="index"></slot>
                            </showImage>

                            <slot name="imgInnerContent" v-bind:index="index">
                                <div class="mask-layer">
                                    <i v-if="isAddUploader && !isView && showDel" @click.stop="rmImage(index)"
                                        class="el-icon-delete"></i>
                                    <a class="el-icon-download" @click="downloadFile(url)"></a>
                                    <i class="el-icon-zoom-in" @mouseenter="showZoomImg(index)"
                                        @mouseleave="hideZoomImg(index)"></i>
                                </div>
                            </slot>
                        </div>
                        <slot name="imgOutSideFooter" v-bind:index="index"></slot>
                    </li>
                </template>
            </draggable>
            <li v-if="isAddUploader && isShowUploadInput">
                <div v-if="hasHeaderSlot" :style="{height: imgHeaderHeight + 'px'}"></div>
                <div v-if="!isView && ((limitCount && imageUrls.length !== limitCount) || !limitCount)"
                    class="upload image-uploader cell" @click="addImages" :style="customStyle">
                    <i class="el-icon-plus" />
                    <input type="file" name="file" @change="imageChanged($event)" multiple="true" ref="fileBtn"
                        accept="image/*" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import ShowImage from 'components/StarLinkTable/show_image'
import UploadFileImage from '@/api/basicData/upload'
import UploadFile from '@/api/basicData/upload'
import { fileToMd5, imageToBase64 } from 'utils'
import { messageTip } from 'utils/UITools.js'
import { sourceImageToCut } from 'utils/helper'
import { validateImgFile } from 'utils/imageHelper'
import { clientUploadFile } from 'utils/clientUploadFile'

export default {
    name: 'SlUploadImage',
    props: {
        imageUrls: {
            type: Array,
            required: false,
            default: null
        },
        placement: {
            type: String,
            required: false,
            default: 'right'
        },
        isAddUploader: {
            type: Boolean,
            required: false,
            default: true
        },
        width: {
            type: String,
            required: false,
            default: '120px'
        },
        height: {
            type: String,
            required: false,
            default: '120px'
        },
        sourceType: {
            type: String,
            required: false
        },
        multiWayUpload: {
            type: Boolean,
            required: false,
            default: false
        },
        params: {
            type: Object,
            required: false,
            default: () => {
                return {
                    width: 180,
                    height: 180,
                    boderWidth: 118,
                    boderHeight: 118
                }
            }
        },
        multipleUpload: {
            type: Boolean,
            required: false,
            default: true
        },
        isView: {
            type: Boolean,
            required: false,
            default: false
        },
        canSurportCarousel: {
            // 是否支持跑马灯效果
            type: Boolean,
            required: false,
            default: false
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
        pixelLimit: {
            // 像素限制 min默认100 max默认4096
            type: Object,
            default: () => ({
                limit: false,
                minWidth: undefined,
                minHeight: undefined,
                maxWidth: undefined,
                maxHeight: undefined
            })
        },
        canPick: {
            type: Boolean,
            default: false
        },
        requireBase64: {
            type: Boolean,
            default: false
        },
        limitCount: {
            type: Number,
            default: 0
        },
        imageZoomSize: {
            type: Object,
            default: () => ({ width: 320, height: 320 })
        },
        preRemove: {
            type: Function
        },
        pickStyleType: {
            type: String,
            default: 'border'
        },
        showDel: {
            type: Boolean,
            default: true
        },
        disableDrag: {
            type: Boolean,
            default: false
        },
        imgHeaderHeight: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            localImageUrls: this.imageUrls || [],
            file: '',
            isShowUploadInput: true,
            defaultAccept: ['jpg', 'jpeg', 'gif', 'png', 'ico', 'bmp'],
            clientUploadImagePath: ['PRODUCT', 'PRODUCT_SIZE_IMAGE'],
            pickedUrl: '',
            willUploadLength: 0, // 实际上将要上传的图片数量
            uploadedLength: 0 // 上传完成的图片数量（包含成功、失败）
        }
    },
    methods: {
        showZoomImg(index) {
            this.$refs['showZoomImg'][index] &&
                this.$refs['showZoomImg'][index].show()
        },
        hideZoomImg(index) {
            this.$refs['showZoomImg'][index] &&
                this.$refs['showZoomImg'][index].hide()
        },
        downloadFile(url) {
            let data = url.split('/')
            UploadFile.download(url, data[data.length - 1])
        },
        rmImage(index) {
            if (this.preRemove) {
                this.preRemove(this.imageUrls[index], () => {
                    this.imageUrls.splice(index, 1)
                })
            } else {
                this.$confirm('确实要删除该图片吗？', '提示', {
                    lockScroll: false
                }).then(
                    () => {
                        this.imageUrls.splice(index, 1)
                    },
                    () => {}
                )
            }
        },
        async imageChanged(e) {
            let files = e.target.files
            let arr = []
            if (
                this.limitCount &&
                files.length + this.imageUrls.length > this.limitCount
            ) {
                this.$message({
                    type: 'error',
                    message: `最多上传 ${this.limitCount} 张图片`
                })
            }
            let count = this.limitCount - this.imageUrls.length
            let oldImgArr = this.imageUrls.map((item) => item.hash)
            for (let i = 0; i < files.length; i++) {
                if (this.limitCount && count <= 0) continue
                count--
                const _image = files[i]
                let md5 = await fileToMd5(_image)
                if (oldImgArr.includes(md5)) {
                    this.$message.closeAll()
                    messageTip(this, 'error', '图片已存在')
                    continue
                }

                if (!arr.map((item) => item.hash).includes(md5)) {
                    arr.push({
                        hash: md5,
                        _image
                    })
                }
            }

            arr.forEach(({ _image }) => {
                let params = {
                    needLimitSize: this.limitSize > 0,
                    maxSize: this.limitSize,
                    needLimitProportion: this.allowProportion.length > 0,
                    allowProportion: this.allowProportion,
                    pixelLimit: this.pixelLimit
                }
                validateImgFile(_image, params).then((res) => {
                    let { errorType = '' } = res
                    if (!errorType) {
                        this.handleUpload(_image)
                        this.willUploadLength++
                    }
                })
            })
            e.target.value = ''
        },
        handleUpload(_image) {
            const _ext = _image.name.substr(
                _image.name.lastIndexOf('.') + 1,
                _image.name.length
            )
            let needUpload = this.defaultAccept.includes(_ext.toLowerCase())
            if (needUpload && this.uploadByClient) {
                // 产品图片由前端上传
                // this.clientPreUploadImages(_image)
                this.clientUploadImage(_image)
            } else if (needUpload) {
                this.backendUploadImages(_image)
            }
        },

        clientUploadImage(file) {
            let params = {
                file,
                scope: this.scope,
                folder: this.folder
            }
            clientUploadFile(params)
                .then((res) => {
                    let { showUrl, md5 } = res
                    if (this.sourceType) {
                        this.imageUrls.push({
                            src: showUrl,
                            hash: md5
                        })
                    } else {
                        this.imageUrls.push(showUrl)
                    }
                })
                .catch(() => {})
                .finally(() => {
                    this.uploadedLength++
                })
        },
        backendUploadImages(_image) {
            // eslint-disable-next-line space-before-function-paren
            UploadFileImage.send(_image, this.sourceType)
                .then(async (dt) => {
                    let { hash, src, deleted } = dt.data
                    if (this.sourceType) {
                        this.imageUrls.push({
                            hash,
                            src,
                            deleted,
                            base64: this.requireBase64
                                ? await imageToBase64(_image)
                                : undefined
                        })
                    } else {
                        this.imageUrls.push(src)
                    }
                })
                .finally((res) => {
                    this.uploadedLength++
                })
        },
        dragEnded() {
            if (this.disableDrag) return
            let oldVal = JSON.parse(JSON.stringify(this.imageUrls))
            // 避免触发watch
            for (let i = 0; i < this.localImageUrls.length; i++) {
                this.$set(this.imageUrls, i, this.localImageUrls[i])
            }

            this.$emit('imageSort', { val: this.imageUrls, oldVal })
        },
        showCutImage(url) {
            return sourceImageToCut(url, 180, 180)
        },
        upload() {
            this.$refs.fileBtn.click()
        },
        addImages() {
            if (this.limitCount && this.uploadStatus === 'uploading') {
                this.$message.error('有图片正在上传中，请稍后再试')
                return
            }
            if (this.multiWayUpload) {
                this.$emit('handleClick')
            } else {
                this.upload()
            }
        },
        pick(url) {
            if (!this.canPick) return
            this.pickedUrl = url
            this.$emit('pick', url)
        }
    },
    computed: {
        customStyle() {
            return `width: ${this.width}; height: ${this.height}; line-height: ${this.height}`
        },
        uploadStatus() {
            return this.willUploadLength === this.uploadedLength
                ? 'done'
                : 'uploading'
        },
        hasHeaderSlot() {
            return !!this.$scopedSlots.imgOutSideHeader
        }
    },
    components: {
        draggable,
        ShowImage
    },
    watch: {
        imageUrls(val) {
            if (val) {
                this.localImageUrls = val
                if (!this.multipleUpload) {
                    this.isShowUploadInput = val.length >= 1 ? false : true
                }
            }
        },
        multiWayUpload(val) {
            this.multiWayUpload = val
        },
        uploadStatus(val) {
            this.$emit('uploadStatusChange', val)
        }
    },
    beforeDestroy() {
        this.$message.closeAll()
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'styles/mixin.scss';
.upload-container {
    width: 100%;
    position: relative;
    @include clearfix;
    ul {
        margin: 0px;
        padding: 0px;
    }
    ul li {
        list-style-type: none;
        float: left;
        padding: 0px;
        position: relative;
        margin-right: 11px;
        margin-bottom: 13px;
        .preview {
            border: 1px solid #f2f6fc;
            box-sizing: border-box;
            position: relative;
            text-align: center;
            vertical-align: middle;
            .mask-layer {
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.3);
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                align-items: center;
                justify-content: space-around;
                opacity: 0;
                transition: all 0.3s ease;

                > i,
                > a {
                    font-size: 15px;
                    color: #fff;
                    cursor: pointer;
                    display: none;
                }

                &:hover {
                    opacity: 1;

                    > i,
                    > a {
                        display: block;
                    }
                }
            }
            .delete {
                position: absolute;
                left: 2px;
                bottom: 2px;
                color: #fff;
                cursor: pointer;
                z-index: 2;
            }
        }
        .highlight-pick {
            border: 1px solid #409eff;
            overflow: hidden;
        }
        .selector {
            position: absolute;
            right: 2px;
            top: 2px;
            display: none;
            font-size: 24px;
        }
        .selected-imgs {
            .selector {
                color: #67c23a;
                display: block;
            }
        }
    } // .cell {
    //     width: 120px;
    //     height: 120px;
    // }
    .image-uploader {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        box-sizing: border-box;
        cursor: pointer; // line-height: 185px;
        vertical-align: top;
        position: relative;
    }
    .image-uploader i {
        font-size: 28px;
        color: #8c939d;
    }
    .upload {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        outline: none;
        > input[type='file'] {
            display: none;
            width: 100%;
            height: 100%;
        }
    }
    .draggable-li {
        cursor: move;
    }

    // 用于在很多图片的情况下支持手动走马灯效果,与html结构深度耦合,修改此组件时请注意
    &.surport-carousel {
        ul > div {
            display: inline-block;
        }
        ul li {
            float: none;
            display: inline-block;
            vertical-align: middle;
        }
    }
}

.img-wrap-cover {
    width: calc(100% - 4px);
    height: 16px;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}
</style>
