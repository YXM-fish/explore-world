<template>
    <div class="tinymce-editor">
        <div v-show="disabled">
            <editor v-model="myValue" :init="init" :disabled="true" @onClick="onClick"></editor>
        </div>
        <div v-show="!disabled">
            <editor v-model="myValue" :init="init" :disabled="false" @onClick="onClick"></editor>
        </div>
        <input class type="file" name="file" @change="imageChanged" multiple="true" ref="fileBtn" accept="image/*" />
    </div>
</template>

<script>
import UploadFileImage from '@/api/basicData/upload'
import { imgToBase64, base64ToBlob, fileToMd5, isEmpty } from 'utils'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
//import 'tinymce/icons/default/icons.min.js'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/code'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/fullscreen'

export default {
    name: 'SlTinymceEditor',
    components: {
        Editor
    },
    props: {
        // 传入一个value，使组件支持v-model绑定
        value: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        height: {
            type: Number,
            required: false,
            default: 700
        },
        minHeight: {
            type: Number,
            required: false,
            default: 350
        },
        plugins: {
            type: [String, Array],
            default:
                'lists image table textcolor wordcount contextmenu autoresize code paste fullscreen'
        },
        toolbar: {
            type: [String, Array],
            default: () => {
                return [
                    'undo redo | fontselect | fontsizeselect | formatselect | copy | bold italic underline strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table  removeformat  code  fullscreen | customUpload | customClear'
                ]
            }
        },
        removeImgSizeOnPaste: {
            // 是否清除粘贴内容中图片的宽高属性
            type: Boolean,
            default: false
        },
        ax_wordlimit_num: {
            type: Number,
            default: 0
        }
    },
    data() {
        let baseUrl = '/static/tinymce/'
        let _this = this
        return {
            // 初始化配置
            init: {
                //height: this.height,
                skin_url: `${baseUrl}skins/ui/oxide`,
                content_css: `${baseUrl}/skins/content/default/content.css`,
                plugins: this.plugins,
                toolbar: this.toolbar,
                branding: false,
                menubar: false,
                min_height: this.minHeight,
                max_height: this.height,
                language: 'zh_CN',
                language_url: `${baseUrl}zh_CN.js`,
                image_dimensions: false,
                image_uploadtab: false,
                paste_data_images: false,
                paste_webkit_styles: 'all',
                paste_retain_style_properties: 'all',
                // ax_wordlimit_num:
                //     this.ax_wordlimit_num == 0 ? false : this.ax_wordlimit_num,
                // ax_wordlimit_callback: function (editor, txt, num) {
                //     _this.$message.error(
                //         '当前字数：' + txt.length + '，限制字数：' + num
                //     )
                // },
                paste_postprocess: (plugin, args) => {
                    let imgs = args.node.querySelectorAll('img')

                    if (this.removeImgSizeOnPaste) {
                        this.clearnImgSize(imgs)
                    }

                    // this.uploadImgs(imgs);
                },
                setup: function (editor) {
                    editor.ui.registry.addButton('customUpload', {
                        text: '上传图片',
                        icon: 'image',
                        tooltip: '上传图片时按住Ctrl键可选择多张图片同时上传',
                        onAction: function (_) {
                            _this.addImages()
                        }
                    })

                    editor.ui.registry.addButton('customClear', {
                        text: '清空内容',
                        onAction: function (_) {
                            _this.clear()
                        }
                    })
                },
                valid_children: '+body[style]', // 不过滤style标签
                protect: [/<script(\s+[\s\S]*)?>[\s\S]*<\/script>/g],
                non_empty_elements:
                    // First the list of tags that it normally knows about by default:
                    'td,th,iframe,video,audio,object,script,pre,code,area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,source,wbr,track' +
                    // Now we add tags related to SVGs that it doesn't normally know about:
                    'svg,defs,pattern,desc,metadata,g,mask,path,line,marker,rect,circle,ellipse,polygon,polyline,linearGradient,radialGradient,stop,image,view,text,textPath,title,tspan,glyph,symbol,switch,use',
                extended_valid_elements:
                    'svg[*],defs[*],pattern[*],desc[*],metadata[*],g[*],mask[*],path[*],line[*],marker[*],rect[*],circle[*],ellipse[*],polygon[*],polyline[*],linearGradient[*],radialGradient[*],stop[*],image[*],view[*],text[*],textPath[*],title[*],tspan[*],glyph[*],symbol[*],switch[*],use[*]'
            },
            myValue: this.value,
            selectionBookmark: ''
        }
    },
    mounted() {
        tinymce.init({})
    },
    methods: {
        // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
        // 需要什么事件可以自己增加
        onClick(e) {
            // this.$emit('onClick', e, tinymce)
        },
        addImages() {
            this.$refs.fileBtn.click()
        },
        imageChanged(e) {
            let imgHtml = ''
            for (let i = 0; i < e.target.files.length; i++) {
                const _image = e.target.files[i]

                let hashPromise = fileToMd5(_image)
                hashPromise.then((md5) => {
                    this.clientPreUploadImages(
                        _image,
                        imgHtml,
                        i,
                        e.target.files.length,
                        md5
                    )
                })
            }
        },
        clientPreUploadImages(_image, imgHtml, imgIndex, imgLength, md5) {
            let protocol = document.location.href.split('://')[0]

            let params = {
                fileName: _image.name,
                contentType: _image.type,
                scope: 'WWW',
                folder: 'products',
                md5,
                protocol
            }
            UploadFileImage.getFilePreSign(params).then((res) => {
                let { data } = res
                if (!isEmpty(data)) {
                    if (!data.exists) {
                        this.clientUploadImages(
                            data,
                            _image,
                            imgHtml,
                            imgIndex,
                            imgLength,
                            {
                                contentType: params.contentType,
                                folder: params.folder,
                                md5: params.md5,
                                scope: params.scope,
                                url: null
                            }
                        )
                    } else {
                        this.insertImgHtmlIntoEditor(
                            imgHtml,
                            data.showUrl,
                            imgIndex,
                            imgLength
                        )
                    }
                }
            })
        },
        clientUploadImages(
            data,
            _image,
            imgHtml,
            imgIndex,
            imgLength,
            nextStepReqParams
        ) {
            let { showUrl } = data
            nextStepReqParams.url = showUrl

            this.$store
                .dispatch('clientUploadImages', { data, _image })
                .then(() => {
                    UploadFileImage.uploadResult(nextStepReqParams).then(() => {
                        this.insertImgHtmlIntoEditor(
                            imgHtml,
                            showUrl,
                            imgIndex,
                            imgLength
                        )
                    })
                })
        },
        insertImgHtmlIntoEditor(imgHtml, imgUrl, imgIndex, imgLength) {
            imgHtml = `<img src='${imgUrl}'/>`
            if (!this.myValue) {
                this.myValue = `<p>${imgHtml}</p>`
            } else {
                tinymce.activeEditor.insertContent(imgHtml)
            }
            if (imgIndex === imgLength - 1) {
                this.$refs.fileBtn.value = ''
            }
        },
        // 清空内容
        clear() {
            this.myValue = ''
        },
        clearnImgSize(imgs) {
            if (imgs && imgs.length > 0) {
                Array.prototype.slice.call(imgs).forEach((img) => {
                    img.style.width = 'auto !important'
                    img.style.height = 'auto !important'
                    img.removeAttribute('width')
                    img.removeAttribute('height')
                })
            }
        }
        // uploadImgs(imgs) {
        //     if (imgs && imgs.length > 0) {
        //         Array.prototype.slice.call(imgs).forEach((img) => {
        //             let tempSrc = img.src
        //             img.src = null
        //             img.setAttribute('crossOrigin', 'Anonymous') // 解决跨域图片写入canvas报错
        //             img.onload = function () {
        //                 if (img.width > 0) {
        //                     // 上传图片
        //                     UploadFileImage.send(
        //                         base64ToBlob(imgToBase64(img)),
        //                         'PRODUCT'
        //                     ).then((res) => {
        //                         let { src } = res.data
        //                         img.src = src
        //                         img.setAttribute('src', src)
        //                         img.onload = null
        //                     })
        //                 }
        //             }
        //             img.src = tempSrc
        //         })
        //     }
        // }
    },
    watch: {
        value(newValue) {
            this.myValue = newValue
        },
        myValue(newValue) {
            this.$emit('input', newValue)
        },
        disabled(val) {
            this.disabled = val
        }
    }
}
</script>
<style lang="scss" scoped>
.tinymce-editor {
    input[type='file'] {
        display: none;
        width: 100%;
        height: 100%;
    }
}
.tinymce-popper {
    font-size: 12px;
}
</style>

<style lang="scss">
.tox-tinymce {
    border-top: none !important;
}
.tox .tox-toolbar {
    padding-right: 205px !important;
}
.tinymce-popper {
    font-size: 12px !important;
}
</style>
