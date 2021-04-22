<template>
  <div class="uploadImage" :class="{'hide-upload':hideUpload}">
    <!-- 上传图片 -->
    <el-upload
      action="#"
      ref="uploader"
      :disabled="disabled"
      :multiple="multiple"
      list-type="picture-card"
      :accept="accept.join()"
      :file-list="images"
      :limit="limit"
      :on-success="onSuccess"
      :http-request="uploadFile"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
    >
      <i slot="default" class="el-icon-plus"></i>

      <!-- 图片图标 -- 展示图片 -->
      <template slot="file" slot-scope="{file}">
        <div class="container loading-module" v-loading="file.loading">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.src"
            @load="imgLoad(file)"
            @error="imgError($event,file)"
          />
          <span v-if="tools.length > 0" class="container-item-actions">
            <span
              v-if="tools.includes('zoom')"
              class="item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
            <span
              v-if="!disabled && tools.includes('download')"
              class="item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled && tools.includes('delete')"
              class="item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
        <div v-if="$slots.content" class="container-freedom">
          <slot name="content" :file="file"></slot>
        </div>
      </template>
    </el-upload>

    <!-- 预览图片 -->
    <el-dialog
      :visible.sync="dialogVisible"
      width="20%"
      :lock-scroll="false"
      :append-to-body="true"
    >
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import { downloadFile, fileToMd5, asyncSome } from '@/shared/util'
export default {
  name: 'SlUploadImages',
  model: {
    prop: 'images', // 上传图片列表
    event: 'changeUploadImages'
  },
  props: {
    images: {
      type: Array,
      required: false,
      default: () => { return [] }
    },
    // 0为商品图片 1为尺寸图片 2供应商资质图片
    imageType: {
      type: Number,
      required: false,
      default: undefined
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    // 当图片类型为产品图片、尺码图片时需传入产品spu编码，当图片类型为资质图片需传入供应商营业执照编号
    folder: {
      type: String,
      required: false,
      default: ''
    },
    limit: {
      type: Number,
      required: false,
      default: 100
    },
    accept: {
      type: Array,
      required: false,
      default: () => ['image/png', 'image/jpeg', 'image/jpg', 'image/bmp']
    },
    // 同时上传多张图
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    tools: {
      type: Array,
      default: () => ['zoom', 'download', 'delete']
    },
    // 限制图片的大小/尺寸/宽高
    limits: {
      type: Array,
      default: () => [
        {
          type: 'size',
          message: '',
          meta: {
            size: 4
          }
        },
        {
          type: 'scale',
          message: '',
          meta: {
            tip: '图片高宽比例仅支持1:1或3:4',
            scales: [1, 1.33]
          }
        },
        {
          type: 'ppi',
          message: `图片高宽均不能超过4096像素,不能小于100像素`,
          meta: {
            maxWidth: 4096,
            maxHeight: 4096,
            minWidth: 100,
            minHeight: 100
          }
        }
      ]
    }
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    hideUpload () {
      return this.limit > 0 && this.images.length >= this.limit
    }
  },
  methods: {
    ...mapActions('oss', [
      'GET_UPLOAD_API', // 预上传oss地址
      'UPLOAD_FILE' // 上传oss
    ]),
    imgLoad (file) {
      file['loadFailed'] = false
      file['failedTimes'] = 0
      this.$set(file, 'loading', false)
    },
    imgError (evt, file) {
      if (typeof file['failedTimes'] === 'undefined') {
        file['failedTimes'] = 1// 扩展：failedTimes字段,用于记录图片加载失败的次数
      }
      file['loadFailed'] = true// 扩展：loadFailed字符，用于记录图片最终加载结果
      let failedTimes = file['failedTimes']
      if (failedTimes >= 10) {
        this.$set(file, 'loading', false)
        return
      }

      if (file.src) {
        this.$set(file, 'loading', true)
      }

      // 限制错误图片只能加载10次就去掉loading效果
      if (failedTimes > 0 && failedTimes < 10) {
        setTimeout(() => {
          if (evt.target && file.src) {
            file['failedTimes']++
            evt.target.src = file.src
          }
        }, 500)
      }
    },
    beforeUpload (file) {
      return this.limitsHandler(file)
    },
    limitsHandler (file) {
      let defaultLimits = [
        {
          type: 'repeat',
          message: `图片重复,请重新上传`
        },
        {
          type: 'fileType',
          message: `图片格式不正确,仅支持${this.accept.join()}`,
          meta: {
            accept: this.accept
          }
        }
      ]
      let allLimits = defaultLimits.concat(this.limits)
      let someFilter = async (item) => {
        let isError = false
        let message = item.message
        switch (item.type) {
          case 'fileType':
            isError = !item.meta.accept.includes(file.type)
            break
          case 'repeat':
            isError = await this.limitRepeat(file)
            break
          case 'size':
            message = `图片大小不能超过${item.meta.size}M`
            isError = !this.limitSize(item, file)
            break
          case 'scale':
            message = item.meta.tip
            isError = !await this.limitScale(item, file, 'scale')
            break
          case 'ppi':
            isError = !await this.limitScale(item, file, 'ppi')
            break
        }
        if (isError) {
          this.$message.error(message)
          // 不符合条件中断上传
          return new Promise((resolve, reject) => { reject(new Error(isError)) })
        }
        return isError
      }
      return asyncSome(allLimits, someFilter)
    },
    addMd5 (file) {
      return fileToMd5(file).then((md5) => {
        return md5
      })
    },
    async limitRepeat (file) {
      try {
        // hash校验相同的图片
        const isHash = await this.addMd5(file)
        file.hash = isHash
        return this.images.some(item => item.hash === file.hash)
      } catch (error) {
        return error
      }
    },
    limitSize (limitItem, file) {
      return file.size / 1024 / 1024 <= limitItem.meta.size
    },
    limitScale (limitItem, file, status) {
      return new Promise((resolve, reject) => {
        try {
          let fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = (event) => {
            let image = new Image()
            image.src = event.target.result
            image.onload = function () {
              // 高宽比
              if (status === 'scale') {
                let scale = Number((image.height / image.width).toFixed(2))
                resolve(limitItem.meta.scales.includes(scale))
              }
              // 宽高是否超过最大值
              const maxScaleCondition = image.height < limitItem.meta.maxWidth && image.width < limitItem.meta.maxHeight
              const minScalConditon = image.height > limitItem.meta.minWidth && image.width > limitItem.meta.minHeight
              resolve(maxScaleCondition && minScalConditon)
            }
          }
        } catch (error) {
          resolve(false)
        }
      })
    },
    handleExceed () {
      this.$message.error(`上传图片不能超过${this.limit}张!`)
    },

    handleRemove (file) {
      const _this = this
      this.$confirm('确实要删除该图片吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        lockScroll: false,
        type: 'warning'
      }).then(() => {
        // 取消上传文件
        const filterImages = _this.images.filter(img => img.hash !== file.hash)
        this.emitImageChange(filterImages)
      })
    },

    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.src
      this.dialogVisible = true
    },
    handleDownload (file) {
      // 下载oss和本地图片下载到本地
      downloadFile(file.src, file.name)
    },
    onSuccess (response, file) {
      // 图片通过src字段渲染
      file.src = file.url
      delete file.url
      // 清空已上传的文件列表
      this.$refs.uploader && this.$refs.uploader.clearFiles()
    },
    uploadFile (file) {
      // 自定上传需要手动触发on-success方法
      file.onSuccess()
      this.preOssUrl(file).then(res => {
        this.gotoOss(res, file.file)
      })
    },
    preOssUrl (file) {
      // 获取预上传oss地址
      const params = { 'folder': this.folder, 'fileName': file.file.name, 'contentType': file.file.type, 'fileType': this.imageType }
      return this.GET_UPLOAD_API(params)
        .then(res => {
          return res.data
        })
    },
    gotoOss (data, file) {
      // 根据预上传oss地址上传图片到oss上 , Content-Type：如image/png 图片格式
      this.UPLOAD_FILE({
        preUploadUrl: data.preUploadUrl,
        file
      })
        .then(res => {
          const changeImages = {}
          changeImages.src = data.showUrl
          changeImages.hash = file.hash
          changeImages.name = file.name
          changeImages.uid = file.uid
          this.emitImageChange([...this.images, changeImages], file)
        })
    },
    emitImageChange (arr) {
      const filtersimage = this.filterImages(arr)
      this.$emit('changeUploadImages', filtersimage)
      // 用于表单验证change事件捕获
      if (this.$parent) {
        this.$parent.$emit('el.form.change')
      }
    },
    filterImages (arr) {
      const filters = []
      arr.forEach(res => {
        if (!filters.find(item => item.hash === res.hash)) {
          filters.push(res)
        } else {
          this.$message.error('图片重复,请重新上传')
        }
      })
      return filters
    }
  }

}

