<template>
    <image-viewer :z-index="zIndex" :initial-index="imageIndex" v-show="show" :url-list="urlList" ref="imageViewer"
        :on-close="closeViewer" />
</template>

<script>
import imageViewer from 'element-ui/packages/image/src/image-viewer.vue'
export default {
    // 图片预览组件，之后可扩展
    name: 'SlImageViewer',
    model: {
        prop: 'showViewer',
        event: 'valueChange'
    },
    props: {
        // 图片预览开关
        showViewer: {
            type: Boolean,
            default: false
        },
        // 展示的图片集合
        urlList: {
            type: Array,
            default: () => []
        }
    },
    components: {
        imageViewer
    },
    data() {
        return {
            // 当前组件的图层等级
            zIndex: 2000,
            // 展示图片的index
            imageIndex: 0
        }
    },
    computed: {
        // 图片预览开关的监听属性
        show: {
            set(show) {
                this.$emit('valueChange', show)
            },
            get() {
                const showViewer = this.showViewer
                if (showViewer) this.openViewer()
                return this.showViewer
            }
        }
    },
    methods: {
        openViewer() {
            document.body.style.overflow = 'hidden'
            this.$refs.imageViewer.infinite = false
            this.$refs.imageViewer.index = 0
            this.$refs.imageViewer.reset()
            this.$refs.imageViewer.deviceSupportUninstall()
            this.$refs.imageViewer.deviceSupportInstall()
        },
        closeViewer() {
            document.body.style.overflow = ''
            this.show = false
        }
    }
}
</script>
