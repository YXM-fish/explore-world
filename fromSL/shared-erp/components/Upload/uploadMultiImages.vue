<template>
    <div class="upload-container">
        <ul>
            <draggable v-model="imageUrls" @end="dragEnded" :options="{disabled: readOnly}">
                <li v-for="(item,index) in imageUrls" v-bind:key="index" class="draggable-li">
                    <div v-if="!item.deleted" class="preview" @click="selectImage(item)"
                        v-bind:class="{'selected': item.selected}" @mouseover="setShowBtn(true, index)"
                        @mouseleave="setShowBtn(false, index)">
                        <showImage :src="item.src" :params="params" direction="right" :showZoomIcon="true"
                            :showDownload="true" :showBtn="showBtnArr[index]" :imageZoomSize="imageZoomSize">
                        </showImage>
                        <template v-if="oldImgCanDel && showBtnArr[index]">
                            <i v-if="!item.selected && !readOnly" @click.stop="rmImage(index)"
                                class="delete el-icon-delete"></i>
                        </template>
                        <template v-else>
                            <template v-if="!item.selected && !readOnly && showBtnArr[index]">
                                <i v-if="!oldImages.includes(item.src)" @click.stop="rmImage(index)"
                                    class="delete el-icon-delete"></i>
                            </template>
                        </template>
                        <i class="selector el-icon-success"></i>
                        <div class="img-wrap-cover" v-if="showBtnArr[index]"></div>
                    </div>
                </li>
            </draggable>
            <li v-if="isAddUploader && !readOnly">
                <div class="upload image-uploader" @click="()=> {this.$refs.fileBtn.click()}">
                    <i class="el-icon-plus" />
                    <input type="file" name="file" @change="imageChanged" multiple="true" ref="fileBtn"
                        accept="image/*" />
                </div>
            </li>
        </ul>
        <div class="operation" v-if="!readOnly">
            <el-button type="default" @click="doCancel">{{$t('button.cancel')}}</el-button>
            <el-button type="primary" @click="doOk">{{$t('button.confirm')}}</el-button>
        </div>
    </div>
</template>

<script>
import UploadFileImage from '@/api/basicData/upload'
import draggable from 'vuedraggable'
import ShowImage from 'components/StarLinkTable/show_image'
import { fileToMd5 } from 'utils'
import { messageTip } from 'utils/UITools.js'
import { validateImgFile } from 'utils/imageHelper'
import { clientUploadFile } from 'utils/clientUploadFile'

export default {
    props: {
        initImgUrls: {
            type: Array,
            required: false,
            default: null
        },
        selectedImage: {
            type: Object,
            required: false,
            default: () => ({
                url: undefined
            })
        },
        multiSelect: {
            type: Boolean,
            required: false,
            default: true
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
            // 从接口获取的图片可删除
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
        imageZoomSize: {
            width: 800,
            height: 800
        }
    },
    created() {},
    data() {
        let images = this.initImgUrls.map((item) => {
            let images = {
                src: item.src,
                hash: item.hash,
                selected: false,
                deleted: item.deleted
            }
            if (item.src === this.selectedImage.url) {
                images.selected = true
            }
            return images
        })
        let oldImages = []
        if (this.presenceImages) {
            oldImages = this.presenceImages.map((item) => item.src)
        } else {
            oldImages = this.initImgUrls.map((item) => item.src)
        }
        return {
            oldImages: oldImages,
            imageUrls: images,
            changeedImage: '',
            selectedImageUrls: [],
            localImageUrls: [],
            params: {
                width: 180,
                height: 180,
                boderWidth: 180,
                boderHeight: 180
            },
            showBtnArr: []
        }
    },
    methods: {
        setShowBtn(val, index) {
            this.$set(this.showBtnArr, index, val)
        },
        rmImage(index) {
            this.$confirm('确实要删除该图片吗？', '提示', {
                lockScroll: false
            }).then(
                () => {
                    this.imageUrls.splice(index, 1)
                },
                () => {}
            )
        },
        async imageChanged(e) {
            let arr = []
            let oldImgArr = this.imageUrls.map((item) => item.hash)
            for (let i = 0; i < e.target.files.length; i++) {
                let _image = e.target.files[i]
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
                    allowProportion: this.allowProportion
                }
                validateImgFile(_image, params).then((res) => {
                    let { errorType = '' } = res
                    if (!errorType) {
                        this.handleUpload(_image)
                    }
                })
            })
            e.target.value = ''
        },
        handleUpload(_image) {
            if (this.uploadByClient) {
                // 产品图片由前端上传
                // this.clientPreUploadImages(_image)
                this.clientUploadImage(_image)
            } else {
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
                    this.imageUrls.push({
                        src: showUrl,
                        selected: false,
                        hash: md5
                    })
                })
                .catch(() => {})
        },

        backendUploadImages(_image) {
            UploadFileImage.uploadFile(_image, this.sourceType).then((dt) => {
                this.imageUrls.push({
                    src: dt.data.src,
                    hash: dt.data.hash,
                    selected: false
                })
            })
        },
        selectImage(item) {
            if (this.readOnly) {
                return
            }
            if (!this.multiSelect) {
                this.imageUrls.map((item) => {
                    item.selected = false
                })
            }
            item.selected = !item.selected
        },
        dragEnded() {},
        doCancel() {
            this.$emit('close')
        },
        doOk() {
            let selectImages = this.imageUrls
                .filter((item) => item.selected)
                .map((item) => item.src)
            if (selectImages.length == 0) {
                this.$message.error('请选择图片')
                return
            }
            this.$emit('selectOk', selectImages, this.imageUrls)
        }
    },
    watch: {
        initImgUrls(val) {
            this.imageUrls = val.map((item) => {
                let images = {
                    hash: item.hash,
                    src: item.src,
                    selected: false,
                    deleted: item.deleted
                }
                if (item.src === this.selectedImage.url) {
                    images.selected = true
                }
                return images
            })
            this.showBtnArr = Array.from({ length: val.length }).fill(false)
        },
        presenceImages(val) {
            this.oldImages = val.map((item) => item.src)
        },
        selectedImage(newValue) {
            this.imageUrls.map((item) => {
                this.$set(item, 'selected', false)
                if (item.src === newValue.url) {
                    this.$set(item, 'selected', true)
                }
            })
        }
    },
    components: {
        draggable,
        ShowImage
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
        margin-right: 10px;
        margin: 0 10px 10px 0px;
        .preview {
            border: 1px solid #f2f6fc;
            box-sizing: border-box;
            position: relative;
            text-align: center;
            vertical-align: middle;
            &:hover {
                cursor: pointer;
            }
            .selector {
                position: absolute;
                right: 2px;
                top: 2px;
                display: none;
                font-size: 24px;
                // font-weight: 800;
            }
            img {
                height: 178px;
                max-width: 178px;
            }
        }
        .selected {
            .selector {
                color: #67c23a;
                display: block;
            }
        }
    }
    .image-uploader {
        background-color: #fbfdff;
        border: 1px dashed #c0ccda;
        box-sizing: border-box;
        width: 180px;
        height: 180px;
        cursor: pointer;
        line-height: 185px;
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
    .operation {
        padding: 10px 5px;
        clear: both;
        text-align: right;
    }
    .draggable-li {
        cursor: move;
    }
    .preview {
        border: 1px solid #c0ccda;
        box-sizing: border-box;
        position: relative;
        text-align: center;
        vertical-align: middle;
        .mask-layer {
            width: 100%;
            height: 100%;
            background: #e3e5e6a6;
            position: absolute;
            top: 0;
            left: 0;
            cursor: all-scroll;
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