</script>

<style scoped lang="scss">
.uploadImage {
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 110px;
    height: unset;
    border: 0;
    outline-color: transparent; // 去掉点击图片黑色边框问题
  }

  /deep/.el-upload--picture-card {
    width: 110px;
    height: 110px;
  }

  /deep/.el-upload--picture-card {
    line-height: 110px;
  }
  /deep/ .el-upload-list__item {
    transition: none !important; // 取消动画效果
  }
  /deep/.el-upload-list__item.is-ready {
    display: none; // 图片闪烁问题
  }
  /deep/.el-upload-list__item-thumbnail {
    border-radius: 6px;
    object-fit: contain;
  }
  .loading-module {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .container {
    border: 1px solid #c0ccda;
    position: relative;
    border-radius: 6px;
    height: 110px;
    width: 110px;
    box-sizing: border-box;
    &-item-actions {
      // 图标设置
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #ffffff;
      visibility: hidden;
      transition: all 0.3s;
      object-fit: contain;
    }
    &:hover {
      .container-item-actions {
        visibility: visible;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
    &-freedom {
      margin: 10px 0 !important;
    }
    &:hover {
      .container-freedom {
        visibility: visible;
        background-color: unset;
      }
    }
  }
}
.hide-upload /deep/ {
  .el-upload {
    display: none;
  }
}
</style>
