<template>
    <el-upload
        ref="uploader"
        action="/api/v1.0/data/upload/file"
        :before-remove="beforeRemove"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :on-error="uploadFailure"
        :on-success="uploadSuccess"
        :on-remove="removed"
        :on-progress="handleProgress"
        :accept="accept"
        :limit="limit"
        :list-type="listType"
        multiple
        :on-exceed="handleExceed"
    >
        <el-button type="text">点击上传</el-button>
    </el-upload>
</template>

<script>
export default {
    name: 'SlUploadFile',
    model: {
        prop: 'files',
        event: 'emitFile'
    },
    props: {
        files: {
            type: Array
        },
        limit: {
            // 限制上传的文件个数
            type: Number
        },
        listType: {
            // elementui上传组件展示风格
            type: String,
            default: 'text'
        },
        accept: {
            type: String,
            default: '.jpg,.jpeg,.png,.pdf,.xlsx,.xls,.docx,.doc, .zip, .rar, .arj, .z'
        },
        size: {
            type: Number,
            default: 51200
        }   // 单位：kb
    },
    data() {
        return {
            fileList: [],
            status: 'done'
        }
    },
    methods: {
        beforeRemove(file, fileList) {
            if (file.size > this.size * 1024) return true // 上传前触发beforeUpload钩子时，执行这条语句

            if (this.accept.indexOf(this.getFileType(file.name)) === -1)
                return true // 上传前触发beforeUpload钩子时，执行这条语句

            return this.$confirm(`确定移除 ${file.name}？`) // 上传完成后再删除时，执行这条语句
        },
        beforeUpload(file) {
            // 上传文件大小限制
            if (file.size > this.size * 1024) {
                this.$message.error(`${file.name}超出限制大小，大小不能超过 ${this.size / 1024}MB`)
                return false
            }
            // 上传文件类型限制
            if (this.accept.indexOf(this.getFileType(file.name)) === -1) {
                this.$message.error(
                    `${file.name}文件类型错误，请选择以${this.accept}为结尾的文件`
                )
                return false
            }
        },
        getFileType(fileName) {
            return fileName
                .substring(fileName.lastIndexOf('.') + 1)
                .toLowerCase()
        },
        removed(file, fileList) {
            this.getStatus(fileList)
            this.getFile(fileList)
        },
        uploadFailure(err, file, fileList) {
            this.getStatus(fileList)
            this.$message.error('上传失败！')
        },
        uploadSuccess(response, file, fileList) {
            this.$message.success('上传成功！')
            this.getStatus(fileList)
            this.getFile(fileList)
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `最多上传 ${this.limit} 个文件，请把已上传的文件删除后重新上传！`
            )
        },
        handleProgress(event, file, fileList) {
            this.status = 'uploading'
        },
        getStatus(fileList) {
            let count = 0
            for (let i = 0; i < fileList.length; i++) {
                if (fileList[i].status !== 'uploading') {
                    count++
                }
            }
            this.status = count === fileList.length ? 'done' : 'uploading'
        },
        getUploadStatus() {
            return this.status
        },
        getFile(fileList) {
            let files = []
            if (fileList && fileList.length) {
                fileList.forEach(f => {
                    let url =
                        f.response && f.response.data && f.response.data.src
                            ? f.response.data.src
                            : ''
                    if (url) {
                        files.push({
                            fileName: f.name,
                            url: url
                        })
                    }
                })
            }
            this.$emit('emitFile', files)
        },
        clear() {
            this.$refs.uploader.abort()
            this.status = 'done'
            this.fileList = []
            this.getFile([])
        }
    }
}
</script>

<style>
</style>